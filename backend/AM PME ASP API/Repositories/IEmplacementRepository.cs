using AM_PME_ASP_API.Entities;

namespace AM_PME_ASP_API.Repositories
{
    public interface IEmplacementRepository
    {
        public Task<Emplacement> CreateEmplacement(Emplacement emplacement);

        public Task<Emplacement> UpdateEmplacement(Emplacement emplacement);

        public Task<List<Emplacement>> GetAllEmplacements();

        public Task<List<Emplacement>> FindByEmploye(int employeId);

        public Task<Emplacement> FindEmplacementById(int id);

        public Task<List<Emplacement>> FindEmplacementsByKeyword(string keyword);

        public Task DeleteEmplacementById(int id);
    }
}
