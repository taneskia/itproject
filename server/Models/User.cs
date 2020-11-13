using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace server.Models{
    public class User {

        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public User(){ }
    }
}