using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class ImportEmployesController : ControllerBase
    {
        private readonly MyDataContext _db;

        public ImportEmployesController(MyDataContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> ImportEmploye(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0) return BadRequest("No file found");
                if (!file.FileName.EndsWith(".xlsx")) return BadRequest("Invalid file type");

                List<Employe> employes = new List<Employe>();

                using (var stream = file.OpenReadStream())
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets[1];

                    for (int row = 2; row <= worksheet.Dimension.End.Row; row++)
                    {
                        var email = worksheet.Cells[row, 2].Value?.ToString() ?? "";

                        // Vérifier si l'employé existe déjà dans la base de données
                        var existingEmploye = await _db.Employes.FirstOrDefaultAsync(e => e.Email == email);

                        if (existingEmploye == null)
                        {
                            var employe = new Employe
                            {
                                FullName = worksheet.Cells[row, 1].Value?.ToString() ?? "",
                                Email = email,
                                Telephone = worksheet.Cells[row, 3].Value?.ToString() ?? "",
                                Poste = worksheet.Cells[row, 4].Value?.ToString() ?? "",
                            };
                            employe.CreatedAt = DateTime.UtcNow;
                            employe.UpdatedAt = DateTime.UtcNow;

                            employes.Add(employe);
                        }
                    }
                }

                // Ajouter les employes dans la base de données
                _db.Employes.AddRange(employes);
                await _db.SaveChangesAsync();

                return Ok($"Le fichier a été importé avec succès ({employes.Count} employes ajoutés)");
            }
            catch (FormatException ex)
            {
                return BadRequest($"Le format des données dans le fichier est incorrect : {ex.Message}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Une erreur s'est produite lors de l'importation du fichier : {ex.Message}");
            }
        }

    }
}

