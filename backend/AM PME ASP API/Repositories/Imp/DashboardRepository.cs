using System;
using System.Linq;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Repositories.Imp
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly MyDataContext _db;

        public DashboardRepository(MyDataContext db) { _db = db; }

        public async Task<int> GetActifsCount()
        {
            return await _db.Actifs.CountAsync();
        }

        public async Task<int> GetProduitsCount()
        {
            return await _db.Produits.CountAsync();
        }

        public async Task<int> GetEmplacementsCount()
        {
            return await _db.Emplacements.CountAsync();
        }

        public async Task<int> GetFournisseursCount()
        {
            return await _db.Fournisseurs.CountAsync();
        }

        public async Task<int> GetEmployesCount()
        {
            return await _db.Employes.CountAsync();
        }


        public async Task<Dictionary<Etat, int>> GetActifsCountParEtat()
        {
            var actifs = await _db.Actifs
                            .GroupBy(a => a.Etat)
                            .Select(g => new { Etat = g.Key, Count = g.Count() })
                            .ToListAsync();

            return actifs.ToDictionary(a => a.Etat, a => a.Count);
        }


        public async Task<Dictionary<DateTime, decimal>> GetActifsExpenses(int? year = null, int? month = null)
        {
            var actifs = await _db.Actifs
                .Include(a => a.Produit)
                .Where(a => !year.HasValue || a.CreatedAt.Year == year.Value)
                .Where(a => !month.HasValue || a.CreatedAt.Month == month.Value)
                .Select(a => new {
                    a.CreatedAt.Year,
                    a.CreatedAt.Month,
                    Expense = a.Produit != null ? a.Produit.CoutAcquisition : (decimal?)null
                })
                .ToListAsync();

            var expenses = actifs.GroupBy(a => new { a.Year, a.Month })
                .Select(g => new {
                    Date = new DateTime(g.Key.Year, g.Key.Month, 1),
                    TotalExpense = g.Sum(a => a.Expense) ?? 0
                })
                .ToDictionary(a => a.Date, a => a.TotalExpense);

            return expenses;
        }


        public async Task<int> GetMaintenanceDueIn30Days()
        {
            var today = DateTime.UtcNow.Date;
            var dueDate = today.AddDays(30);

            var count = await _db.Actifs
                .CountAsync(a => a.ProchaineMaintenance.HasValue
                            && a.ProchaineMaintenance.Value.Date >= today
                            && a.ProchaineMaintenance.Value.Date <= dueDate);

            return count;
        }

        public async Task<ActionResult<Dictionary<Etat, double>>> GetActifsParEtatPourcentage()
        {
            var actifs = await _db.Actifs.ToListAsync();
            var totalActifs = actifs.Count;

            var result = new Dictionary<Etat, double>();
            foreach (Etat etat in Enum.GetValues(typeof(Etat)))
            {
                var count = actifs.Count(a => a.Etat == etat);
                var pourcentage = (double)count / totalActifs * 100;
                result.Add(etat, pourcentage);
            }

            return result;
        }

        public async Task<IEnumerable<KeyValuePair<string, int>>> GetAssetDistributionPerClassAndEtat()
        {
            var query = _db.Actifs
                .GroupBy(a => new { a.Produit.Classe, a.Etat })
                .Select(g => new KeyValuePair<string, int>($"{g.Key.Classe} - {g.Key.Etat}", g.Count()));

            return await query.ToListAsync();
        }

        public Dictionary<string, Dictionary<string, int>> GetAssetsAging()
        {
            var actifs = _db.Actifs.ToList();

            var agingTable = new Dictionary<string, Dictionary<string, int>>();

            // Add the different age ranges to the aging table
            agingTable.Add("< 1 yr", new Dictionary<string, int>());
            agingTable.Add(">1 and < 2yr", new Dictionary<string, int>());
            agingTable.Add("> 3 yr", new Dictionary<string, int>());

            // Add the different product classes to the aging table
            foreach (var product in _db.Produits)
            {
                if (!agingTable["< 1 yr"].ContainsKey(product.Classe))
                {
                    agingTable["< 1 yr"].Add(product.Classe, 0);
                }

                if (!agingTable[">1 and < 2yr"].ContainsKey(product.Classe))
                {
                    agingTable[">1 and < 2yr"].Add(product.Classe, 0);
                }

                if (!agingTable["> 3 yr"].ContainsKey(product.Classe))
                {
                    agingTable["> 3 yr"].Add(product.Classe, 0);
                }
            }

            foreach (var actif in actifs)
            {
                var age = DateTime.Now.Year - actif.DateAchat?.Year ?? 0;
                var productClass = actif.Produit?.Classe ?? "Unknown";

                // Ensure the product class key exists in all age range dictionaries
                if (!agingTable["< 1 yr"].ContainsKey(productClass))
                {
                    agingTable["< 1 yr"].Add(productClass, 0);
                }

                if (!agingTable[">1 and < 2yr"].ContainsKey(productClass))
                {
                    agingTable[">1 and < 2yr"].Add(productClass, 0);
                }

                if (!agingTable["> 3 yr"].ContainsKey(productClass))
                {
                    agingTable["> 3 yr"].Add(productClass, 0);
                }

                switch (age)
                {
                    case < 1:
                        agingTable["< 1 yr"][productClass]++;
                        break;
                    case < 2:
                        agingTable[">1 and < 2yr"][productClass]++;
                        break;
                    default:
                        agingTable["> 3 yr"][productClass]++;
                        break;
                }
            }

            return agingTable;
        }
    }
}

