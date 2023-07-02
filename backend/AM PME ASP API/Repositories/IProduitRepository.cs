using AM_PME_ASP_API.Entities;

namespace AM_PME_ASP_API.Repositories
{
    public interface IProduitRepository
    {
        public Task<Produit> CreateProduit(Produit produit);

        public Task<Produit> UpdateProduit(Produit produit);

     
        public Task<List<Produit>> GetAllProduits();

        public Task<Produit> FindProduitById(int id);

        public Task<List<Produit>> FindProduitsByKeyword(string keyword);

        public Task DeleteProduitById(int id);
    }
}
