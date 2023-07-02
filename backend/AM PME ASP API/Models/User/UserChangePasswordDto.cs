using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.User
{
	public class UserChangePasswordDto
	{
        [Required] public string Email { get; set; }
        [Required] public string NewPassword { get; set; }
    }
}

