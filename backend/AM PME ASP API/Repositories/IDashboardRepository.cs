using System;
using AM_PME_ASP_API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AM_PME_ASP_API.Repositories
{
    public interface IDashboardRepository
    {
        public Task<int> GetActifsCount();
        public Task<int> GetProduitsCount();
        public Task<int> GetEmplacementsCount();
        public Task<int> GetFournisseursCount();
        public Task<int> GetEmployesCount();

        public Task<Dictionary<Etat, int>> GetActifsCountParEtat();

        public Task<Dictionary<DateTime, decimal>> GetActifsExpenses(int? year = null, int? month = null);

        public Task<int> GetMaintenanceDueIn30Days();

        public Task<ActionResult<Dictionary<Etat, double>>> GetActifsParEtatPourcentage();

        public Task<IEnumerable<KeyValuePair<string, int>>> GetAssetDistributionPerClassAndEtat();

        public Dictionary<string, Dictionary<string, int>> GetAssetsAging();
    }
}

