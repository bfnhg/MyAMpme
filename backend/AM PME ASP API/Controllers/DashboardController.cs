using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Repositories;
using AM_PME_ASP_API.Repositories.Imp;
using Microsoft.AspNetCore.Mvc;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardRepository _repository;

        public DashboardController(IDashboardRepository repository) { _repository = repository; }

        [HttpGet("nombre-actifs")]
        public async Task<ActionResult<int>> GetActifsCount()
        {
            var nombreActifs = await _repository.GetActifsCount();
            return Ok(nombreActifs);
        }

        [HttpGet("nombre-produits")]
        public async Task<ActionResult<int>> GetProduitsCount()
        {
            var nombreProduits = await _repository.GetProduitsCount();
            return Ok(nombreProduits);
        }

        [HttpGet("nombre-emplacements")]
        public async Task<ActionResult<int>> GetEmplacementsCount()
        {
            var nombreEmplacements = await _repository.GetEmplacementsCount();
            return Ok(nombreEmplacements);
        }

        [HttpGet("nombre-employes")]
        public async Task<ActionResult<int>> GetEmployesCount()
        {
            var nombreEmployes = await _repository.GetEmployesCount();
            return Ok(nombreEmployes);
        }

        [HttpGet("nombre-fournisseurs")]
        public async Task<ActionResult<int>> GetFournisseursCount()
        {
            var nombreFournisseurs = await _repository.GetFournisseursCount();
            return Ok(nombreFournisseurs);
        }

        [HttpGet("nombre-actifs-par-etat")]
        public async Task<ActionResult<Dictionary<Etat, int>>> GetActifsCountParEtat()
        {
            var nombreActifsParEtat = await _repository.GetActifsCountParEtat();
            return Ok(nombreActifsParEtat);
        }


        [HttpGet("expenses")]
        public async Task<ActionResult<Dictionary<DateTime, decimal>>> GetActifsExpenses(int? year = null, int? month = null)
        {
            var expenses = await _repository.GetActifsExpenses(year, month);

            return Ok(expenses);
        }

        [HttpGet("MaintenanceDueIn30Days")]
        public async Task<int> GetMaintenanceDueIn30Days()
        {
            return await _repository.GetMaintenanceDueIn30Days();
        }

        [HttpGet("actifs/distribution")]
        public async Task<ActionResult<IEnumerable<KeyValuePair<string, int>>>> GetAssetDistribution()
        {
            var distribution = await _repository.GetAssetDistributionPerClassAndEtat();
            return Ok(distribution);
        }

        [HttpGet("actifs/etat/percentage")]
        public async Task<ActionResult<Dictionary<Etat, double>>> GetActifsParEtatPourcentage()
        {
            return await _repository.GetActifsParEtatPourcentage();
        }

        [HttpGet("actifs/aging")]
        public ActionResult<Dictionary<string, Dictionary<string, int>>> GetAssetsAging()
        {
            var agingTable = _repository.GetAssetsAging();
            return Ok(agingTable);
        }
    }
}

