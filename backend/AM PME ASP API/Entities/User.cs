using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Entities
{
    [Table("Users")]
    [Index(nameof(Email), IsUnique = true)]
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public bool Active { get; set; } = true;
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        public string? CreatedBy { get; set; }
        public User? Creator { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? UpdatedBy { get; set; }
        public User? Updater { get; set; }
        public DateTime UpdatedAt { get; set; }

        public List<UserRole> UserRoles { get; set; }

        public List<Actif> Actifs { get; set; }




        public Entreprise Entreprise { get; set; }
        public long EntrepriseId { get; set; }
    }
}

