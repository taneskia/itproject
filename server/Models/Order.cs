using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Entities;

namespace server.Models
{
    public class Order
    {
        public enum Order_State { Ordered, Accepted, InProgress, Done }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public Order_State State { get; set; }
        public string Address { get; set; }
        public virtual List<ProductOrder> ProductOrder { get; set; }

        public Order()
        {
            this.ProductOrder = new List<ProductOrder>();
        }
    }
}