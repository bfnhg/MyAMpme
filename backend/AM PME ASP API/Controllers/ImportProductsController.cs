using System;
using AM_PME_ASP_API.Entities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Globalization;
using AM_PME_ASP_API.Helpers;
using AM_PME_ASP_API.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class ImportProductsController : ControllerBase
    {
        private readonly MyDataContext _db;

        public ImportProductsController(MyDataContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> ImportProduct(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0) return BadRequest("No file found");
                if (!file.FileName.EndsWith(".xlsx")) return BadRequest("Invalid file type");

                List<Produit> produits = new List<Produit>();

                using (var stream = file.OpenReadStream())
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets[2];

                    for (int row = 2; row <= worksheet.Dimension.End.Row; row++)
                    {
                        var nomModele = worksheet.Cells[row, 1].Value?.ToString() ?? "";
                        var numeroModele = worksheet.Cells[row, 5].Value?.ToString() ?? "";

                        // Vérifier si le produit existe déjà dans la base de données
                        var existingProduct = await _db.Produits.FirstOrDefaultAsync(p => p.NomModele == nomModele && p.NumeroModele == numeroModele);
                        if (existingProduct == null)
                        {
                            var produit = new Produit
                            {
                                NomModele = nomModele,
                                Classe = worksheet.Cells[row, 2].Value?.ToString() ?? "",
                                CoutAcquisition = decimal.Parse(worksheet.Cells[row, 3].Value?.ToString() ?? "0"),
                                Manufacturier = worksheet.Cells[row, 4].Value?.ToString() ?? "",
                                NumeroModele = numeroModele,
                                PeriodeGarantie = int.Parse(worksheet.Cells[row, 6].Value?.ToString() ?? "0")
                            };

                            try
                            {
                                object finVieValue = worksheet.Cells[row, 7].Value;
                                if (finVieValue != null && double.TryParse(finVieValue.ToString(), out double finVieOADate))
                                {
                                    produit.FinVie = DateTime.FromOADate(finVieOADate);
                                }
                                else
                                {
                                    produit.FinVie = null;
                                }
                                object finSupportValue = worksheet.Cells[row, 8].Value;
                                if (finSupportValue != null && double.TryParse(finSupportValue.ToString(), out double finSupportOADate))
                                {
                                    produit.FinSupport = DateTime.FromOADate(finSupportOADate);
                                }
                                else
                                {
                                    produit.FinSupport = null;
                                }
                            }
                            catch (Exception ex)
                            {
                                return BadRequest($"Erreur lors de l'analyse des dates à la ligne {row}: {ex.Message}");
                            }

                            produit.MTBF = decimal.Parse(worksheet.Cells[row, 9].Value?.ToString() ?? "0");
                            produit.CreatedAt = DateTime.UtcNow;
                            produit.UpdatedAt = DateTime.UtcNow;

                            produits.Add(produit);
                        }
                    }
                }

                // Vérifier les duplications de données
                var doublons = produits.GroupBy(p => new { p.NomModele, p.NumeroModele })
                                                   .Where(g => g.Count() > 1)
                                                   .Select(g => g.Key);

                if (doublons.Any())
                {
                    var doublonsString = string.Join(", ", doublons.Select(d => $"Nom de modèle : {d.NomModele}, Numéro de modèle : {d.NumeroModele}"));
                    return BadRequest($"Le fichier contient des données dupliquées : {doublonsString}");
                }

                // Ajouter les produits dans la base de données
                _db.Produits.AddRange(produits);
                await _db.SaveChangesAsync();

                return Ok($"Le fichier a été importé avec succès ({produits.Count} produits ajoutés)");
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

