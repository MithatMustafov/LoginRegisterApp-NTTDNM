using MongoDB.Driver;
using MongoLoginApi.Models;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace MongoLoginApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;
        private readonly ILogger<UserService> _logger;

        public UserService(IMongoClient mongoClient, IOptions<MongoSettings> mongoSettings, ILogger<UserService> logger)
        {
            var settings = mongoSettings.Value;
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>("Users");
            _logger = logger;
        }

        public async Task<User?> CreateUser(string username, string password)
        {
            var existingUser = await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                return null;
            }

            var newUser = new User
            {
                Username = username,
                Password = password, 
            };

            await _users.InsertOneAsync(newUser);

            return newUser;
        }

        public async Task<User?> AuthenticateUser(string username, string password)
        {
            _logger.LogInformation("Attempting to authenticate user: {Username}", username);
            var user = await _users.Find(u => u.Username == username && u.Password == password).FirstOrDefaultAsync();
            if (user == null)
            {
                _logger.LogWarning("Authentication failed for user: {Username}", username);
            }
            return user;
        }
    }
}
