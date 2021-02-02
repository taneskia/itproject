using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Models.Accounts;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : BaseController
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountsController(
            IAccountService accountService,
            IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        [HttpPost("authenticate")]
        public ActionResult<AuthenticateResponse> Authenticate(AuthenticateRequest model)
        {
            var response = _accountService.Authenticate(model);
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public ActionResult<AuthenticateResponse> RefreshToken()
        {
            Account account = (Account)HttpContext.Items["Account"];
            var refreshToken = Request.Cookies["refreshToken"];
            var response = _accountService.RefreshToken(account, refreshToken);
            return Ok(response);
        }

        [Authorize]
        [HttpGet("revoke-token")]
        public IActionResult RevokeToken()
        {
            Account account = (Account)HttpContext.Items["Account"];

            if (!_accountService.RevokeToken(account))
                return BadRequest(new { message = "Token is required" });
            return Ok(new { message = "Token revoked" });
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest model)
        {
            _accountService.Register(model, Request.Headers["origin"]);
            return Ok(new { message = "Registration successful" });
        }
    }
}
