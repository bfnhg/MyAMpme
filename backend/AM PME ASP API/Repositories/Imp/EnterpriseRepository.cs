using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Repositories.Imp
{
    public class EnterpriseRepository : IEntrepriseRepository
    {
        private readonly MyDataContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public EnterpriseRepository(MyDataContext db, IHttpContextAccessor httpContextAccessor,
        UserManager<User> userManager)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task CreateEnterprise(Entreprise enterprise)
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
            _db.Enterprise.Add(enterprise);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateEnterprise(Entreprise enterprise)
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
            _db.Entry(enterprise).State = EntityState.Modified;
            await _db.SaveChangesAsync();
        }


        public async Task<List<Entreprise>> GetAllEnterprises()
        {
            return await _db.Enterprise
                .Include(e => e.Users)
                .Include(e => e.Actifs)
                .ToListAsync();
        }

        public async Task<Entreprise> FindEnterpriseById(long Id)
        {
            Entreprise? enterprise = await _db.Enterprise.FirstOrDefaultAsync(e => e.Id == Id);

            if (enterprise == null)
            {
                throw new ArgumentException($"Employe with id {Id} not found");
            }

            return enterprise;
        }

        public async Task DeleteEnterprise(long Id)
        {
            var enterprise = await _db.Enterprise.FindAsync(Id);
            if (enterprise == null) throw new ArgumentNullException(nameof(enterprise));
            _db.Enterprise.Remove(enterprise);
            await _db.SaveChangesAsync();
        }

    }
}
