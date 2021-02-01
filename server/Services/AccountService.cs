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

namespace server.Services
{
    public interface IAccountService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress);
        AuthenticateResponse RefreshToken(string token, string ipAddress);
        void RevokeToken(string token, string ipAddress);
        void Register(RegisterRequest model, string origin);
        IEnumerable<AccountResponse> GetAll();
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

        public AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.Email == model.Email);

            if (account == null || !BC.Verify(model.Password, account.PasswordHash))
                throw new AppException("Email or password is incorrect");

            return UpdateAccountToken(account, ipAddress);
        }

        public AuthenticateResponse RefreshToken(string token, string ipAddress)
        {
            var (refreshToken, account) = getRefreshToken(token);

            return UpdateAccountToken(account, ipAddress);
        }

        private AuthenticateResponse UpdateAccountToken(Account account, string ipAddress) {
            var jwtToken = generateJwtToken(account);
            var refreshToken = generateRefreshToken(ipAddress);

            account.RefreshTokens.Clear();
            account.RefreshTokens.Add(refreshToken);

            _context.Update(account);

            try {
                _context.SaveChanges();
            }
            catch {}

            var response = _mapper.Map<AuthenticateResponse>(account);
            response.JwtToken = jwtToken;
            response.RefreshToken = refreshToken.Token;
            return response;
        }

        public void RevokeToken(string token, string ipAddress)
        {
            var (refreshToken, account) = getRefreshToken(token);
            account.RefreshTokens.Clear();
            _context.Update(account);
            _context.SaveChanges();
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

        public IEnumerable<AccountResponse> GetAll()
        {
            var accounts = _context.Accounts;
            return _mapper.Map<IList<AccountResponse>>(accounts);
        }

        private (RefreshToken, Account) getRefreshToken(string token)
        {
            var account = _context.Accounts.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));
            if (account == null) throw new AppException("Invalid token");
            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);
            return (refreshToken, account);
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

        private RefreshToken generateRefreshToken(string ipAddress)
        {
            return new RefreshToken
            {
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
