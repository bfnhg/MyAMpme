using System;
using System.ComponentModel.DataAnnotations;
using AM_PME_ASP_API.Models.Actif;

namespace AM_PME_ASP_API.Models.Emplacement
{
    public class EmplacementCreateDto
    {
        [Required] public string NomEmp { get; set; }

        public int? EmployeId { get; set; }

        public DateTime? CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
        public DateTime? UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
    }
}

