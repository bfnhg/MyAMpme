using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace AM_PME_ASP_API.Repositories.Imp
{
    public class EmplacementRepository : IEmplacementRepository
    {
        private readonly MyDataContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public EmplacementRepository(
            MyDataContext db,
            IHttpContextAccessor httpContextAccessor,
            UserManager<User> userManager)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task<Emplacement> CreateEmplacement(Emplacement emplacement)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new NullReferenceException("HttpContext is null.");
            }
            var user = await _userManager.GetUserAsync(httpContext.User);
            if (user == null) throw new InvalidOperationException("Unauthorized");
            emplacement.CreatedBy = user.Id;
            emplacement.CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            _db.Emplacements.Add(emplacement);
            await _db.SaveChangesAsync();
            return emplacement;
        }

        public async Task<Emplacement> UpdateEmplacement(Emplacement emplacement)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new NullReferenceException("HttpContext is null.");
            }
            if (!_db.Emplacements.Any(emp => emp.Id == emplacement.Id && emp.Active))
            {
                throw new ArgumentException($"Emplacement with ID {emplacement.Id} not found or inactive.");
            }

            var user = await _userManager.GetUserAsync(httpContext.User);
            if (user == null) throw new InvalidOperationException("Unauthorized");
            emplacement.UpdatedBy = user.Id;
            emplacement.UpdatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            _db.Emplacements.Update(emplacement);
            await _db.SaveChangesAsync();
            return emplacement;
        }

        public Task<List<Emplacement>> GetAllEmplacements()
        {
            return _db.Emplacements
                .Include(e => e.Employe)
                .Include(e => e.Creator)
                .Include(e => e.Updater)
                .Where(e => e.Active)
                .ToListAsync();
        }

        public Task<List<Emplacement>> FindByEmploye(int employeId)
        {
            return _db.Emplacements
                .Include(e => e.Employe)
                .Where(e => e.EmployeId == employeId)
                .ToListAsync();
        }

        public async Task<Emplacement> FindEmplacementById(int id)
        {
            var emplacement = await _db.Emplacements
                .Include(e => e.Employe)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (emplacement == null)
            {
                throw new ArgumentNullException(nameof(emplacement), $"Emplacement with ID {id} not found.");
            }

            return emplacement;
        }

        public async Task<List<Emplacement>> FindEmplacementsByKeyword(string keyword)
        {
            return await _db.Emplacements
                .Include(e => e.Employe)
                .Where(e => e.NomEmp.Contains(keyword) && e.Active)
                .ToListAsync();
        }

        public async Task DeleteEmplacementById(int id)
        {
            var emplacement = await _db.Emplacements.FindAsync(id);
            if (emplacement != null)
            {
                _db.Emplacements.Remove(emplacement);
                await _db.SaveChangesAsync();
            }
        }
    }
}

