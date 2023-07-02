using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.User
{
	public class UserUpdateDto
	{
        [Required] public string Email { get; set; }

        public string FullName { get; set; }

        public string UserName { get; set; }
    }
}

