using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using AM_PME_ASP_API.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class AdminController : ControllerBase
	{
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AdminController> _logger;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AdminController(
            ILogger<AdminController> logger,
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IPasswordHasher<User> passwordHasher,
            IConfiguration configuration)
        {
            _logger = logger;
            _userManager = userManager;
            _roleManager = roleManager;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("default-admin")]
        public async Task<IActionResult> CreateDefaultAdminUser()
        {
            try
            {
                // Check if the default admin user already exists
                var defaultAdmin = await _userManager.FindByEmailAsync("admin@default.com");
                if (defaultAdmin != null)
                {
                    return BadRequest("Default admin user already exists");
                }

                // Create the default admin user
                var adminUser = new User
                {
                    Email = "admin@default.com",
                    UserName = "default",
                    FullName = "DefaultAdmin",
                    CreatedAt = DateTime.UtcNow,
                    EmailConfirmed = true,
                    RefreshToken = string.Empty,
                };

                string adminPassword = "mySecurePassword123@";

                // Add the admin user to the database
                var result = await _userManager.CreateAsync(adminUser, adminPassword);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                // Create the admin role if it doesn't already exist
                var adminRole = await _roleManager.FindByNameAsync("Admin");
                if (adminRole == null)
                {
                    adminRole = new Role
                    {
                        Name = "Admin",
                        CreatedAt = DateTime.UtcNow,
                    };

                    result = await _roleManager.CreateAsync(adminRole);
                    if (!result.Succeeded)
                    {
                        return BadRequest(result.Errors);
                    }
                }

                // Add the admin user to the admin role
                result = await _userManager.AddToRoleAsync(adminUser, adminRole.Name);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                // Generate JWT tokens for the admin user
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, adminUser.Id),
                        new Claim(ClaimTypes.Role, adminRole.Name),
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature),
                };
                var accessToken = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
                var refreshToken = Guid.NewGuid().ToString();

                // Save the refresh token to the admin user's record
                adminUser.RefreshToken = refreshToken;
                adminUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(30);
                result = await _userManager.UpdateAsync(adminUser);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                return Ok(new
                {
                    adminUser.Id,
                    adminUser.UserName,
                    adminUser.Email,
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                });
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "Error creating default admin user");

                // Return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the default admin user");
            }
        }

        [HttpPost("update-password")]
        public async Task<IActionResult> ChangePassword(string newPassword)
        {
            try
            {
                // Find the default admin user
                var adminUser = await _userManager.FindByEmailAsync("admin@admin.com");
                if (adminUser == null)
                {
                    return BadRequest("Default admin user not found");
                }

                // Generate a new password hash for the new password
                var newPasswordHash = _passwordHasher.HashPassword(adminUser, newPassword);

                // Update the admin user's password hash
                adminUser.PasswordHash = newPasswordHash;
                var result = await _userManager.UpdateAsync(adminUser);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                return Ok("Password changed successfully");
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "Error changing password for default admin user");

                // Return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while changing the password for the default admin user");
            }
        }
    }
}

