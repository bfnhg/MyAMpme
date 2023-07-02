using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Repositories;
using Microsoft.AspNetCore.Identity;

namespace AM_PME_ASP_API.Controllers
{
	public class DefaultDataInitializer
	{

        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IAdminRepository _adminRepository;

        public DefaultDataInitializer(
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IAdminRepository adminRepository)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _adminRepository = adminRepository;
        }

        public async Task InitializeDataAsync()
        {
            // Création de l'utilisateur admin par défaut
            var defaultAdmin = new User
            {
                UserName = "admin@admin.com",
                Email = "admin@admin.com",
                FullName = "Default Admin",
                CreatedAt = DateTime.UtcNow,
                Active = true
            };

            // Get the "admin" role from the database
            var adminRole = await _roleManager.FindByNameAsync("Admin");

            // If the role doesn't exist, create it
            if (adminRole == null)
            {
                adminRole = new Role
                {
                    Name = "Admin"
                };
                await _roleManager.CreateAsync(adminRole);
            }

            // Ajout de l'utilisateur à la base de données
            await _userManager.CreateAsync(defaultAdmin, "P@ssword1");

            // Ajout des informations de suivi de création à l'utilisateur
            defaultAdmin.Creator = defaultAdmin;
            defaultAdmin.CreatedBy = defaultAdmin.Id;

            await _userManager.UpdateAsync(defaultAdmin);

            var adminUserRole = new UserRole
            {
                RoleId = adminRole.Id,
                UserId = defaultAdmin.Id
            };

            await _adminRepository.AddUserToRole(defaultAdmin, "Admin");

            await _adminRepository.SaveAsync();
        }
    }
}

