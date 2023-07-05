using System;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Repositories.Imp
{
    public class ProduitRepository : IProduitRepository
    {
        private readonly MyDataContext _db;
        private readonly IActifRepository _actifRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public ProduitRepository
            (
                IActifRepository actifRepository,
                MyDataContext db,
                IHttpContextAccessor httpContextAccessor,
                UserManager<User> userManager
            )
        {
            _actifRepository = actifRepository;
            _db = db;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task<Produit> CreateProduit(Produit produit)
        {
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null) { throw new NullReferenceException("HttpContext is null."); }
            var user = await _userManager.GetUserAsync(httpContext.User);

            if (user == null) { throw new InvalidOperationException("User not found."); }
            produit.CreatedBy = user.Id;
            produit.CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            await _db.Produits.AddAsync(produit);
            await _db.SaveChangesAsync();

            return produit;
        }

        public async Task<Produit> UpdateProduit(Produit produit)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new NullReferenceException("HttpContext is null.");
            }
            var user = await _userManager.GetUserAsync(httpContext.User);
            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }
            produit.UpdatedBy = user.Id;
            produit.UpdatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
            _db.Produits.Update(produit);
            await _db.SaveChangesAsync();

            // Récupérer et mettre à jour les actifs liés au produit
            var actifs = await GetAllActifsByProduitId(produit.Id);
            foreach (var actif in actifs)
            {
                await _actifRepository.UpdateActif(actif);
            }

            return produit;
        }

        private async Task<List<Actif>> GetAllActifsByProduitId(int produitId)
        {
            return await _db.Actifs.Where(a => a.ProduitId == produitId).ToListAsync();
        }

        public Task<List<Produit>> GetAllProduits()
        {
            return _db.Produits
                .Include(p => p.Creator)
                .Include(p => p.Updater)
                .Where(produit => produit.Active)
                .ToListAsync();
        }

        public async Task<Produit> FindProduitById(int id)
        {
            var produit = await _db.Produits.FirstOrDefaultAsync(p => p.Id == id);
            return produit ?? new Produit();
        }

        public Task<List<Produit>> FindProduitsByKeyword(string keyword)
        {
            return _db.Produits
                .Where(p =>
                    p.NomModele.Contains(keyword) ||
                    p.Manufacturier.Contains(keyword) ||
                    p.NumeroModele.Contains(keyword)
                ).ToListAsync();
        }

        public async Task DeleteProduitById(int id)
        {
            var produit = await _db.Produits.FindAsync(id);
            if (produit != null)
            {
                _db.Produits.Remove(produit);
                await _db.SaveChangesAsync();
            }
        }
    }
}