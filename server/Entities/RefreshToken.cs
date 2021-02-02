using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace server.Entities
{
    //[Owned]
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }
        public Account Account { get; set; }
        public string Token { get; set; }
        public DateTime Created { get; set; }
    }
}