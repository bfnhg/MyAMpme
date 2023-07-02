using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Entities
{
    [Table("Fournisseurs")]
    public class Fournisseur
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required] [Column(TypeName = "varchar(100)")] public string Name { get; set; }
        [Required] [EmailAddress] [StringLength(255)] public string Email { get; set; }
        [Required] [Phone] public string Telephone { get; set; }
        [Required] [Column(TypeName = "varchar(1000)")] public string Adresse { get; set; }

        public string? CreatedBy { get; set; }
        public User? Creator { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? UpdatedBy { get; set; }
        public User? Updater { get; set; }
        public DateTime UpdatedAt { get; set; }

        public List<Actif> Actifs { get; set; }

        public bool Active { get; set; } = true;
    }
}
