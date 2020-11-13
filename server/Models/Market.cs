using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models {
    public class Market : User{
        ItprojectContext itprojectContext;

        public Market(ItprojectContext itprojectContext)
        {
            this.itprojectContext = itprojectContext;
        }

        public virtual List<Product> Products { get; set; }

        public void AddProduct(Product product){
            //TODO: this
        }

        public void RemoveProduct(Product product){
            //TODO: this
        }
    }
}