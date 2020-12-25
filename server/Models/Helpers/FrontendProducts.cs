using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Entities;

namespace server.Models.Helpers
{
    public class FrontendProducts
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Amount { get; set; }
        public string Image { get; set; }
    }
}