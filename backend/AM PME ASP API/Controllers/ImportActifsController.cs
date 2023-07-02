using System;
using System.Globalization;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class ImportActifsController : ControllerBase
    {
        private readonly MyDataContext _db;

        public ImportActifsController(MyDataContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> ImportFromExcel(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0) return BadRequest("No file found");

                if (!file.FileName.EndsWith(".xlsx")) return BadRequest("Invalid file type");

                using (var stream = file.OpenReadStream())
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets[0];

                    List<Actif> assets = new List<Actif>();

                    for (int row = 2; row <= worksheet.Dimension.End.Row; row++)
                    {
                        var NomProduit = worksheet.Cells[row, 1].Value?.ToString() ?? "";
                        var NumeroModele = worksheet.Cells[row, 2].Value?.ToString() ?? "";
                        var existingProduit = await _db.Produits.FirstOrDefaultAsync(p => p.NomModele == NomProduit && p.NumeroModele == NumeroModele);

                        if (existingProduit == null) continue; 

                        var asset = new Actif
                        {
                            Produit = existingProduit,
                            Etiquette = worksheet.Cells[row, 3].Value?.ToString() ?? "",
                            Nom = worksheet.Cells[row, 4].Value?.ToString() ?? "",
                            NumeroSerie = worksheet.Cells[row, 5].Value?.ToString() ?? "",
                            Fonction = worksheet.Cells[row, 8].Value?.ToString() ?? "",
                            ManagedBy = null,
                            OwnedBy = null,
                            Emplacement = null,
                            NumBonCommande = worksheet.Cells[row, 14].Value?.ToString() ?? ""
                        };

                        var existingActif = await _db.Actifs.FirstOrDefaultAsync(a => a.NumeroSerie == asset.NumeroSerie && a.ProduitId == asset.ProduitId);
                        if (existingActif != null) continue;


                        if (!string.IsNullOrEmpty(asset.Etiquette))
                        {
                            var existingActifWithTag = await _db.Actifs.FirstOrDefaultAsync(a => a.Etiquette == asset.Etiquette);
                            if (existingActifWithTag != null) continue; 
                        }

                        DateTime.TryParse(worksheet.Cells[row, 6].Value?.ToString(), out DateTime finGarantieResult);
                        asset.FinGarantie = finGarantieResult != DateTime.MinValue ? finGarantieResult : (DateTime?)null;

                        DateTime.TryParse(worksheet.Cells[row, 12].Value?.ToString(), out DateTime prochaineMaintenanceResult);
                        asset.ProchaineMaintenance = prochaineMaintenanceResult != DateTime.MinValue ? prochaineMaintenanceResult : (DateTime?)null;

                        DateTime.TryParse(worksheet.Cells[row, 13].Value?.ToString(), out DateTime dateAchatResult);
                        asset.DateAchat = dateAchatResult != DateTime.MinValue ? dateAchatResult : (DateTime?)null;

                        var etatStr = worksheet.Cells[row, 7].Value?.ToString()?.Replace(" ", "");

                        if (string.IsNullOrEmpty(etatStr))
                        {
                            asset.Etat = Etat.EnCommande;
                        }
                        else
                        {
                            if (Enum.TryParse(typeof(Etat), etatStr, true, out object etatParsed))
                            {
                                asset.Etat = (Etat)etatParsed;
                            }
                            else
                            {
                                return BadRequest($"Erreur lors de l'analyse de l'état à la ligne {row}: Valeur inconnue '{etatStr}'");
                            }
                        }

                        // Check if Emplacement exists in the database
                        var EmplacementName = worksheet.Cells[row, 11].Value?.ToString() ?? "";
                        if (string.IsNullOrEmpty(EmplacementName))
                        {
                            asset.Emplacement = null;
                        }
                        else
                        {
                            var existingEmplacement = _db.Emplacements.FirstOrDefault(e => e.NomEmp == EmplacementName);
                            if (existingEmplacement != null)
                            {
                                asset.Emplacement = existingEmplacement;
                            }
                            else
                            {
                                var newEmplacement = new Emplacement { NomEmp = EmplacementName, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow };
                                _db.Emplacements.Add(newEmplacement);
                                asset.Emplacement = newEmplacement;
                            }
                        }

                        // Check if ManagedBy exists in the database
                        var ManagedByName = worksheet.Cells[row, 9].Value?.ToString() ?? "";
                        var existingManagedBy = _db.Employes.FirstOrDefault(e => e.FullName == ManagedByName);
                        if (existingManagedBy != null)
                        {
                            asset.ManagedBy = existingManagedBy;
                        }


                        // Check if OwnedBy exists in the database
                        var OwnedByName = worksheet.Cells[row, 10].Value?.ToString() ?? "";
                        var existingOwnedBy = _db.Employes.FirstOrDefault(e => e.FullName == OwnedByName);
                        if (existingOwnedBy != null)
                        {
                            asset.OwnedBy = existingOwnedBy;
                        }

                        asset.CreatedAt = DateTime.UtcNow;
                        asset.UpdatedAt = DateTime.UtcNow;

                        assets.Add(asset);
                    }

                    var duplicateAssets = assets.GroupBy(a => new { a.NumeroSerie, a.Nom }).Where(g => g.Count() > 1).SelectMany(g => g).ToList();
                    if (duplicateAssets.Any())
                    {
                        return BadRequest($"Les actifs suivants ont des numéros de série et des noms dupliqués: {string.Join(", ", duplicateAssets.Select(a => $"{a.NumeroSerie}-{a.Nom}"))}");
                    }

                    _db.Actifs.AddRange(assets);
                    await _db.SaveChangesAsync();

                    return Ok($"Le fichier a été importé avec succès ({assets.Count} actifs ajoutés)");
                }
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

