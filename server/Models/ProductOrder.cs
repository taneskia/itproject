using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models {
    public class ProductOrder {

        [Key, Column(Order = 1)]        
        public int ProductID { get; set; }
        public Product Product { get; set; }

        [Key, Column(Order = 2)]        
        public int OrderID { get; set; }        
        public Order Order { get; set; }
        
        [Column(Order = 3)]
        public int Quantity { get; set; }
    }
}