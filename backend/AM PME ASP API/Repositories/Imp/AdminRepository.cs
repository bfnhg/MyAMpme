using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AM_PME_ASP_API.Repositories.Imp
{
    public class AdminRepository : IAdminRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly MyDataContext _db;

        public AdminRepository(IConfiguration configuration, UserManager<User> userManager, RoleManager<Role> roleManager, MyDataContext db)
        {
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
            _db = db;
        }

        public async Task<IEnumerable<string>> GetRolesForUser(string userId)
        {
            var user = await _db.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) throw new UserNotFoundException(userId);

            var roles = user.UserRoles.Select(ur => ur.Role.Name);

            return roles;
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task<User> CreateUser(User user, string password)
        {
            if (string.IsNullOrEmpty(user.FullName))
            {
                throw new UserCreationException("FullName cannot be null or empty.");
            }

            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                return user;
            }

            throw new UserCreationException(result.Errors.FirstOrDefault()?.Description);
        }

        public async Task<User> UpdateUser(User user)
        {
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return user;
            }
            else
            {
                throw new UserUpdateException(result.Errors.FirstOrDefault()?.Description);
            }
        }

        public async Task<bool> DeactivateUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new UserNotFoundException($"User with id {id} not found.");
            }

            user.Active = false;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new UserUpdateException(result.Errors.FirstOrDefault()?.Description);
            }

            // Remove all roles from user
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var roleName in roles)
            {
                var role = await _roleManager.FindByNameAsync(roleName);
                if (role != null)
                {
                    await _userManager.RemoveFromRoleAsync(user, role.Name);
                }
            }

            return true;
        }


        public async Task<bool> DeleteUser(User user)
        {
            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        public async Task<User> GetUserById(string userId)
        {
            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                // Load the roles for the user
                var roles = await _userManager.GetRolesAsync(user);

                // Attach the roles to the UserRoles property
                user.UserRoles = roles.Select(roleName => new UserRole
                {
                    UserId = user.Id,
                    Role = new Role { Name = roleName }
                }).ToList();

                return user;
            }

            throw new UserNotFoundException($"user was not found with ID : {userId}");
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return user;
            }

            throw new UserNotFoundException($"No user was found with email {email}.");
        }

        public async Task<List<User>> GetAllUsers(long Id)
        {
            var users = await _userManager.Users.Where(e=>e.EntrepriseId == Id).Include(u => u.UserRoles).ThenInclude(ur => ur.Role).ToListAsync();

            return users;
        }

        public async Task<bool> ValidateUserCredentials(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                if (await _userManager.CheckPasswordAsync(user, password))
                {
                    return true;
                }
                else
                {
                    throw new InvalidPasswordException("Invalid password");
                }
            }

            throw new UserNotFoundException("User not found for email: " + email);
        }

        public async Task<List<string>> GetUserRoles(User user)
        {
            return (await _userManager.GetRolesAsync(user)).ToList();
        }

        public async Task<List<Role>> GetAllRoles()
        {
            return await _roleManager.Roles.ToListAsync();
        }

        public async Task<Role> CreateRole(Role role)
        {
            var result = await _roleManager.CreateAsync(role);

            if (result.Succeeded)
            {
                return role;
            }
            else
            {
                var errorMessage = result.Errors.FirstOrDefault()?.Description ?? "Unknown error occurred while creating role.";
                throw new RoleCreationException(errorMessage);
            }
        }

        public async Task<Role> UpdateRole(Role role)
        {
            var existingRole = await _roleManager.FindByIdAsync(role.Id.ToString());

            if (existingRole == null)
            {
                throw new RoleNotFoundException();
            }

            existingRole.Name = role.Name;

            existingRole.UpdatedBy = role.UpdatedBy;

            var result = await _roleManager.UpdateAsync(existingRole);

            if (result.Succeeded)
            {
                return existingRole;
            }
            else
            {
                var errorMessage = result.Errors.FirstOrDefault()?.Description ?? "Unknown error occurred while updating the role.";
                throw new RoleUpdateException(errorMessage);
            }
        }

        public async Task<IList<User>> GetUsersInRole(string roleName, long Id)
        {
            var role = await _roleManager.FindByNameAsync(roleName);

            if (role == null)
            {
                throw new RoleNotFoundException($"Role '{roleName}' not found");
            }

            var users = (await _userManager.GetUsersInRoleAsync(roleName)).Where(e => e.EntrepriseId == Id);
            return users.ToList();
        }

        public async Task<Role> GetRoleById(string roleId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);
            if (role != null)
            {
                return role;
            }

            throw new RoleNotFoundException();
        }

        public async Task<Role> GetRoleByName(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);

            if (role == null) throw new RoleNotFoundException();

            return role;
        }

        public async Task DeleteRoleById(string roleId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                throw new RoleNotFoundException($"Role with id {roleId} not found");
            }

            // Check if any user is assigned to this role before deleting
            var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name);

            if (usersInRole.Any())
            {
                throw new RoleDeleteException($"Role {role.Name} cannot be deleted as it is assigned to {usersInRole.Count} users.");
            }

            var result = await _roleManager.DeleteAsync(role);

            if (!result.Succeeded)
            {
                throw new RoleDeleteException(result.Errors.FirstOrDefault()?.Description);
            }
        }

        public async Task AddUserToRole(User user, string roleName)
        {
            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (!result.Succeeded)
            {
                throw new UserUpdateException(result.Errors.FirstOrDefault()?.Description);
            }
        }

        public async Task RemoveUserFromRole(User user, string roleName)
        {
            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            if (!result.Succeeded)
            {
                throw new UserUpdateException(result.Errors.FirstOrDefault()?.Description);
            }
        }
    }
}