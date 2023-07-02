using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.User
{
	public class UserCreateDto
	{
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [Required] public string FullName { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public List<string> Roles { get; set; }
    }
}

