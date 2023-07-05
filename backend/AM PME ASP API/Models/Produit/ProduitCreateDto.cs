using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Produit
{
	public class ProduitCreateDto
	{
        [Required] public string NomModele { get; set; }
        [Required] public string NumeroModele { get; set; }
        public string? Classe { get; set; }
        public string? Manufacturier { get; set; }
        public decimal? CoutAcquisition { get; set; }
        public int? PeriodeGarantie { get; set; }
        public DateTime? FinSupport { get; set; }
        public DateTime? FinVie { get; set; }
        public decimal? MTBF { get; set; }
        public DateTime? CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
        public DateTime? UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
    }
}

