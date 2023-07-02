using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AM_PME_ASP_API.Entities
{
    [Table("Employes")]
    public class Employe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required][Column(TypeName = "varchar(100)")] public string FullName { get; set; }
        [Required][EmailAddress][StringLength(255)] public string Email { get; set; }
        [Required][Phone] public string Telephone { get; set; }
        [Required][Column(TypeName = "varchar(200)")] public string Poste { get; set; }

        public string? CreatedBy { get; set; }
        public User? Creator { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? UpdatedBy { get; set; }
        public User? Updater { get; set; }
        public DateTime UpdatedAt { get; set; }

        public bool Active { get; set; } = true;

        public List<Emplacement> Emplacements { get; set; }

        public List<Actif> AssignedActifs { get; set; }

        public List<Actif> ManagedActifs { get; set; }

        public List<Actif> OwnedActifs { get; set; }
    }
}

