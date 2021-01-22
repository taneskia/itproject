using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketController : ControllerBase
    {
        private ItprojectContext itprojectContext;
        private readonly IAccountService accountService;

        public MarketController(ItprojectContext itprojectContext, IAccountService accountService)
        {
            this.itprojectContext = itprojectContext;
            this.accountService = accountService;
        }

        [HttpGet]
        public IEnumerable<string> HomeTest()
        {
            //remove this method, testing only
            return new string[] { "value1", "value2" };
        }

        [Authorize]
        [HttpGet("products")]
        public IEnumerable<Product> Products()
        {
            Account account = (Account)HttpContext.Items["Account"];
            Market market = itprojectContext.Market.SingleOrDefault(m => m.Id == account.Id);
            return market.Products;
        }

        [Authorize]
        [HttpPost("addProduct")]
        public bool AddProduct([FromBody] Product product)
        {
            if (product == null)
                return false;
            Account account = (Account)HttpContext.Items["Account"];
            Market market = itprojectContext.Market.SingleOrDefault(m => m.Id == account.Id);
            market.Products.Add(product);
            itprojectContext.SaveChanges();
            return true;
        }

        [Authorize]
        [HttpPost("deleteProduct")]
        public bool DeleteProduct([FromBody] Product product){
            if (product == null)
                return false;
            Account account = (Account)HttpContext.Items["Account"];
            Market market = itprojectContext.Market.SingleOrDefault(m => m.Id == account.Id);
            market.Products.Remove(product); 
            itprojectContext.SaveChanges();
            return true;
        }
    }
}
