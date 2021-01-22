using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Entities;

namespace server.Models
{
    public class Market : Account
    {
        public virtual List<Product> Products { get; set; }
        public string ImageUrl { get; set; }

        public Market()
        {
            this.Products = new List<Product>();
        }
    }
}