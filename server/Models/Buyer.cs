using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Entities;

namespace server.Models
{
    public class Buyer : Account
    {
        public virtual List<AccountOrder> AccountOrders { get; set; }
    }
}