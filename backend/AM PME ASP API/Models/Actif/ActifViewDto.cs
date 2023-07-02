using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models.User;
using AM_PME_ASP_API.Models.Employe;
using AM_PME_ASP_API.Models.Produit;
using AM_PME_ASP_API.Models.Fournisseur;
using AM_PME_ASP_API.Models.Emplacement;

namespace AM_PME_ASP_API.Models.Actif
{
    public class ActifViewDto
    {
        public int Id { get; set; }
        public string Etiquette { get; set; }
        public string Nom { get; set; }
        public Etat Etat { get; set; }
        public DateTime? DateChangement { get; set; }
        public string? NumBonCommande { get; set; }
        public string Groupe { get; set; }
        public string Fonction { get; set; }
        public DateTime MaintenanceEffectueLe { get; set; }
        public DateTime? DateAchat { get; set; }
        public DateTime? ProchaineMaintenance { get; set; }
        public DateTime? FinGarantie { get; set; }
        public DateTime? AssignedAt { get; set; }
        public DateTime? InstalledAt { get; set; }
        public DateTime? DateRecu { get; set; }

        public int? HeureUtilisation { get; set; }
        public string NumeroSerie { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ProduitViewDto Produit { get; set; }

        public EmployeViewDto AssignedTo { get; set; }

        public EmployeViewDto ManagedBy { get; set; }

        public EmployeViewDto OwnedBy { get; set; }

        public UserViewDto User { get; set; }

        public UserViewDto Updater { get; set; }

        public EmplacementViewDto Emplacement { get; set; }

        public FournisseurViewDto Fournisseur { get; set; }
    }
}

