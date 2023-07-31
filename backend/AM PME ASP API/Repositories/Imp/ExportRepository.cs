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

        private static readonly Dictionary<string, Func<Actif, object>> actifFieldSelectors = new Dictionary<string, Func<Actif, object>>
{
    {"id", actif => actif.Id},
    {"etiquette", actif => actif.Etiquette},
    {"nom", actif => actif.Nom},
    {"numeroSerie", actif => actif.NumeroSerie},
    {"assignedTo", actif => actif.AssignedTo?.FullName},
    {"groupeSupport", actif => actif.Groupe},
    {"nomModel", actif => actif.Produit?.NomModele},
    {"modelNumber", actif => actif.Produit?.NumeroModele},
    {"class", actif => actif.Produit?.Classe},
    {"cost", actif => actif.Produit?.CoutAcquisition},
    {"periodeGarantie", actif => actif.Produit?.PeriodeGarantie},
    {"dateChangementEtat", actif => actif.DateChangement?.ToString("dd/MM/yyyy HH:mm")},
    {"numBonCommande", actif => actif.NumBonCommande},
    {"manufacturer", actif => actif.Produit?.Manufacturier},
    {"mtbf", actif => actif.Produit?.MTBF},
    {"finSupport", actif => actif.Produit?.FinSupport?.ToString("dd/MM/yyyy HH:mm")},
    {"finVie", actif => actif.Produit?.FinVie?.ToString("dd/MM/yyyy HH:mm")},
    {"etat", actif => actif.Etat},
    {"createdAt", actif => actif.CreatedAt.ToString("dd/MM/yyyy HH:mm")},
    {"createdBy", actif => actif.User?.FullName},
    {"gerePar", actif => actif.ManagedBy?.FullName},
    {"dateAchat", actif => actif.DateAchat?.ToString("dd/MM/yyyy HH:mm")},
    {"proprietede", actif => actif.OwnedBy?.FullName},
    {"updatedAt", actif => actif.UpdatedAt.ToString("dd/MM/yyyy HH:mm")},
    {"updatedBy", actif => actif.Updater?.FullName},
    {"assignedAt", actif => actif.AssignedAt?.ToString("dd/MM/yyyy HH:mm")},
    {"prochaineMaintenance", actif => actif.ProchaineMaintenance?.ToString("dd/MM/yyyy HH:mm")},
    {"dateRecu", actif => actif.DateRecu?.ToString("dd/MM/yyyy HH:mm")},
    {"installedAt", actif => actif.InstalledAt?.ToString("dd/MM/yyyy HH:mm")},
    {"finGarantie", actif => actif.FinGarantie?.ToString("dd/MM/yyyy HH:mm")},
    {"heureUtilisation", actif => actif.HeureUtilisation},
    {"emplacement", actif => actif.Emplacement?.NomEmp},
    {"fonction", actif => actif.Fonction},
    {"fournisseur", actif => actif.Fournisseur?.Name},
    {"maintenanceEffectueLe", actif => actif.MaintenanceEffectueLe?.ToString("dd/MM/yyyy HH:mm")}
};
        private static readonly Dictionary<string, string> actifFieldDisplayNames = new Dictionary<string, string>
{
    {"id", "ID"},
    {"etiquette", "Étiquette"},
    {"nom", "Nom"},
    {"numeroSerie", "Numéro de série"},
    {"assignedTo", "Affecté à"},
    {"groupeSupport", "Groupe de support"},
    {"nomModel", "Nom du modèle"},
    {"modelNumber", "Numéro de modèle"},
    {"class", "Classe"},
    {"cost", "Coût"},
    {"periodeGarantie", "Période de garantie"},
    {"dateChangementEtat", "Date de changement d'état"},
    {"numBonCommande", "Numéro de commande"},
    {"manufacturer", "Manufacturier"},
    {"mtbf", "MTBF"},
    {"finSupport", "Fin du support"},
    {"finVie", "Fin de vie"},
    {"etat", "État"},
    {"createdAt", "Créé le"},
    {"createdBy", "Créé par"},
    {"gerePar", "Géré par"},
    {"dateAchat", "Date d'achat"},
    {"proprietede", "Propriété de"},
    {"updatedAt", "Mis à jour le"},
    {"updatedBy", "Mis à jour par"},
    {"assignedAt", "Affecté le"},
    {"prochaineMaintenance", "Prochaine maintenance"},
    {"dateRecu", "Reçu le"},
    {"installedAt", "Installé le"},
    {"finGarantie", "Fin de garantie"},
    {"heureUtilisation", "Durée d'utilisation"},
    {"emplacement", "Emplacement"},
    {"fonction", "Fonction"},
    {"fournisseur", "Fournisseur"},
    {"maintenanceEffectueLe", "Maintenance effectuée le"}
};
        private static readonly Dictionary<string, Func<Produit, object>> produitFieldSelectors = new Dictionary<string, Func<Produit, object>>
{
    {"nomModele", produit => produit.NomModele},
    {"numeroModele", produit => produit.NumeroModele},
    {"classe", produit => produit.Classe},
    {"coutAcquisition", produit => produit.CoutAcquisition},
    {"mtbf", produit => produit.MTBF},
    {"finSupport", produit => produit.FinSupport?.ToString("dd/MM/yyyy HH:mm")},
    {"finVie", produit => produit.FinVie?.ToString("dd/MM/yyyy HH:mm")},
    {"createdAt", produit => produit.CreatedAt.ToString("dd/MM/yyyy HH:mm")},
    {"createdBy", produit => produit.Creator?.FullName},
    {"updatedAt", produit => produit.UpdatedAt.ToString("dd/MM/yyyy HH:mm")},
    {"updatedBy", produit => produit.Updater?.FullName},
    {"periodeGarantie", produit => produit.PeriodeGarantie},
    {"manufacturier", produit => produit.Manufacturier}
};

        private static readonly Dictionary<string, string> produitFieldDisplayNames = new Dictionary<string, string>
{
    {"nomModele", "Nom du modèle"},
    {"numeroModele", "Numéro de modèle"},
    {"classe", "Classe"},
    {"coutAcquisition", "Coût"},
    {"mtbf", "MTBF"},
    {"finSupport", "Fin du support"},
    {"finVie", "Fin de vie"},
    {"createdAt", "Créé le"},
    {"createdBy", "Créé par"},
    {"updatedAt", "Mis à jour le"},
    {"updatedBy", "Mis à jour par"},
    {"periodeGarantie", "Période de Garantie"},
    {"manufacturier", "Manufacturier"}
};


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

                for (int i = 0; i < fields.Count; i++)
                {
                    var field = fields[i];
                    var displayName = actifFieldDisplayNames.ContainsKey(field) ? actifFieldDisplayNames[field] : field;
                    worksheet.Cells[1, i + 1].Value = displayName;
                }

                for (int i = 0; i < actifData.Count; i++)
                {
                    var actif = actifData[i];

                    for (int j = 0; j < fields.Count; j++)
                    {
                        var field = fields[j];

                        if (actifFieldSelectors.ContainsKey(field))
                        {
                            worksheet.Cells[i + 2, j + 1].Value = actifFieldSelectors[field](actif);
                        }
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
<<<<<<< HEAD
                
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
=======
>>>>>>> cc8251f36ef7eb2d1e7c5631b7bfa12ad12d3c8c

                for (int i = 0; i < fields.Count; i++)
                {
                    var field = fields[i];
                    var displayName = produitFieldDisplayNames.ContainsKey(field) ? produitFieldDisplayNames[field] : field;
                    worksheet.Cells[1, i + 1].Value = displayName;
                }

                for (int i = 0; i < produitData.Count; i++)
                {
                    var produit = produitData[i];

                    for (int j = 0; j < fields.Count; j++)
                    {
                        var field = fields[j];

                        if (produitFieldSelectors.ContainsKey(field))
                        {
                            worksheet.Cells[i + 2, j + 1].Value = produitFieldSelectors[field](produit);
                        }
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

