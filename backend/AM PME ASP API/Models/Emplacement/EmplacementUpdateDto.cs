using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Emplacement
{
    public class EmplacementUpdateDto
    {
        public int Id { get; set; }

        [Required] public string NomEmp { get; set; }

        public int? EmployeId { get; set; }

        public DateTime UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
    }
}

