using System.ComponentModel.DataAnnotations;
using server.Entities;

namespace server.Models.Accounts
{
    public class RegisterRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Address { get; set; }
    }
}