using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Repositories.Imp
{
	public class EmployeRepository : IEmployeRepository
	{
        private readonly MyDataContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public EmployeRepository(MyDataContext db, IHttpContextAccessor httpContextAccessor,
        UserManager<User> userManager)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task CreateEmploye(Employe employe)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new NullReferenceException("HttpContext is null.");
            }
            var user = await _userManager.GetUserAsync(httpContext.User);
            if (user == null)
            {
                throw new InvalidOperationException("Unauthorized");
            }
            employe.CreatedBy = user.Id;
            employe.CreatedAt = DateTime.UtcNow;
            _db.Employes.Add(employe);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateEmploye(Employe employe)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new NullReferenceException("HttpContext is null.");
            }
            var user = await _userManager.GetUserAsync(httpContext.User);
            if (user == null)
            {
                throw new InvalidOperationException("Unauthorized");
            }
            employe.UpdatedBy = user.Id;
            employe.UpdatedAt = DateTime.UtcNow;
            _db.Entry(employe).State = EntityState.Modified;
            await _db.SaveChangesAsync();
        }


        public async Task<List<Employe>> GetAllEmployes()
        {
            return await _db.Employes
                .Include(e => e.Creator)
                .Include(e => e.Updater)
                .ToListAsync();
        }

        public async Task<Employe> FindEmployeById(int id)
        {
            Employe? employe = await _db.Employes.FirstOrDefaultAsync(e => e.Id == id);

            if (employe == null)
            {
                throw new ArgumentException($"Employe with id {id} not found");
            }

            return employe;
        }


        public async Task<List<Employe>> FindEmployesByKeyword(string keyword)
        {
            return await _db.Employes.Where(e => e.FullName.Contains(keyword) || e.Poste.Contains(keyword)).ToListAsync();
        }

        public async Task DeleteEmployetById(int id)
        {
            var employe = await _db.Employes.FindAsync(id);
            if (employe == null) throw new ArgumentNullException(nameof(employe));
            _db.Employes.Remove(employe);
            await _db.SaveChangesAsync();
        }

        public bool EmployeExists(int id)
        {
            return _db.Employes.Any(e => e.Id == id);
        }
    }
}

