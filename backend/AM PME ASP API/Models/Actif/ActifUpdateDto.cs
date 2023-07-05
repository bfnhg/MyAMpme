using System;
using AM_PME_ASP_API.Entities;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace AM_PME_ASP_API.Models.Actif
{
    public class ActifUpdateDto
    {
        public int Id { get; set; }
        public string? Etiquette { get; set; }
        public string? Groupe { get; set; }
        public string? Fonction { get; set; }
        public DateTime? MaintenanceEffectueLe { get; set; }
        public int? EmplacementId { get; set; }
        public int? FournisseurId { get; set; }
        public int? AssignedToId { get; set; }
        public int? ManagedById { get; set; }
        public int? OwnedById { get; set; }
        public Etat Etat { get; set; }
        public DateTime? DateChangement { get; set; }
        public string? NumBonCommande { get; set; }
        public DateTime? DateAchat { get; set; }
        public DateTime UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
    }
}

