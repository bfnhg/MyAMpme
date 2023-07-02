using System;
using AM_PME_ASP_API.Entities;
using System.ComponentModel.DataAnnotations;
namespace AM_PME_ASP_API.Models.Actif
{
    public class ActifCreateDto
    {
        public int ProduitId { get; set; }
        public string? Etiquette { get; set; }
        [Required] public string NumeroSerie { get; set; }
        public string? Fonction { get; set; }
        public string? Groupe { get; set; }
        public Etat Etat { get; set; } = Etat.EnCommande;
        public DateTime? DateChangement { get; set; }
        public string? NumBonCommande { get; set; }
        public int? AssignedToId { get; set; }
        public int? ManagedById { get; set; }
        public int? OwnedById { get; set; }
        public string? CreatedBy { get; set; }
        public int? EmplacementId { get; set; }
        public DateTime? DateAchat { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

