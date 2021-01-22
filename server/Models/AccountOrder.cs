using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Entities;

namespace server.Models
{
    public class AccountOrder
    {

        [Key, Column(Order = 1)]
        public int OrderID { get; set; }
        public Order Order { get; set; }

        [Key, Column(Order = 2)]
        public int BuyerID { get; set; }
        public Buyer Buyer { get; set; }

        [Key, Column(Order = 3)]
        public int? FreelancerID { get; set; }
#nullable enable
        public Freelancer? Freelancer { get; set; }
#nullable disable
    }
}