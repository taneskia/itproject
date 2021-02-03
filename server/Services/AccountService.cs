using AutoMapper;
using BC = BCrypt.Net.BCrypt;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using server.Entities;
using server.Helpers;
using server.Models.Accounts;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Services
{
    public interface IAccountService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        AuthenticateResponse RefreshToken(Account account, string token);
        bool RevokeToken(Account account);
        void Register(RegisterRequest model, string origin);
    }

    public class AccountService : IAccountService
    {
        private readonly ItprojectContext _context;
        private readonly IMapper _mapper;

        public AccountService(
            ItprojectContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.Email == model.Email);

            if (account == null || !BC.Verify(model.Password, account.PasswordHash))
                throw new AppException("Email or password is incorrect");

            return UpdateAccountToken(account);
        }

        public AuthenticateResponse RefreshToken(Account account, string token)
        {
            account.RefreshTokens = _context.RefreshToken.Where(t => t.Account.Id == account.Id).ToList();

            if (account == null)
                throw new AppException("Account with refresh token not found");

            if (account.RefreshTokens.Count != 0)
            {
                AuthenticateResponse response = _mapper.Map<AuthenticateResponse>(account);
                response.RefreshToken = account.RefreshTokens.First().Token;
                response.JwtToken = generateJwtToken(account);
                return response;
            }

            else return UpdateAccountToken(account);
        }

        public bool RevokeToken(Account account)
        {
            account.RefreshTokens = _context.RefreshToken.Where(t => t.Account.Id == account.Id).ToList();

            if (account.RefreshTokens.Count == 0)
                return false;

            account.RefreshTokens.Clear();
            _context.RefreshToken.RemoveRange(_context.RefreshToken.Where(t => t.Account.Id == account.Id));
            _context.Accounts.Update(account);
            _context.SaveChanges();
            return true;
        }

        private AuthenticateResponse UpdateAccountToken(Account account)
        {
            var jwtToken = generateJwtToken(account);
            var refreshToken = generateRefreshToken(account);

            account.RefreshTokens.Clear();

            _context.RefreshToken.RemoveRange(_context.RefreshToken.Where(t => t.Account.Id == account.Id));
            _context.RefreshToken.Add(refreshToken);
            _context.SaveChanges();

            account.RefreshTokens = _context.RefreshToken.Where(t => t.Account.Id == account.Id).ToList();
            _context.Accounts.Update(account);
            _context.SaveChanges();

            var response = _mapper.Map<AuthenticateResponse>(account);
            response.JwtToken = jwtToken;
            response.RefreshToken = refreshToken.Token;
            return response;
        }

        public void Register(RegisterRequest model, string origin)
        {
            Role role = (Role)Enum.Parse(typeof(Role), model.Role);

            // map model to new account object
            Account account = null;

            if (role == Role.Market)
            {
                Market market = _mapper.Map<Market>(model);
                _context.Market.Add(market);
                account = market;
            }

            else if (role == Role.Buyer)
            {
                Buyer buyer = _mapper.Map<Buyer>(model);
                _context.Buyer.Add(buyer);
                account = buyer;
            }

            else if (role == Role.Freelancer)
            {
                Freelancer freelancer = _mapper.Map<Freelancer>(model);
                _context.Freelancer.Add(freelancer);
                account = freelancer;
            }

            account.Created = DateTime.UtcNow;

            account.PasswordHash = BC.HashPassword(model.Password);

            _context.SaveChanges();
        }

        private string generateJwtToken(Account account)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("appSettings.Secret"); //TODO: Add key
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", account.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private RefreshToken generateRefreshToken(Account account)
        {
            return new RefreshToken
            {
                Account = account,
                Token = randomTokenString(),
                Created = DateTime.UtcNow
            };
        }

        private string randomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            // convert random bytes to hex string
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }
    }
}
