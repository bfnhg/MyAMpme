using System;
using AM_PME_ASP_API.Entities;

namespace AM_PME_ASP_API.Repositories
{
    public interface IAdminRepository
    {
        public Task SaveAsync();
        public Task<User> CreateUser(User user, string password);
        public Task<User> UpdateUser(User user);
        public Task<bool> DeactivateUserById(string id);
        public Task<bool> DeleteUser(User user);
        public Task<User> GetUserById(string userId);
        public Task<User> GetUserByEmail(string email);
        public Task<List<User>> GetAllUsers(long Id);
        public Task<bool> ValidateUserCredentials(string email, string password);

        public Task<List<string>> GetUserRoles(User user);
        public Task<List<Role>> GetAllRoles();
        public Task<IEnumerable<string>> GetRolesForUser(string userId);
        public Task<Role> CreateRole(Role role);
        public Task<Role> UpdateRole(Role role);
        public Task DeleteRoleById(string roleId);
        public Task<IList<User>> GetUsersInRole(string roleName, long Id);
        public Task<Role> GetRoleById(string roleId);
        public Task AddUserToRole(User user, string roleName);
        public Task<Role> GetRoleByName(string roleName);
        public Task RemoveUserFromRole(User user, string roleName);
    }

}

