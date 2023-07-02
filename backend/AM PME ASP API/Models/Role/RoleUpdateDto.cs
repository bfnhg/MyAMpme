using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Role
{
    public class RoleUpdateDto
    {
        public string Id { get; set; }

        [Required] public string Name { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
