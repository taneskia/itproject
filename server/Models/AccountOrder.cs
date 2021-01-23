using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Entities;

namespace server.Models
{
    public class AccountOrder
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 1)]
        public int OrderID { get; set; }
        [ForeignKey("OrderID")]
        public Order Order { get; set; }

        [Column(Order = 2)]
        public int? BuyerID { get; set; }
        public virtual Buyer Buyer { get; set; }        
  
        [Column(Order = 3)]
        public int? FreelancerID { get; set; }    
        public virtual Freelancer Freelancer { get; set; }
    }
}
