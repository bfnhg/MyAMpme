using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Role
{
    public class RoleCreateDto
    {
        [Required] public string Name { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
