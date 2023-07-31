using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Mysqlx.Crud;
using OfficeOpenXml;

namespace AM_PME_ASP_API.Repositories.Imp
{
	public class ExportRepository : IExportRepository
	{
        private readonly MyDataContext _db;

        public ExportRepository(MyDataContext db) { _db = db; }

        public async Task<byte[]> ExportActifDataToExcel(string fileName, List<string> fields)
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Actifs");

                var actifData = await _db.Actifs.Include(a => a.AssignedTo)
                                                .Include(a => a.ManagedBy)
                                                .Include(a => a.OwnedBy)
                                                .Include(a => a.User)
                                                .Include(a => a.Updater)
                                                .Include(a => a.Produit)
                                                .Include(a => a.Fournisseur)
                                                .Include(a => a.Emplacement)
                                                .ToListAsync();

                if(fields.Count == 0)
                {
                    fields = new List<string>
                    {
                       "Étiquette",
                        "Nom",
                        "Numéro de série",
                        "Affecté à",
                        "Groupe de support",
                        "Nom du modèle",
                        "Numéro de modèle",
                        "Classe",
                        "Coût",
                        "Date de changement d'état",
                        "Numéro de commande",
                        "Fabricant",
                        "MTBF",
                        "Fin du support",
                        "Fin de vie",
                        "État",
                        "Créé le",
                        "Créé par",
                        "Géré par",
                        "Date d'achat",
                        "Possédé par",
                        "Mis à jour le",
                        "Mis à jour par",
                        "Affecté le",
                        "Prochaine maintenance",
                        "Reçu le",
                        "Installé le",
                        "Fin de garantie",
                        "Durée d'utilisation",
                        "Emplacement",
                        "Fonction",
                        "Fournisseur",
                        "Maintenance effectuée le"
                    };
                }

                for (int i = 0; i < fields.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = fields[i];
                }

                for (int i = 0; i < actifData.Count; i++)
                {
                    var actif = actifData[i];

                    for (int j = 0; j < fields.Count; j++)
                    {
                        var field = fields[j];

                        if (field == "Étiquette") worksheet.Cells[i + 2, j + 1].Value = actif.Etiquette;
                        else if (field == "Nom") worksheet.Cells[i + 2, j + 1].Value = actif.Nom;
                        else if (field == "Numéro de série") worksheet.Cells[i + 2, j + 1].Value = actif.NumeroSerie;
                        else if (field == "Affecté à") worksheet.Cells[i + 2, j + 1].Value = actif.AssignedTo?.FullName;
                        else if (field == "Groupe de support") worksheet.Cells[i + 2, j + 1].Value = actif.Groupe;
                        else if (field == "Nom du modèle") worksheet.Cells[i + 2, j + 1].Value = actif.Produit?.NomModele;
                        else if (field == "Numéro de modèle") worksheet.Cells[i + 2, j + 1].Value = actif.Produit?.NumeroModele;
                        else if (field == "Classe") worksheet.Cells[i + 2, j + 1].Value = actif.Produit?.Classe;
                        else if (field == "Coût") worksheet.Cells[i + 2, j + 1].Value = actif.Produit?.CoutAcquisition;
                        else if (field == "Date de changement d'état") worksheet.Cells[i + 2, j + 1].Value = actif.DateChangement;
                        else if (field == "Numéro de commande") worksheet.Cells[i + 2, j + 1].Value = actif.NumBonCommande;
                        else if (field == "Fabricant") worksheet.Cells[i + 2, j + 1].Value = actif.Produit?.Manufacturier;
                        else if (field == "MTBF") worksheet.Cells[i + 2, j + 1].Value = actif.Produit?.MTBF;
                        else if (field == "Fin du support") worksheet.Cells[i + 2, j + 1].Value = actif.Produit?.FinSupport;
                        else if (field == "Fin de vie") worksheet.Cells[i + 2, j + 1].Value = actif.Produit?.FinVie;
                        else if (field == "État") worksheet.Cells[i + 2, j + 1].Value = actif.Etat;
                        else if (field == "Créé le") worksheet.Cells[i + 2, j + 1].Value = actif.CreatedAt;
                        else if (field == "Créé par") worksheet.Cells[i + 2, j + 1].Value = actif.User?.FullName;
                        else if (field == "Géré par") worksheet.Cells[i + 2, j + 1].Value = actif.ManagedBy?.FullName;
                        else if (field == "Date d'achat") worksheet.Cells[i + 2, j + 1].Value = actif.DateAchat;
                        else if (field == "Possédé par") worksheet.Cells[i + 2, j + 1].Value = actif.OwnedBy?.FullName;
                        else if (field == "Mis à jour le") worksheet.Cells[i + 2, j + 1].Value = actif.UpdatedAt;
                        else if (field == "Mis à jour par") worksheet.Cells[i + 2, j + 1].Value = actif.Updater?.FullName;
                        else if (field == "Affecté le") worksheet.Cells[i + 2, j + 1].Value = actif.AssignedAt;
                        else if (field == "Prochaine maintenance") worksheet.Cells[i + 2, j + 1].Value = actif.ProchaineMaintenance;
                        else if (field == "Reçu le") worksheet.Cells[i + 2, j + 1].Value = actif.DateRecu;
                        else if (field == "Installé le") worksheet.Cells[i + 2, j + 1].Value = actif.InstalledAt;
                        else if (field == "Fin de garantie") worksheet.Cells[i + 2, j + 1].Value = actif.FinGarantie;
                        else if (field == "Durée d'utilisation") worksheet.Cells[i + 2, j + 1].Value = actif.HeureUtilisation;
                        else if (field == "Emplacement") worksheet.Cells[i + 2, j + 1].Value = actif.Emplacement?.NomEmp;
                        else if (field == "Fonction") worksheet.Cells[i + 2, j + 1].Value = actif.Fonction;
                        else if (field == "Fournisseur") worksheet.Cells[i + 2, j + 1].Value = actif.Fournisseur?.Name;
                        else if (field == "Maintenance effectuée le") worksheet.Cells[i + 2, j + 1].Value = actif.MaintenanceEffectueLe;
                    }
                }

                using (var stream = new MemoryStream())
                {
                    package.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public async Task<byte[]> ExportProduitDataToExcel(string fileName, List<string> fields)
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Produits");

                var produitData = await _db.Produits.Include(p => p.Updater).Include(p => p.Creator).ToListAsync();
                
                if (fields.Count == 0)
                {
                    fields = new List<string>
                    {
                        "Nom du modèle",
                        "Numéro de modèle",
                        "Classe",
                        "Coût",
                        "MTBF",
                        "Fin du support",
                        "Fin de vie",
                        "Créé le",
                        "Créé par",
                        "Mis à jour le",
                        "Mis à jour par",
                        "Période de Garantie",
                        "Manufacturier"
                    };
                }

                for (int i = 0; i < fields.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = fields[i];
                }

                for (int i = 0; i < produitData.Count; i++)
                {
                    var produit = produitData[i];

                    for (int j = 0; j < fields.Count; j++)
                    {
                        var field = fields[j];

                        if (field == "Nom du modèle") worksheet.Cells[i + 2, j + 1].Value = produit.NomModele;
                        else if (field == "Numéro de modèle") worksheet.Cells[i + 2, j + 1].Value = produit.NumeroModele;
                        else if (field == "Classe") worksheet.Cells[i + 2, j + 1].Value = produit.Classe;
                        else if (field == "Coût") worksheet.Cells[i + 2, j + 1].Value = produit.CoutAcquisition;
                        else if (field == "MTBF") worksheet.Cells[i + 2, j + 1].Value = produit.MTBF;
                        else if (field == "Fin du support") worksheet.Cells[i + 2, j + 1].Value = produit.FinSupport;
                        else if (field == "Fin de vie") worksheet.Cells[i + 2, j + 1].Value = produit.FinVie;
                        else if (field == "Créé le") worksheet.Cells[i + 2, j + 1].Value = produit.CreatedAt;
                        else if (field == "Créé par") worksheet.Cells[i + 2, j + 1].Value = produit.Creator?.FullName;
                        else if (field == "Mis à jour le") worksheet.Cells[i + 2, j + 1].Value = produit.UpdatedAt;
                        else if (field == "Mis à jour par") worksheet.Cells[i + 2, j + 1].Value = produit.Updater?.FullName;
                        else if (field == "Période de Garantie") worksheet.Cells[i + 2, j + 1].Value = produit.PeriodeGarantie;
                        else if (field == "Manufacturier") worksheet.Cells[i + 2, j + 1].Value = produit.Manufacturier;
                    }
                }

                using (var stream = new MemoryStream())
                {
                    package.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public async Task<byte[]> ExportEmployeDataToExcel(string fileName, List<string> fields)
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Employes");

                var employeData = await _db.Employes.Include(e => e.Creator).Include(e => e.Updater).ToListAsync();

                if (fields.Count == 0)
                {
                    fields = new List<string>
                    {
                        "FullName",
                        "Email",
                        "Telephone",
                        "Poste",
                        "Créé le",
                        "Créé par",
                        "Mis à jour le",
                        "Mis à jour par",
                    };
                }
                
                for (int i = 0; i < fields.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = fields[i];
                }
                
                for (int i = 0; i < employeData.Count; i++)
                {
                    var employe = employeData[i];

                    for (int j = 0; j < fields.Count; j++)
                    {
                        var field = fields[j];

                        if (field == "FullName") worksheet.Cells[i + 2, j + 1].Value = employe.FullName;
                        else if (field == "Email") worksheet.Cells[i + 2, j + 1].Value = employe.Email;
                        else if (field == "Telephone") worksheet.Cells[i + 2, j + 1].Value = employe.Telephone;
                        else if (field == "Poste") worksheet.Cells[i + 2, j + 1].Value = employe.Poste;
                        else if (field == "Créé le") worksheet.Cells[i + 2, j + 1].Value = employe.CreatedAt;
                        else if (field == "Créé par") worksheet.Cells[i + 2, j + 1].Value = employe.Creator?.FullName;
                        else if (field == "Mis à jour le") worksheet.Cells[i + 2, j + 1].Value = employe.UpdatedAt;
                        else if (field == "Mis à jour par") worksheet.Cells[i + 2, j + 1].Value = employe.Updater?.FullName;
                    }
                }
                
                using (var stream = new MemoryStream())
                {
                    package.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public async Task<byte[]> ExportEmplacementDataToExcel(string fileName, List<string> fields)
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Emplacements");

                var emplacementData = await _db.Emplacements.Include(emp => emp.Employe)
                                                            .Include(emp => emp.Creator)
                                                            .Include(emp => emp.Updater)
                                                            .ToListAsync();
                
                if (fields.Count == 0)
                {
                    fields = new List<string>
                    {
                        "Name",
                        "Responsable",
                        "Créé le",
                        "Créé par",
                        "Mis à jour le",
                        "Mis à jour par",
                    };
                }
                
                for (int i = 0; i < fields.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = fields[i];
                }
                
                for (int i = 0; i < emplacementData.Count; i++)
                {
                    var emplacement = emplacementData[i];

                    for (int j = 0; j < fields.Count; j++)
                    {
                        var field = fields[j];

                        if (field == "Name") worksheet.Cells[i + 2, j + 1].Value = emplacement.NomEmp;
                        else if (field == "Responsable") worksheet.Cells[i + 2, j + 1].Value = emplacement.Employe?.FullName;
                        else if (field == "Créé le") worksheet.Cells[i + 2, j + 1].Value = emplacement.CreatedAt;
                        else if (field == "Créé par") worksheet.Cells[i + 2, j + 1].Value = emplacement.Creator?.FullName;
                        else if (field == "Mis à jour le") worksheet.Cells[i + 2, j + 1].Value = emplacement.UpdatedAt;
                        else if (field == "Mis à jour par") worksheet.Cells[i + 2, j + 1].Value = emplacement.Updater?.FullName;
                    }
                }
                
                using (var stream = new MemoryStream())
                {
                    package.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }

        public async Task<byte[]> ExportFournisseurDataToExcel(string fileName, List<string> fields)
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Fournisseurs");

                var fournisseurData = await _db.Fournisseurs.Include(f => f.Creator)
                                                            .Include(f => f.Updater)
                                                            .ToListAsync();

                if (fields.Count == 0)
                {
                    fields = new List<string>
                    {
                        "Name",
                        "Email",
                        "Telephone",
                        "Adresse",
                        "Créé le",
                        "Créé par",
                        "Mis à jour le",
                        "Mis à jour par",
                    };
                }
                
                for (int i = 0; i < fields.Count; i++)
                {
                    worksheet.Cells[1, i + 1].Value = fields[i];
                }
                
                for (int i = 0; i < fournisseurData.Count; i++)
                {
                    var fournisseur = fournisseurData[i];

                    for (int j = 0; j < fields.Count; j++)
                    {
                        var field = fields[j];

                        if (field == "Name") worksheet.Cells[i + 2, j + 1].Value = fournisseur.Name;
                        else if (field == "Email") worksheet.Cells[i + 2, j + 1].Value = fournisseur.Email;
                        else if (field == "Telephone") worksheet.Cells[i + 2, j + 1].Value = fournisseur.Telephone;
                        else if (field == "Adresse") worksheet.Cells[i + 2, j + 1].Value = fournisseur.Adresse;
                        else if (field == "Créé le") worksheet.Cells[i + 2, j + 1].Value = fournisseur.CreatedAt;
                        else if (field == "Créé par") worksheet.Cells[i + 2, j + 1].Value = fournisseur.Creator?.FullName;
                        else if (field == "Mis à jour le") worksheet.Cells[i + 2, j + 1].Value = fournisseur.UpdatedAt;
                        else if (field == "Mis à jour par") worksheet.Cells[i + 2, j + 1].Value = fournisseur.Updater?.FullName;
                    }
                }

                using (var stream = new MemoryStream())
                {
                    package.SaveAs(stream);
                    return stream.ToArray();
                }


            }
        }
    }
}

