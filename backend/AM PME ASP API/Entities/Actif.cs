using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Entities
{
    [Table("Actifs")]
    [Index(nameof(NumeroSerie), nameof(ProduitId), IsUnique = true)]
    [Index(nameof(Etiquette), IsUnique = true)]
    public class Actif 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Etiquette { get; set; }
        [Required][Column(TypeName = "varchar(200)")] public string Nom { get; set; }
        public Etat Etat { get; set; }
        public DateTime? DateChangement { get; set; }
        public string? NumBonCommande { get; set; }
        public string? Groupe { get; set; }
        public string? Fonction { get; set; }
        public DateTime? MaintenanceEffectueLe { get; set; }
        [Column(TypeName = "varchar(50)")] public string NumeroSerie { get; set; }

        public int? AssignedToId { get; set; }
        public Employe? AssignedTo { get; set; }

        public int? ManagedById { get; set; }
        public Employe? ManagedBy { get; set; }

        public int? OwnedById { get; set; }
        public Employe? OwnedBy { get; set; }

        public string? CreatedBy { get; set; }
        public User? User { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? UpdatedBy { get; set; }
        public User? Updater { get; set; }
        public DateTime UpdatedAt { get; set; }

        public int? ProduitId { get; set; }
        public Produit? Produit { get; set; }

        public int? FournisseurId { get; set; }
        public Fournisseur? Fournisseur { get; set; }

        public int? EmplacementId { get; set; }
        public Emplacement? Emplacement { get; set; }

        public bool Active { get; set; } = true;

        public DateTime? ProchaineMaintenance { get; set; }

        public DateTime? FinGarantie { get; set; }

        public DateTime? AssignedAt { get; set; }

        public DateTime? InstalledAt { get; set; }

        public DateTime? DateRecu { get; set; }

        public DateTime? DateAchat { get; set; }

        public int? HeureUtilisation { get; set; }

        public void SetEtat(Etat etat)
        {
            if (etat == Etat.EnUtilisation && Etat != Etat.EnUtilisation)
            {
                AssignedAt = DateTime.UtcNow;
            }
            else if (etat != Etat.EnUtilisation && Etat == Etat.EnUtilisation)
            {
                if (etat == Etat.EnStock)
                {
                    HeureUtilisation = AssignedAt.HasValue ? (int)AssignedAt.Value.Subtract(DateTime.UtcNow).TotalHours : 0;
                }
                else
                {
                    var heureDebutUtilisation = AssignedAt.HasValue ? AssignedAt.Value.ToUniversalTime() : DateTime.UtcNow;
                    var heureActuelle = DateTime.UtcNow;
                    var heureUtilisation = (int)heureActuelle.Subtract(heureDebutUtilisation).TotalHours;
                    HeureUtilisation += heureUtilisation;
                }
            }

            Etat = etat;
        }

        // Champs non mappés
        [NotMapped]
        public bool IsEnUtilisation
        {
            get { return Etat == Etat.EnUtilisation; }
        }

        [NotMapped]
        public bool IsEnStock
        {
            get { return Etat == Etat.EnStock; }
        }

        [NotMapped]
        public bool IsEnCommande
        {
            get { return Etat == Etat.EnCommande; }
        }

        [NotMapped]
        public bool IsEnMaintenance
        {
            get { return Etat == Etat.EnMaintenance; }
        }

        [NotMapped]
        public bool IsRetire
        {
            get { return Etat == Etat.Retire; }
        }

        [NotMapped]
        public bool IsDispose
        {
            get { return Etat == Etat.Dispose; }
        }
    }
}