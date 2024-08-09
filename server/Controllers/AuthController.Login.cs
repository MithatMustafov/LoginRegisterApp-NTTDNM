using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MongoLoginApi.Controllers
{
    public partial class AuthController
    {
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
                _logger.LogWarning("Username or password is missing for username: {Username}", request.Username);
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
}
