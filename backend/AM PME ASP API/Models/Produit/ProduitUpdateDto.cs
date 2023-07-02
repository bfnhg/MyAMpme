using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Produit
{
	public class ProduitUpdateDto
	{
        public int Id { get; set; }
        public string NomModele { get; set; }
        public string NumeroModele { get; set; }
        public string Classe { get; set; }
        public string Manufacturier { get; set; }
        public decimal? CoutAcquisition { get; set; }
        public int PeriodeGarantie { get; set; }
        public DateTime? FinSupport { get; set; }
        public DateTime? FinVie { get; set; }
        public decimal? MTBF { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

