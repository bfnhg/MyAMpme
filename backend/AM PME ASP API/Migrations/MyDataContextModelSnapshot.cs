﻿// <auto-generated />
using System;
using AM_PME_ASP_API.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AMPMEASPAPI.Migrations
{
    [DbContext(typeof(MyDataContext))]
    partial class MyDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Actif", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("AssignedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("AssignedToId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("DateAchat")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DateChangement")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DateRecu")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("EmplacementId")
                        .HasColumnType("int");

                    b.Property<int>("Etat")
                        .HasColumnType("int")
                        .HasColumnName("Etat");

                    b.Property<string>("Etiquette")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("FinGarantie")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Fonction")
                        .HasColumnType("longtext");

                    b.Property<int?>("FournisseurId")
                        .HasColumnType("int");

                    b.Property<string>("Groupe")
                        .HasColumnType("longtext");

                    b.Property<int?>("HeureUtilisation")
                        .HasColumnType("int");

                    b.Property<DateTime?>("InstalledAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("MaintenanceEffectueLe")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("ManagedById")
                        .HasColumnType("int");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<string>("NumBonCommande")
                        .HasColumnType("longtext");

                    b.Property<string>("NumeroSerie")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("OwnedById")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ProchaineMaintenance")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("ProduitId")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("AssignedToId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("EmplacementId");

                    b.HasIndex("Etiquette")
                        .IsUnique();

                    b.HasIndex("FournisseurId");

                    b.HasIndex("ManagedById");

                    b.HasIndex("OwnedById");

                    b.HasIndex("ProduitId");

                    b.HasIndex("UpdatedBy");

                    b.HasIndex("NumeroSerie", "ProduitId")
                        .IsUnique();

                    b.ToTable("Actifs");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Emplacement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("varchar(255)");

                    b.Property<int?>("EmployeId")
                        .HasColumnType("int");

                    b.Property<string>("NomEmp")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("EmployeId");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("Emplacement");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Employe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Poste")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Telephone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("Employes");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Fournisseur", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Adresse")
                        .IsRequired()
                        .HasColumnType("varchar(1000)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Telephone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("Fournisseurs");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Produit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Classe")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<decimal?>("CoutAcquisition")
                        .HasPrecision(9, 2)
                        .HasColumnType("decimal(9,2)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("FinSupport")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("FinVie")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal?>("MTBF")
                        .HasPrecision(9, 2)
                        .HasColumnType("decimal(9,2)");

                    b.Property<string>("Manufacturier")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<string>("NomModele")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<string>("NumeroModele")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<int>("PeriodeGarantie")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("UpdatedBy");

                    b.HasIndex("NumeroModele", "NomModele")
                        .IsUnique();

                    b.ToTable("Produits");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Role", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("CreatorId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("UpdaterId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.HasIndex("UpdaterId");

                    b.ToTable("roles", (string)null);
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.HasIndex("UpdatedBy");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.UserRole", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("user_roles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Actif", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.Employe", "AssignedTo")
                        .WithMany("AssignedActifs")
                        .HasForeignKey("AssignedToId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("AM_PME_ASP_API.Entities.User", "User")
                        .WithMany("Actifs")
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("AM_PME_ASP_API.Entities.Emplacement", "Emplacement")
                        .WithMany("Actifs")
                        .HasForeignKey("EmplacementId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("AM_PME_ASP_API.Entities.Fournisseur", "Fournisseur")
                        .WithMany("Actifs")
                        .HasForeignKey("FournisseurId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("AM_PME_ASP_API.Entities.Employe", "ManagedBy")
                        .WithMany("ManagedActifs")
                        .HasForeignKey("ManagedById")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("AM_PME_ASP_API.Entities.Employe", "OwnedBy")
                        .WithMany("OwnedActifs")
                        .HasForeignKey("OwnedById")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("AM_PME_ASP_API.Entities.Produit", "Produit")
                        .WithMany("Actifs")
                        .HasForeignKey("ProduitId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("AM_PME_ASP_API.Entities.User", "Updater")
                        .WithMany()
                        .HasForeignKey("UpdatedBy");

                    b.Navigation("AssignedTo");

                    b.Navigation("Emplacement");

                    b.Navigation("Fournisseur");

                    b.Navigation("ManagedBy");

                    b.Navigation("OwnedBy");

                    b.Navigation("Produit");

                    b.Navigation("Updater");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Emplacement", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatedBy");

                    b.HasOne("AM_PME_ASP_API.Entities.Employe", "Employe")
                        .WithMany("Emplacements")
                        .HasForeignKey("EmployeId");

                    b.HasOne("AM_PME_ASP_API.Entities.User", "Updater")
                        .WithMany()
                        .HasForeignKey("UpdatedBy");

                    b.Navigation("Creator");

                    b.Navigation("Employe");

                    b.Navigation("Updater");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Employe", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatedBy");

                    b.HasOne("AM_PME_ASP_API.Entities.User", "Updater")
                        .WithMany()
                        .HasForeignKey("UpdatedBy");

                    b.Navigation("Creator");

                    b.Navigation("Updater");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Fournisseur", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatedBy");

                    b.HasOne("AM_PME_ASP_API.Entities.User", "Updater")
                        .WithMany()
                        .HasForeignKey("UpdatedBy");

                    b.Navigation("Creator");

                    b.Navigation("Updater");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Produit", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatedBy");

                    b.HasOne("AM_PME_ASP_API.Entities.User", "Updater")
                        .WithMany()
                        .HasForeignKey("UpdatedBy");

                    b.Navigation("Creator");

                    b.Navigation("Updater");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Role", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatorId");

                    b.HasOne("AM_PME_ASP_API.Entities.User", "Updater")
                        .WithMany()
                        .HasForeignKey("UpdaterId");

                    b.Navigation("Creator");

                    b.Navigation("Updater");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.User", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("AM_PME_ASP_API.Entities.User", "Updater")
                        .WithMany()
                        .HasForeignKey("UpdatedBy")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Creator");

                    b.Navigation("Updater");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.UserRole", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AM_PME_ASP_API.Entities.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("AM_PME_ASP_API.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Emplacement", b =>
                {
                    b.Navigation("Actifs");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Employe", b =>
                {
                    b.Navigation("AssignedActifs");

                    b.Navigation("Emplacements");

                    b.Navigation("ManagedActifs");

                    b.Navigation("OwnedActifs");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Fournisseur", b =>
                {
                    b.Navigation("Actifs");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Produit", b =>
                {
                    b.Navigation("Actifs");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.Role", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("AM_PME_ASP_API.Entities.User", b =>
                {
                    b.Navigation("Actifs");

                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
