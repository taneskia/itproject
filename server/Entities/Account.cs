using System;
using System.Collections.Generic;

namespace server.Entities
{
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public Role Role { get; set; }
        public DateTime Created { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}