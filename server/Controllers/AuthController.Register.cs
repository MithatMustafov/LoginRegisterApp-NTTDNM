using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MongoLoginApi.Controllers
{
    public partial class AuthController
    {
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
                _logger.LogWarning("Username or password is missing for username: {Username}", request.Username);
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
    }
}
