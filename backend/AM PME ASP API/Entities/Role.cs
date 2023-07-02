using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace AM_PME_ASP_API.Entities
{
    [Table("Roles")]
    public class Role : IdentityRole
    {
        public string? CreatedBy { get; set; }
        public User? Creator { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? UpdatedBy { get; set; }
        public User? Updater { get; set; }
        public DateTime UpdatedAt { get; set; }

        public bool Active { get; set; } = true;

        public List<UserRole> UserRoles { get; set; }
    }
}
