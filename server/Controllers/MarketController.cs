using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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
        public IEnumerable<Market> GetMarkets()
        {
            return itprojectContext.Market.Include(p => p.Products);
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
            itprojectContext.Update(market);
            itprojectContext.SaveChanges();
            return true;
        }

        [Authorize]
        [HttpPost("deleteProduct")]
        public bool DeleteProduct([FromBody] Product product)
        {
            if (product == null)
                return false;
            Account account = (Account)HttpContext.Items["Account"];
            Market market = itprojectContext.Market.SingleOrDefault(m => m.Id == account.Id);
            market.Products.Remove(product);
            itprojectContext.Update(market);
            itprojectContext.SaveChanges();
            return true;
        }
    }
}
