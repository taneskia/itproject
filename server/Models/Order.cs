using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Entities;

namespace server.Models {
    public class Order {
        public enum Order_State { Ordered, Accepted, InProgress, Done}

        [Key]
        public int ID { get; set; }
        public Order_State State { get; set; }
        public virtual ICollection<ProductOrder> ProductOrder { get; set; }
    }
}