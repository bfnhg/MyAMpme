using AM_PME_ASP_API.Models.User;

namespace AM_PME_ASP_API.Models.Produit
{
    public class ProduitViewDto
    {
        public int Id { get; set; }
        public string NomModele { get; set; }
        public string NumeroModele { get; set; }
        public string Classe { get; set; }
        public decimal? CoutAcquisition { get; set; }
        public string Manufacturier { get; set; }
        public decimal? MTBF { get; set; }
        public int PeriodeGarantie { get; set; }
        public DateTime FinSupport { get; set; }
        public DateTime FinVie { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public UserViewDto Creator { get; set; }

        public UserViewDto Updater { get; set; }
    }
}

