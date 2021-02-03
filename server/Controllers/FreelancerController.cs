using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Entities;
using server.Models;
using server.Models.Helpers;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreelancerController : ControllerBase
    {
        private ItprojectContext itprojectContext;
        private readonly IAccountService accountService;

        public FreelancerController(ItprojectContext itprojectContext, IAccountService accountService)
        {
            this.itprojectContext = itprojectContext;
            this.accountService = accountService;
        }

        [HttpGet]
        public string test()
        {
            return "FreelancerTest";
        }

        [Authorize(Role.Freelancer)]
        [HttpGet("accepted-orders")]
        public List<FrontendOrder> getAcceptedOrders()
        {
            Account account = (Account)HttpContext.Items["Account"];
            return listOrders(account.Id);
        }

        [Authorize(Role.Freelancer)]
        [HttpGet("pending-orders")]
        public List<FrontendOrder> getNotAcceptedOrders()
        {
            return listOrders(null);
        }

        private List<FrontendOrder> listOrders(Nullable<int> accountID)
        {
            List<Order> orders = itprojectContext.Order.Include(p => p.ProductOrder).ThenInclude(po => po.Product).Where(o => (itprojectContext.AccountOrders.Any(t => o.ID == t.OrderID && t.FreelancerID == accountID))).ToList();
            List<FrontendOrder> orderProducts = new List<FrontendOrder>();
            //itprojectContext.AccountOrders.FromSqlRaw("");
            foreach(Order o in orders)
            {
                FrontendOrder op = new FrontendOrder();
                op.orderID = o.ID;
                op.orderState = o.State;
                op.Address = o.Address;
                foreach(ProductOrder po in o.ProductOrder)
                {
                    FrontendProducts fp = new FrontendProducts();
                    fp.ID = po.ProductID;
                    fp.Name = po.Product.Name;
                    fp.Price = po.Product.Price;
                    fp.Image = po.Product.Image;
                    fp.Amount = po.Quantity;
                    op.Products.Add(fp);
                }
                orderProducts.Add(op);
            }
            return orderProducts;
        }
    }
}
