using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Employe
{
    public class EmployeUpdateDto
    {
        public int Id { get; set; }
        [Required][MaxLength(50)] public string FullName { get; set; }
        [Required][MaxLength(120)] public string Email { get; set; }
        [Required] public string Telephone { get; set; }
        [Required][MaxLength(50)] public string Poste { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

