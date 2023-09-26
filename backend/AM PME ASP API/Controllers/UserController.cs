using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using AM_PME_ASP_API.Models.User;
using AM_PME_ASP_API.Models.Role;
using AM_PME_ASP_API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using System.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using AM_PME_ASP_API.Models.AuthHelpers;
using AM_PME_ASP_API.Repositories.Imp;
using System.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAdminRepository _repository;
        private readonly IMapper _mapper;
        private IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public UserController(IAdminRepository repository, IMapper mapper, UserManager<User> userManager,
            RoleManager<Role> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _repository = repository;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return NotFound();

            var userRoles = await _userManager.GetRolesAsync(user);
            var role = userRoles.FirstOrDefault();

            var userData = new UserData
            {
                Id = user.Id,
                Role = role ?? "",
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email,
                EnterpriseId = user.EntrepriseId
            };

            return Ok(userData);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers(long Id)
        {
            var users = await _repository.GetAllUsers(Id);
            var userDtos = users.Select(u => new
            {
                Id = u.Id,
                Email = u.Email,
                FullName = u.FullName,
                Active = u.Active,
                Username = u.UserName,
                CreatedAt = u.CreatedAt,
                UpdatedAt = u.UpdatedAt,
                Roles = u.UserRoles.Select(ur => ur.Role.Name),
                EnterpriseId = u.EntrepriseId
            });

            return Ok(userDtos);
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(UserChangePasswordDto userChangePasswordDto)
        {
            var user = await _repository.GetUserByEmail(userChangePasswordDto.Email);

            if (user == null) return NotFound("User not found");

            var removeResult = await _userManager.RemovePasswordAsync(user);

            if (!removeResult.Succeeded)
            {
                return BadRequest(removeResult.Errors);
            }

            var addResult = await _userManager.AddPasswordAsync(user, userChangePasswordDto.NewPassword);

            if (!addResult.Succeeded)
            {
                return BadRequest(addResult.Errors);
            }

            await _repository.UpdateUser(user);
            return NoContent();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            try
            {
                var user = await _repository.GetUserById(userId);

                var userDto = new
                {
                    Id = user.Id,
                    Email = user.Email,
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber,
                    Active = user.Active,
                    Username = user.UserName,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt,
                    Roles = user.UserRoles != null ? user.UserRoles.Select(ur => new {
                        Name = ur.Role.Name,
                    }) : null
                };

                return Ok(userDto);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUser(UserCreateDto userDto)
        {
            var adminId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (adminId == null)
            {
                return BadRequest("Admin not found.");
            }

            var admin = await _userManager.FindByIdAsync(adminId);

            var user = new User
            {
                UserName = userDto.Email,
                Email = userDto.Email,
                CreatedBy = admin.Id,
                FullName = userDto.FullName,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                RefreshToken = Guid.NewGuid().ToString()
            };

            var createUserResult = await _userManager.CreateAsync(user, userDto.Password);
            if (!createUserResult.Succeeded)
            {
                return BadRequest(createUserResult.Errors);
            }

            // Associate selected roles with the user
            if (userDto.Roles != null)
            {
                foreach (var roleName in userDto.Roles)
                {
                    var role = await _roleManager.FindByNameAsync(roleName);
                    if (role == null)
                    {
                        return BadRequest($"Role '{roleName}' does not exist.");
                    }

                    var addToRoleResult = await _userManager.AddToRoleAsync(user, roleName);
                    if (!addToRoleResult.Succeeded)
                    {
                        return BadRequest(addToRoleResult.Errors);
                    }
                }
            }

            // Generate JWT for user
            var userRoles = await _userManager.GetRolesAsync(user);
            var jwt = GenerateJwt(user.Id, user.Email, userRoles, user.RefreshToken);

            var userResponseDto = new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                Roles = userRoles.ToList()
            };

            return Ok(new { user = userResponseDto, token = jwt });
        }

        private string GenerateJwt(string userId, string email, IEnumerable<string> roles, string refreshToken = null)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            if (refreshToken != null)
            {
                var refreshExp = DateTime.UtcNow.AddMinutes(15);
                claims.Add(new Claim("refresh_token", refreshToken));
                claims.Add(new Claim("refresh_token_exp", refreshExp.ToString()));
            }

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var secretKey = _configuration["Jwt:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("Secret key is missing or empty.");
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPut("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser(string userId, UserUpdateDto userDto)
        {
            try
            {
                var user = await _repository.GetUserById(userId);

                user.UserName = userDto.UserName;
                user.Email = userDto.Email;
                user.FullName = userDto.FullName;

                // Get the userId of the current user making the API call
                var currentUserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Set the UpdatedBy field to the currentUserId
                user.UpdatedBy = currentUserId;

                var result = await _repository.UpdateUser(user);

                return Ok(result);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UserUpdateException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                var user = await _repository.GetUserById(userId);

                var result = await _repository.DeleteUser(user);

                return Ok(result);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UserUpdateException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{userId}/roles")]
        public async Task<IActionResult> AddRolesToUser(string userId, List<string> roleNames)
        {
            try
            {
                var user = await _repository.GetUserById(userId);

                foreach (var roleName in roleNames)
                {
                    var role = await _repository.GetRoleByName(roleName);
                    await _repository.AddUserToRole(user, role.Name);
                }

                return Ok();
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (RoleNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (UserUpdateException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{userId}/roles")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemoveRolesFromUser(string userId, List<string> roleNames)
        {
            try
            {
                var user = await _repository.GetUserById(userId);

                foreach (var roleName in roleNames)
                {
                    var role = await _repository.GetRoleByName(roleName);
                    await _repository.RemoveUserFromRole(user, role.Name);
                }

                return Ok();
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (RoleNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (UserUpdateException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}

