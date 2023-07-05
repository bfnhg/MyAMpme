using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Fournisseur
{
    public class FournisseurCreateDto
    {
        [Required(ErrorMessage = "Le nom du Fournisseur est obligatoire !")]
        [MaxLength(100, ErrorMessage = "Le nom du Fournisseur ne peut pas dépasser {1} caractères.")]
        public string Name { get; set; }

        [MaxLength(100, ErrorMessage = "L'email ne peut pas dépasser {1} caractères.")]
        [EmailAddress(ErrorMessage = "L'email n'est pas valide.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Le Numéro de Téléphone est obligatoire !")]
        [MaxLength(15, ErrorMessage = "Le Numéro de Téléphone ne peut pas dépasser {1} caractères.")]
        public string Telephone { get; set; }

        [Required(ErrorMessage = "L'Adresse du Fournisseur est obligatoire !")]
        [MaxLength(200, ErrorMessage = "L'adresse ne peut pas dépasser {1} caractères.")]
        public string Adresse { get; set; }

        public DateTime? CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
        public DateTime? UpdatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
    }
}

