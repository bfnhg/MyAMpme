using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using AM_PME_ASP_API.Params;
using AM_PME_ASP_API.Models.Fournisseur;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AM_PME_ASP_API.Repositories.Imp
{
    public class FournisseurRepository : IFournisseurRepository
    {
        private readonly MyDataContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public FournisseurRepository
            (
                MyDataContext db,
                IHttpContextAccessor httpContextAccessor,
                UserManager<User> userManager
            )
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task CreateFournisseur(Fournisseur fournisseur)
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
            fournisseur.CreatedBy = user.Id;
            fournisseur.CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            await _db.Fournisseurs.AddAsync(fournisseur);
            await _db.SaveChangesAsync();
        }


        public async Task UpdateFournisseur(Fournisseur fournisseur)
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
            fournisseur.UpdatedBy = user.Id;
            fournisseur.UpdatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            _db.Fournisseurs.Update(fournisseur);
            await _db.SaveChangesAsync();
        }

        public Task<List<Fournisseur>> GetAllFournisseurs()
        {
            return _db.Fournisseurs
                .Include(f => f.Creator)
                .Include(f => f.Updater)
                .ToListAsync();
        }

        public async Task<Fournisseur> FindFournisseurById(int id)
        {
            var fournisseur = await _db.Fournisseurs.FirstOrDefaultAsync(f => f.Id == id);

            if (fournisseur == null)
            {
                throw new ArgumentNullException(nameof(fournisseur), $"Fournisseur with ID {id} not found.");
            }

            return fournisseur;
        }

        public Task<List<Fournisseur>> FindFournisseursByKeyword(string keyword)
        {
            return _db.Fournisseurs
                .Where(f =>
                    f.Name.Contains(keyword) ||
                    f.Email.Contains(keyword) ||
                    f.Telephone.Contains(keyword) ||
                    f.Adresse.Contains(keyword)
                ).ToListAsync();
        }

        public async Task DeleteFournisseurById(int id)
        {
            var fournisseur = await _db.Fournisseurs.FindAsync(id);
            if (fournisseur != null)
            {
                _db.Fournisseurs.Remove(fournisseur);
                await _db.SaveChangesAsync();
            }
        }
    }
}

