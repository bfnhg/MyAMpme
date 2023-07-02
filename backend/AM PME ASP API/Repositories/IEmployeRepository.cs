using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Params;

namespace AM_PME_ASP_API.Repositories
{
    public interface IEmployeRepository
    {
        public Task CreateEmploye(Employe employe);

        public Task UpdateEmploye(Employe employe);

        public Task<List<Employe>> GetAllEmployes();

        public Task<Employe> FindEmployeById(int id);

        public Task<List<Employe>> FindEmployesByKeyword(string keyword);

        public Task DeleteEmployetById(int id);

        bool EmployeExists(int id);
    }
}

