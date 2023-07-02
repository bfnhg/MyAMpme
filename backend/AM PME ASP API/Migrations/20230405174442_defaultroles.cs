using AM_PME_ASP_API.Entities;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AMPMEASPAPI.Migrations
{
    /// <inheritdoc />
    public partial class defaultroles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Create the Admin, Responsable, and Membre roles :
            // Create the admin role :
            var adminRole = new Role
            {
                Name = "Admin",
                NormalizedName = "ADMIN",
                CreatedBy = "system",
                CreatedAt = DateTime.UtcNow,
                UpdatedBy = null,
                UpdatedAt = DateTime.UtcNow,
                Active = true,
            };

            var responsableRole = new Role
            {
                Name = "Responsable",
                NormalizedName = "RESPONSABLE",
                CreatedBy = "system",
                CreatedAt = DateTime.UtcNow,
                UpdatedBy = null,
                UpdatedAt = DateTime.UtcNow,
                Active = true,
            };

            var membreRole = new Role
            {
                Name = "Membre",
                NormalizedName = "MEMBRE",
                CreatedBy = "system",
                CreatedAt = DateTime.UtcNow,
                UpdatedBy = null,
                UpdatedAt = DateTime.UtcNow,
                Active = true,
            };
            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "Id", "Name", "NormalizedName", "CreatedBy", "CreatedAt", "UpdatedBy", "UpdatedAt", "Active" },
                values: new object[,]
                {
                    { "1", adminRole.Name, adminRole.NormalizedName, adminRole.CreatedBy, adminRole.CreatedAt, adminRole.UpdatedBy, adminRole.UpdatedAt, adminRole.Active },
                    { "2", responsableRole.Name, responsableRole.NormalizedName, responsableRole.CreatedBy, responsableRole.CreatedAt, responsableRole.UpdatedBy, responsableRole.UpdatedAt, responsableRole.Active },
                    { "3", membreRole.Name, membreRole.NormalizedName, membreRole.CreatedBy, membreRole.CreatedAt, membreRole.UpdatedBy, membreRole.UpdatedAt, membreRole.Active },
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the roles
            migrationBuilder.DeleteData(
                table: "roles",
                keyColumn: "Id",
                keyValues: new object[] { "1", "2", "3" });
        }
    }
}
