using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models.Actif;
using Mysqlx.Crud;

namespace AM_PME_ASP_API.Repositories
{
    public interface IActifRepository
    {
        public Task<List<Actif>> GetAllActifs();

        public Task AddRangeAsync(IEnumerable<Actif> actifs);

        public Task<Actif> GetActifById(int id);

        public Task<List<Actif>> GetActifsByEtat(Etat etat);

        public Task<List<Actif>> GetActifsByGroupe(string groupe);

        public Task<List<Actif>> GetActifsByFonction(string fonction);

        public Task<List<Actif>> GetActifsByProchaineMaintenance(DateTime prochaineMaintenance);

        public Task<List<Actif>> GetActifsByFinGarantie(DateTime finGarantie);

        public Task<List<Actif>> GetActifsByAssignedToId(int assignedToId);

        public Task<List<Actif>> GetActifsByManagedById(int managedById);

        public Task<List<Actif>> GetActifsByOwnedById(int ownedById);

        public Task<List<Actif>> GetActifsByCreatedBy(string createdById);

        public Task<List<Actif>> GetActifsByProduitId(int produitId);

        public Task<List<Actif>> GetActifsByFournisseurId(int fournisseurId);

        public Task<List<Actif>> GetActifsByEmplacementId(int emplacementId);

        public Task<Actif> CreateActif(Actif actif);

        public Task UpdateActif(Actif actif);

        public Task<bool> ActifExists(int id);

        public Task DeleteActif(int id);

        public Task SaveChangesAsync();

        public DateTime? CalculerAssignedAt(int actifId);

        public int? CalculerHeureUtilisation(int actifId);

        public DateTime? CalculerFinGarantie(int actifId);

        public DateTime? CalculerInstalledAt(int actifId);

        public DateTime? CalculerDateRecu(int actifId);

        public DateTime? CalculerProchaineMaintenance(int actifId);
    }
}
