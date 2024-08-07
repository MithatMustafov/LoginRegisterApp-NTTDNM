using Microsoft.AspNetCore.Mvc;
using MongoLoginApi.Services;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MongoLoginApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(UserService userService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

[HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterRequest request)
{
    if (request == null)
    {
        _logger.LogWarning("Registration request is null.");
        return BadRequest("Invalid client request");
    }

    if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
    {
        _logger.LogWarning("Username or password is err:{Username}", request.Username);
        return BadRequest("Username and password are required.");
    }

    try
    {
        var user = await _userService.CreateUser(request.Username, request.Password);
        if (user == null)
        {
            _logger.LogWarning("User registration failed for username: {Username}", request.Username);
            return Conflict("User already exists or registration failed.");
        }

        _logger.LogInformation("User registered successfully.");
        return CreatedAtAction(nameof(Login), new { id = user.Id }, user);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "An error occurred during registration.");
        return StatusCode(500, "Internal server error");
    }
}

[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginRequest request)
{
    if (request == null)
    {
        _logger.LogWarning("Login request is null.");
        return BadRequest("Invalid client request");
    }

    if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
    {
        _logger.LogWarning("Username or password is missing. err:{Username}", request.Username);
        return BadRequest("Username and password are required.");
    }

    try
    {
        var user = await _userService.AuthenticateUser(request.Username, request.Password);
        if (user == null)
        {
            _logger.LogWarning("Authentication failed for username: {Username}", request.Username);
            return Unauthorized();
        }

        _logger.LogInformation("User authenticated successfully.");
        return Ok(user);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "An error occurred during authentication.");
        return StatusCode(500, "Internal server error");
    }
}
    }

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class RegisterRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
}
