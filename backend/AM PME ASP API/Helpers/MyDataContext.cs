using System.Security.Principal;
using System.Xml;
using AM_PME_ASP_API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Helpers
{
    public class MyDataContext : IdentityDbContext<
    User, Role, string, IdentityUserClaim<string>,
    UserRole,
    IdentityUserLogin<string>,
    IdentityRoleClaim<string>,
    IdentityUserToken<string>>
    {
        public MyDataContext(DbContextOptions<MyDataContext> options) : base(options) { }

        public DbSet<Produit> Produits { get; set; }
        public DbSet<Actif> Actifs { get; set; }
        public DbSet<Emplacement> Emplacements { get; set; }
        public DbSet<Fournisseur> Fournisseurs { get; set; }
        public DbSet<Employe> Employes { get; set; }
        public DbSet<Entreprise> Enterprise { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Actif>()
                .Property(a => a.Etat)
                .HasColumnName("Etat")
                .HasColumnType("int");

            modelBuilder.Entity<User>(u =>
            {
                // Each User can have many entries in the UserRole join table
                u.HasMany(e => e.UserRoles)
                    .WithOne(e => e.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
                u.ToTable("users");
            });

            modelBuilder.Entity<Role>(r =>
            {
                // Each Role can have many entries in the UserRole join table
                r.HasMany(e => e.UserRoles)
                    .WithOne(e => e.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
                r.ToTable("roles");
            });

            modelBuilder.Entity<UserRole>(ar => ar.ToTable("user_roles"));

            modelBuilder.Entity<Actif>()
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.CreatedBy).IsRequired(false);

            modelBuilder.Entity<Actif>()
                .HasOne(e => e.Updater)
                .WithMany()
                .HasForeignKey(e => e.UpdatedBy).IsRequired(false);

            modelBuilder.Entity<Produit>()
                .HasOne(e => e.Creator)
                .WithMany()
                .HasForeignKey(e => e.CreatedBy).IsRequired(false);

            modelBuilder.Entity<Produit>()
                .HasOne(e => e.Updater)
                .WithMany()
                .HasForeignKey(e => e.UpdatedBy).IsRequired(false);

            modelBuilder.Entity<Fournisseur>()
                .HasOne(e => e.Creator)
                .WithMany()
                .HasForeignKey(e => e.CreatedBy)
                .IsRequired(false);

            modelBuilder.Entity<Fournisseur>()
                .HasOne(e => e.Updater)
                .WithMany()
                .HasForeignKey(e => e.UpdatedBy)
                .IsRequired(false);

            modelBuilder.Entity<Emplacement>()
                .HasOne(e => e.Creator)
                .WithMany()
                .HasForeignKey(e => e.CreatedBy)
                .IsRequired(false);

            modelBuilder.Entity<Emplacement>()
                .HasOne(e => e.Updater)
                .WithMany()
                .HasForeignKey(e => e.UpdatedBy);

            modelBuilder.Entity<Employe>()
                .HasOne(e => e.Creator)
                .WithMany()
                .HasForeignKey(e => e.CreatedBy);

            modelBuilder.Entity<Employe>()
                .HasOne(e => e.Updater)
                .WithMany()
                .HasForeignKey(e => e.UpdatedBy);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Creator)
                .WithMany()
                .HasForeignKey(u => u.CreatedBy)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Updater)
                .WithMany()
                .HasForeignKey(u => u.UpdatedBy)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);

            // Actif associations :
            modelBuilder.Entity<Actif>()
                .HasOne(a => a.Produit)
                .WithMany(p => p.Actifs)
                .HasForeignKey(a => a.ProduitId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Actif>()
                .HasOne(a => a.User)
                .WithMany(u => u.Actifs)
                .HasForeignKey(a => a.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Actif>()
                .HasOne(a => a.Fournisseur)
                .WithMany(f => f.Actifs)
                .HasForeignKey(a => a.FournisseurId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Actif>()
                .HasOne(a => a.AssignedTo)
                .WithMany(aa => aa.AssignedActifs)
                .HasForeignKey(a => a.AssignedToId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Actif>()
                .HasOne(a => a.ManagedBy)
                .WithMany(ma => ma.ManagedActifs)
                .HasForeignKey(a => a.ManagedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Actif>()
                .HasOne(a => a.OwnedBy)
                .WithMany(oa => oa.OwnedActifs)
                .HasForeignKey(a => a.OwnedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Actif>()
                .HasOne(a => a.Emplacement)
                .WithMany(e => e.Actifs)
                .HasForeignKey(a => a.EmplacementId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
