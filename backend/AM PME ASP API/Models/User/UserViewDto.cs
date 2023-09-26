using System;
using System.ComponentModel.DataAnnotations;
using AM_PME_ASP_API.Models.Role;

namespace AM_PME_ASP_API.Models.User
{
	public class UserViewDto
	{
        public string Id { get; set; }

        public string FullName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string? PhoneNumber { get; set; }

        public bool Active { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public List<RoleViewDto> Roles { get; set; }

        public long EnterpriseId { get; set; }
    }
}

