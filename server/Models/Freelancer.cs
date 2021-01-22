using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Entities;

namespace server.Models
{
    public class Freelancer : Account
    {

        public virtual List<AccountOrder> AccountOrders { get; set; }

        public Freelancer()
        {
            this.AccountOrders = new List<AccountOrder>();
        }
    }
}