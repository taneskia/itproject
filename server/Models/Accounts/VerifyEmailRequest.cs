using System.ComponentModel.DataAnnotations;

namespace server.Models.Accounts
{
    public class VerifyEmailRequest
    {
        [Required]
        public string Token { get; set; }
    }
}