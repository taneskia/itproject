using System.ComponentModel.DataAnnotations;

namespace server.Models.Accounts
{
    public class ValidateResetTokenRequest
    {
        [Required]
        public string Token { get; set; }
    }
}