using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models
{
	public class LoginCredentials
	{
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required] public string Password { get; set; }
    }
}

