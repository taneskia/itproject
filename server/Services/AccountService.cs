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
        void ForgotPassword(ForgotPasswordRequest model, string origin);
        void ValidateResetToken(ValidateResetTokenRequest model);
        void ResetPassword(ResetPasswordRequest model);
        IEnumerable<AccountResponse> GetAll();
        AccountResponse GetById(int id);
        AccountResponse Create(CreateRequest model);
        AccountResponse Update(int id, UpdateRequest model);
        void Delete(int id);
    }

    public class AccountService : IAccountService
    {
        private readonly ItprojectContext _context;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AccountService(
            ItprojectContext context,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _context = context;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.Email == model.Email);

            if (account == null || !BC.Verify(model.Password, account.PasswordHash))
                throw new AppException("Email or password is incorrect");

            // authentication successful so generate jwt and refresh tokens
            var jwtToken = generateJwtToken(account);
            var refreshToken = generateRefreshToken(ipAddress);

            account.RefreshTokens.Clear();
            account.RefreshTokens.Add(refreshToken);

            // save changes to db
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

        public AuthenticateResponse RefreshToken(string token, string ipAddress)
        {
            var (refreshToken, account) = getRefreshToken(token);

            // replace old refresh token with a new one and save
            var newRefreshToken = generateRefreshToken(ipAddress);
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            refreshToken.ReplacedByToken = newRefreshToken.Token;
            account.RefreshTokens.Add(newRefreshToken);

            removeOldRefreshTokens(account);
            
            _context.Update(account);
            _context.SaveChanges();

            // generate new jwt
            var jwtToken = generateJwtToken(account);

            var response = _mapper.Map<AuthenticateResponse>(account);
            response.JwtToken = jwtToken;
            response.RefreshToken = newRefreshToken.Token;
            return response;
        }

        public void RevokeToken(string token, string ipAddress)
        {
            var (refreshToken, account) = getRefreshToken(token);

            // revoke token and save
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
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
                if (model.ImageUrl != null)
                    market.ImageUrl = model.ImageUrl;
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


        public void ForgotPassword(ForgotPasswordRequest model, string origin)
        {
            var account = _context.Accounts.SingleOrDefault(x => x.Email == model.Email);

            if (account == null) return;

            // create reset token that expires after 1 day
            account.ResetToken = randomTokenString();
            account.ResetTokenExpires = DateTime.UtcNow.AddDays(1);

            _context.Accounts.Update(account);
            _context.SaveChanges();
        }

        public void ValidateResetToken(ValidateResetTokenRequest model)
        {
            var account = _context.Accounts.SingleOrDefault(x =>
                x.ResetToken == model.Token &&
                x.ResetTokenExpires > DateTime.UtcNow);

            if (account == null)
                throw new AppException("Invalid token");
        }

        public void ResetPassword(ResetPasswordRequest model)
        {
            var account = _context.Accounts.SingleOrDefault(x =>
                x.ResetToken == model.Token &&
                x.ResetTokenExpires > DateTime.UtcNow);

            if (account == null)
                throw new AppException("Invalid token");

            // update password and remove reset token
            account.PasswordHash = BC.HashPassword(model.Password);
            account.PasswordReset = DateTime.UtcNow;
            account.ResetToken = null;
            account.ResetTokenExpires = null;

            _context.Accounts.Update(account);
            _context.SaveChanges();
        }

        public IEnumerable<AccountResponse> GetAll()
        {
            var accounts = _context.Accounts;
            return _mapper.Map<IList<AccountResponse>>(accounts);
        }

        public AccountResponse GetById(int id)
        {
            var account = getAccount(id);
            return _mapper.Map<AccountResponse>(account);
        }

        public AccountResponse Create(CreateRequest model)
        {
            // validate
            if (_context.Accounts.Any(x => x.Email == model.Email))
                throw new AppException($"Email '{model.Email}' is already registered");

            // map model to new account object
            var account = _mapper.Map<Account>(model);
            account.Created = DateTime.UtcNow;
            // account.Verified = DateTime.UtcNow;

            // hash password
            account.PasswordHash = BC.HashPassword(model.Password);

            // save account
            _context.Accounts.Add(account);
            _context.SaveChanges();

            return _mapper.Map<AccountResponse>(account);
        }

        public AccountResponse Update(int id, UpdateRequest model)
        {
            var account = getAccount(id);

            // validate
            if (account.Email != model.Email && _context.Accounts.Any(x => x.Email == model.Email))
                throw new AppException($"Email '{model.Email}' is already taken");

            // hash password if it was entered
            if (!string.IsNullOrEmpty(model.Password))
                account.PasswordHash = BC.HashPassword(model.Password);

            // copy model to account and save
            _mapper.Map(model, account);
            account.Updated = DateTime.UtcNow;
            _context.Accounts.Update(account);
            _context.SaveChanges();

            return _mapper.Map<AccountResponse>(account);
        }

        public void Delete(int id)
        {
            var account = getAccount(id);
            _context.Accounts.Remove(account);
            _context.SaveChanges();
        }

        // helper methods

        private Account getAccount(int id)
        {
            var account = _context.Accounts.Find(id);
            if (account == null) throw new KeyNotFoundException("Account not found");
            return account;
        }

        private (RefreshToken, Account) getRefreshToken(string token)
        {
            var account = _context.Accounts.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));
            if (account == null) throw new AppException("Invalid token");
            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);
            if (!refreshToken.IsActive) throw new AppException("Invalid token");
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
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
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
