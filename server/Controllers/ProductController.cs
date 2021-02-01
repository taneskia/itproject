using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private ItprojectContext itprojectContext;

        public ProductController(ItprojectContext itprojectContext)
        {
            this.itprojectContext = itprojectContext;
        }

        [Authorize]
        [HttpGet]
        public IEnumerable<Product> Products()
        {
            return itprojectContext.Product;
        }
    }
}
