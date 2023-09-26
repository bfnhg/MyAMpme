using AM_PME_ASP_API.Entities;

namespace AM_PME_ASP_API.Repositories
{
    public interface IEntrepriseRepository
    {
        public Task CreateEnterprise(Entreprise enterprise);

        public Task UpdateEnterprise(Entreprise enterprise);

        public Task<List<Entreprise>> GetAllEnterprises();

        public Task<Entreprise> FindEnterpriseById(long Id);

        public Task DeleteEnterprise(long Id);
    }
}





