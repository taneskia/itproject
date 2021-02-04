using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Entities;
using server.Models;
using server.Models.Helpers;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuyerController : BaseController
    {
        public BuyerController(ItprojectContext itprojectContext)
        {
            this.itprojectContext = itprojectContext;
        }

        private ItprojectContext itprojectContext;

        [HttpGet]
        [Authorize]
        public string test()
        {
            return "BuyerTest";
        }

        [HttpPost("buy")]
        [Authorize]
        public void MakeOrder([FromBody] List<FrontendProducts> frontendProducts)
        {
            Account account = (Account)HttpContext.Items["Account"];
            Buyer buyer = itprojectContext.Buyer.SingleOrDefault(m => m.Id == account.Id);

            Order order = new Order();
            order.State = Order.Order_State.Ordered;
            order.Address = account.Address;

            itprojectContext.Order.Add(order);

            foreach (FrontendProducts frontendProduct in frontendProducts)
            {
                Product product = itprojectContext.Product.SingleOrDefault(m => m.ID == frontendProduct.ID);

                ProductOrder productOrder = new ProductOrder
                {
                    ProductID = product.ID,
                    Product = product,
                    OrderID = order.ID,
                    Order = order,
                    Quantity = frontendProduct.Amount
                };

                product.ProductOrder.Add(productOrder);
                order.ProductOrder.Add(productOrder);
            }

            AccountOrder accountOrder = new AccountOrder
            {
                Buyer = buyer,
                BuyerID = buyer.Id,
                Order = order,
                OrderID = order.ID,
                // TODO: Fix freelancer
                Freelancer = null,
                FreelancerID = null
            };

            buyer.AccountOrders.Add(accountOrder);
            itprojectContext.Buyer.Update(buyer);

            itprojectContext.SaveChanges();
        }

        [Authorize]
        [HttpGet("my-orders")]
        public List<FrontendOrder> getMyOrders()
        {
            Account account = (Account)HttpContext.Items["Account"];
            Buyer buyer = itprojectContext.Buyer.Include(b => b.AccountOrders)
                .ThenInclude(ao => ao.Order)
                .ThenInclude(o => o.ProductOrder)
                .ThenInclude(po => po.Product).SingleOrDefault(b => b.Id == account.Id);

            //List<AccountOrder> accountOrders = itprojectContext.AccountOrders.Include(ao => ao.Order).Where(ao => ao.BuyerID == buyer.Id).ToList();
            List<FrontendOrder> orderProducts = new List<FrontendOrder>();
            foreach(AccountOrder ao in buyer.AccountOrders)
            {
                FrontendOrder fo = new FrontendOrder();
                fo.orderID = ao.Order.ID;
                fo.orderState = ao.Order.State;
                fo.Address = ao.Order.Address;
                foreach(ProductOrder po in ao.Order.ProductOrder)
                {
                    FrontendProducts fp = new FrontendProducts();
                    fp.ID = po.ProductID;
                    fp.Name = po.Product.Name;
                    fp.Price = po.Product.Price;
                    fp.Image = po.Product.Image;
                    fp.Amount = po.Quantity;
                    fo.Products.Add(fp);
                }
                orderProducts.Add(fo);
            }
            return orderProducts;
        }
    }
}
