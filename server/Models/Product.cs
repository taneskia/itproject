using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models {
    public class Product {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }

        //[ForeignKey("Market")]
        public int Market_ID { get; set; }
        public string ImageURL { get; set; }        
        public virtual ICollection<ProductOrder> ProductOrder { get; set; }
    }
}