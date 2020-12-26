using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using server.Entities;
using server.Models;
using server.Models.Helpers;

namespace server.Controllers
{
    [Route("[controller]")]
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

            itprojectContext.Order.Add(order);

            foreach (FrontendProducts frontendProduct in frontendProducts)
            {
                // TODO: Add product in database or below line will be null
                Product product = itprojectContext.Product.SingleOrDefault(m => m.ID == frontendProduct.ID);

                // if(product == null)
                // {
                //     product = new Product {
                //         ID = frontendProduct.ID,
                //         ImageURL = frontendProduct.Image,
                //         Name = frontendProduct.Name,
                //         Price = frontendProduct.Price,
                //     };
                // }

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
                FreelancerID = 2
            };

            buyer.AccountOrders.Add(accountOrder);
            itprojectContext.Buyer.Update(buyer);

            itprojectContext.SaveChanges();
        }
    }
}
