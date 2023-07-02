using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.AuthHelpers
{
	public class UserChangeRoleDto
	{
        [Required] public string Email { get; set; }

        [Required] public string RoleName { get; set; }
    }
}

