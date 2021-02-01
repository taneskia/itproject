using System;
//using System.Text.Json.Serialization;

namespace server.Models.Accounts
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
