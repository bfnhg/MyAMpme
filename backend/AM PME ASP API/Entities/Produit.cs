using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Entities
{
    [Table("Produits")]
    [Index(nameof(NumeroModele), nameof(NomModele) , IsUnique = true)]
    public class Produit
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required][Column(TypeName = "varchar(200)")] public string NomModele { get; set; }
        [Required][Column(TypeName = "varchar(200)")] public string Classe { get; set; }
        [Required][Column(TypeName = "varchar(100)")] public string NumeroModele { get; set; }
        [Required][Column(TypeName = "varchar(200)")] public string Manufacturier { get; set; }
        [Precision(9, 2)] public decimal? CoutAcquisition { get; set; } = 0;
        public int PeriodeGarantie { get; set; } = 0;
        public DateTime? FinSupport { get; set; }
        public DateTime? FinVie { get; set; }
        [Precision(9, 2)] public decimal? MTBF { get; set; } = 0;

        public string? CreatedBy { get; set; }
        public User? Creator { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? UpdatedBy { get; set; }
        public User? Updater { get; set; }
        public DateTime UpdatedAt { get; set; }

        public bool Active { get; set; } = true;

        public List<Actif> Actifs { get; set; }
    }
}
