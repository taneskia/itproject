using System.Collections.Generic;
using static server.Models.Order;

namespace server.Models.Helpers
{
    public class FrontendOrder
    {
        public int orderID { get; set; }
        public Order_State orderState { get; set; }
        public string Address { get; set; }
        public List<FrontendProducts> Products { get; set; }

        public FrontendOrder()
        {
            Products = new List<FrontendProducts>();
        }
    }
}