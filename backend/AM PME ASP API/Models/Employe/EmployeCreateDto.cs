using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Employe
{
    public class EmployeCreateDto
    {
        [Required][MaxLength(50)] public string FullName { get; set; }

        [Required][MaxLength(120)] public string Email { get; set; }

        [Required] public string Telephone { get; set; }

        [Required][MaxLength(50)] public string Poste { get; set; }

        public DateTime? CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
        public DateTime? UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
    }
}

