using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Models.Fournisseur
{
	public class FournisseurUpdateDto
	{
        public int Id { get; set; }

        [Required(ErrorMessage = "Le nom du Fournisseur est obligatoire.")]
        [MaxLength(100, ErrorMessage = "Le nom du Fournisseur ne peut pas dépasser {1} caractères.")]
        public string Name { get; set; }

        [MaxLength(100, ErrorMessage = "L'email ne peut pas dépasser {1} caractères.")]
        [EmailAddress(ErrorMessage = "L'email n'est pas valide.")]
        public string Email { get; set; }

        [MaxLength(15, ErrorMessage = "Le Numéro de Téléphone ne peut pas dépasser {1} caractères.")]
        public string Telephone { get; set; }

        [MaxLength(200, ErrorMessage = "L'adresse ne peut pas dépasser {1} caractères.")]
        public string Adresse { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

