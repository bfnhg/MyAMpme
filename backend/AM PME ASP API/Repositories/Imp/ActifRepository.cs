
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using AM_PME_ASP_API.Models.Actif;
using AM_PME_ASP_API.Params;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Repositories.Imp
{
    public class ActifRepository : IActifRepository
    {
        private readonly MyDataContext _db;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public ActifRepository(MyDataContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor,
        UserManager<User> userManager)
        {
            _db = db;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task AddRangeAsync(IEnumerable<Actif> actifs)
        {
            await _db.Actifs.AddRangeAsync(actifs);
            await _db.SaveChangesAsync();
        }

        public DateTime? CalculerProchaineMaintenance(int actifId)
        {
            var actif = _db.Actifs
                .Include(a => a.Produit)
                .FirstOrDefault(a => a.Id == actifId);

            if (actif == null || actif.Produit == null || actif.Produit.MTBF == null) return null;

            var mtbf = actif.Produit.MTBF.Value;

            var dateDerniereMaintenance = actif.MaintenanceEffectueLe ?? actif.CreatedAt;
            var periodeMaintenance = TimeSpan.FromHours((double)mtbf);

            return dateDerniereMaintenance.Add(periodeMaintenance);
        }

        public DateTime? CalculerFinGarantie(int actifId)
        {
            var actif = _db.Actifs
                    .Include(a => a.Produit)
                    .FirstOrDefault(a => a.Id == actifId);

            var dateRecu = actif?.DateRecu ?? DateTime.Today; 
            var periodeGarantie = actif?.Produit?.PeriodeGarantie ?? 0; 

            return dateRecu.AddMonths(periodeGarantie);
        }


        public int? CalculerHeureUtilisation(int actifId)
        {
            var actif = _db.Actifs.FirstOrDefault(a => a.Id == actifId);

            if (actif == null || actif.Etat != Etat.EnUtilisation)
            {
                return 0;
            }

            actif.SetEtat(actif.Etat);

            if (actif.IsEnMaintenance)
            {
                actif.HeureUtilisation = 0;
                _db.SaveChanges();
                return 0;
            }

            if (actif.Etat == Etat.EnStock)
            {
                return actif.HeureUtilisation;
            }

            if (actif.AssignedAt == null)
            {
                return null; 
            }

            var heureDebutUtilisation = actif.AssignedAt.Value;
            var heureActuelle = DateTime.Now;

            var heureUtilisation = (int)heureActuelle.Subtract(heureDebutUtilisation).TotalHours;

            actif.HeureUtilisation += heureUtilisation;
            _db.SaveChanges();

            return actif.HeureUtilisation;
        }

        public DateTime? CalculerDateRecu(int actifId)
        {
            var actif = _db.Actifs.FirstOrDefault(a => a.Id == actifId);

            if (actif == null || actif.Etat != Etat.EnStock)
            {
                return null;
            }

            return actif.UpdatedAt;
        }

        public DateTime? CalculerInstalledAt(int actifId)
        {
            var actif = _db.Actifs
                .Include(a => a.Emplacement)
                .FirstOrDefault(a => a.Id == actifId);

            if (actif == null || actif.Emplacement == null)
            {
                return null;
            }

            return DateTime.UtcNow;
        }

        public DateTime? CalculerAssignedAt(int actifId)
        {
            var actif = _db.Actifs
                .Include(a => a.AssignedTo)
                .FirstOrDefault(a => a.Id == actifId);

            if (actif == null || actif.AssignedTo == null)
            {
                return null;
            }

            return DateTime.UtcNow;
        }

        public async Task<List<Actif>> GetAllActifs()
        {
            return await _db.Actifs
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.User)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<Actif> GetActifById(int id)
        {
            var actif = await _db.Set<Actif>()
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.User)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .FirstOrDefaultAsync(a => a.Id == id);

            return _mapper.Map<Actif>(actif);
        }

        public async Task<List<Actif>> GetActifsByEtat(Etat etat)
        {
            return await _db.Actifs
                .Where(a => a.Etat == etat)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByGroupe(string groupe)
        {
            return await _db.Actifs
                .Where(a => a.Groupe == groupe)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByFonction(string fonction)
        {
            return await _db.Actifs
                .Where(a => a.Fonction == fonction)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByProchaineMaintenance(DateTime prochaineMaintenance)
        {
            return await _db.Actifs
                .Where(a => a.ProchaineMaintenance == prochaineMaintenance)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByFinGarantie(DateTime finGarantie)
        {
            return await _db.Actifs
                .Where(a => a.FinGarantie == finGarantie)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByAssignedToId(int assignedToId)
        {
            return await _db.Actifs
                .Where(a => a.AssignedToId == assignedToId)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByCreatedBy(string createdById)
        {
            return await _db.Actifs
                .Where(a => a.CreatedBy == createdById)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByManagedById(int managedById)
        {
            return await _db.Actifs
                .Where(a => a.ManagedById == managedById)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByOwnedById(int ownedById)
        {
            return await _db.Actifs
                .Where(a => a.OwnedById == ownedById)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByProduitId(int produitId)
        {
            return await _db.Actifs
                .Where(a => a.ProduitId == produitId)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByFournisseurId(int fournisseurId)
        {
            return await _db.Actifs
                .Where(a => a.FournisseurId == fournisseurId)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<List<Actif>> GetActifsByEmplacementId(int emplacementId)
        {
            return await _db.Actifs
                .Where(a => a.EmplacementId == emplacementId)
                .Include(a => a.AssignedTo)
                .Include(a => a.ManagedBy)
                .Include(a => a.OwnedBy)
                .Include(a => a.Produit)
                .Include(a => a.Fournisseur)
                .Include(a => a.Emplacement)
                .ToListAsync();
        }

        public async Task<Actif> CreateActif(Actif actif)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new NullReferenceException("HttpContext is null.");
            }
            var user = await _userManager.GetUserAsync(httpContext.User);
            if (user == null) throw new InvalidOperationException("Unauthorized");
            actif.CreatedBy = user.Id;
            actif.CreatedAt = DateTime.UtcNow;
            // Calculate the DateRecu field
            actif.DateRecu = CalculerDateRecu(actif.Id);

            actif.Produit = await _db.Produits.FindAsync(actif.ProduitId);
            if (actif.Produit == null)
            {
                throw new InvalidOperationException("Produit introuvable");
            }

            actif.Nom = actif.Produit.NomModele + " - " + actif.NumeroSerie;

            // Check if an actif with the same serial number already exists for the same product
            var existingActif = await _db.Actifs
                .FirstOrDefaultAsync(x => x.NumeroSerie == actif.NumeroSerie && x.ProduitId == actif.ProduitId);
            if (existingActif != null)
            {
                throw new DuplicateDataException("Numéro de série en double");
            }

            if (!string.IsNullOrEmpty(actif.Etiquette))
            {
                var existingActifWithTag = await _db.Actifs.FirstOrDefaultAsync(a => a.Etiquette == actif.Etiquette);
                if (existingActifWithTag != null)
                {
                    throw new DuplicateDataException("An actif with the same tag already exists !");
                }
            }

            _db.Actifs.Add(actif);
            await _db.SaveChangesAsync();

            return actif;
        }

        public async Task UpdateActif(Actif actif)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new NullReferenceException("HttpContext is null.");
            }
            var user = await _userManager.GetUserAsync(httpContext.User);
            if (user == null) throw new InvalidOperationException("Unauthorized");
            actif.UpdatedBy = user.Id;
            actif.UpdatedAt = DateTime.UtcNow;

            var existingActif = _db.Actifs.AsNoTracking().FirstOrDefault(a => a.Id == actif.Id);
            var lastDateChangement = existingActif?.DateChangement; 
            if (existingActif != null && existingActif.Etat != actif.Etat)
            {
                actif.DateChangement = DateTime.UtcNow;
            }
            else
            {
                actif.DateChangement = lastDateChangement; 
            }

            actif.ProchaineMaintenance = CalculerProchaineMaintenance(actif.Id);

            actif.FinGarantie = CalculerFinGarantie(actif.Id);

            actif.HeureUtilisation = CalculerHeureUtilisation(actif.Id);

            actif.DateRecu = CalculerDateRecu(actif.Id);

            actif.InstalledAt = CalculerInstalledAt(actif.Id);

            actif.AssignedAt = CalculerAssignedAt(actif.Id);

            _db.Actifs.Update(actif);

            _db.SaveChanges();
        }

        public async Task<List<Actif>> GetAllActifsByProduitId(int produitId)
        {
            return await _db.Actifs.Where(a => a.ProduitId == produitId).ToListAsync();
        }


        public async Task<bool> ActifExists(int id)
        {
            return await _db.Actifs.AnyAsync(a => a.Id == id);
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task DeleteActif(int id)
        {
            var actif = await _db.Actifs.FindAsync(id);
            if (actif != null)
            {
                _db.Actifs.Remove(actif);
                await _db.SaveChangesAsync();
            }
        }
    }
}

