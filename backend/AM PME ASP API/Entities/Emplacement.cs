using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Entities
{
    [Table("Emplacement")]
    public class Emplacement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required][Column(TypeName = "varchar(100)")] public string NomEmp { get; set; }

        public int? EmployeId { get; set; }
        public Employe Employe { get; set; }

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
