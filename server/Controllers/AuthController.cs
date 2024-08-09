using Microsoft.AspNetCore.Mvc;
using MongoLoginApi.Services;
using Microsoft.Extensions.Logging;

namespace MongoLoginApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public partial class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(UserService userService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _logger = logger;
        }
    }
}
