using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Entities;
using server.Helpers;
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
        [HttpPost("accept-order")]
        public void acceptOrder([FromBody]FrontendOrder order) 
        {
            Account account = (Account)HttpContext.Items["Account"];
            Freelancer freelancer = itprojectContext.Freelancer.SingleOrDefault(f => f.Id == account.Id);

            AccountOrder accountOrder = itprojectContext.AccountOrders.Include(ao => ao.Buyer).Include(ao => ao.Order).SingleOrDefault(ao => ao.OrderID == order.orderID);
            if(accountOrder == null || accountOrder.FreelancerID != null)
                throw new AppException("This order is already accepted!");
            
            accountOrder.FreelancerID = freelancer.Id;
            accountOrder.Freelancer = freelancer;
            accountOrder.Order.State += 1;
            freelancer.AccountOrders.Add(accountOrder);

            itprojectContext.Freelancer.Update(freelancer);
            itprojectContext.SaveChanges();
        }

        [Authorize(Role.Freelancer)]
        [HttpPost("update-orderState")]
        public void updateOrder([FromBody]FrontendOrder frontendOrder) 
        {
            Order order = itprojectContext.Order.SingleOrDefault(o => o.ID == frontendOrder.orderID);
            
            if(order == null)
                throw new AppException("There is a problem updating this order");

            order.State += 1;
            itprojectContext.Order.Update(order);
            itprojectContext.SaveChanges();
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
