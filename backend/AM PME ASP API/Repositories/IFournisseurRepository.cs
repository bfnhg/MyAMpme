using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models.Fournisseur;
using AM_PME_ASP_API.Params;

namespace AM_PME_ASP_API.Repositories
{
    public interface IFournisseurRepository
    {
        public Task CreateFournisseur(Fournisseur fournisseur);

        public Task UpdateFournisseur(Fournisseur fournisseur);

        public Task<List<Fournisseur>> GetAllFournisseurs();

        public Task<Fournisseur> FindFournisseurById(int id);

        public Task<List<Fournisseur>> FindFournisseursByKeyword(string keyword);

        public Task DeleteFournisseurById(int id);
    }
}

