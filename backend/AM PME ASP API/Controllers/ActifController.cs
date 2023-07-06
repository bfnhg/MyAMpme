using AM_PME_ASP_API.Models.Actif;
using AM_PME_ASP_API.Repositories;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Repositories.Imp;
using AutoMapper;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using AM_PME_ASP_API.Params;
using System.ComponentModel.DataAnnotations;
using AM_PME_ASP_API.Helpers;

namespace AM_PME_ASP_API
{
    [Route("api/[controller]s")]
    [ApiController]
    public class ActifController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly ILogger<ActifController> _logger;

        private readonly IActifRepository _repository;

        private readonly IProduitRepository _produitRepository;

        private readonly IEmployeRepository _employeRepository;

        private readonly IEmplacementRepository _emplacementRepository;

        public ActifController(
            IActifRepository repository,
            IProduitRepository produitRepository,
            IEmployeRepository employeRepository,
            IEmplacementRepository emplacementRepository,
            IMapper mapper,
            ILogger<ActifController> logger)
        {
            _repository = repository;
            _produitRepository = produitRepository;
            _employeRepository = employeRepository;
            _emplacementRepository = emplacementRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetAllActifs()
        {
            var actifs = await _repository.GetAllActifs();
            if (actifs.Count == 0)
            {
                throw new NotFoundException("The requested resource was not found !");
            }

            var actifsViewDto = _mapper.Map<List<ActifViewDto>>(actifs);

            foreach (var actifViewDto in actifsViewDto)
            {
                actifViewDto.HeureUtilisation = _repository.CalculerHeureUtilisation(actifViewDto.Id);
                actifViewDto.ProchaineMaintenance = _repository.CalculerProchaineMaintenance(actifViewDto.Id);
                actifViewDto.FinGarantie = _repository.CalculerFinGarantie(actifViewDto.Id);
                actifViewDto.DateRecu = _repository.CalculerDateRecu(actifViewDto.Id);
                actifViewDto.InstalledAt = _repository.CalculerInstalledAt(actifViewDto.Id);
                actifViewDto.AssignedAt = _repository.CalculerAssignedAt(actifViewDto.Id);
            }

            return Ok(actifsViewDto);
        }

        [HttpGet("{actifId:int}")]
        public async Task<ActionResult<ActifViewDto>> GetActifById(int actifId)
        {
            var actif = await _repository.GetActifById(actifId);
            if (actif == null)
            {
                throw new NotFoundException($"The entity with ID {actifId} was not found.");
            }
            var actifViewDto = _mapper.Map<ActifViewDto>(actif);

            return Ok(actifViewDto);
        }

        [HttpGet("groupe/{groupe}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByGroupe(string groupe)
        {
            var actifs = await _repository.GetActifsByGroupe(groupe);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("fonction/{fonction}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByFonction(string fonction)
        {
            var actifs = await _repository.GetActifsByFonction(fonction);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("prochaineMaintenance/{prochaineMaintenance}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByProchaineMaintenance(DateTime prochaineMaintenance)
        {
            var actifs = await _repository.GetActifsByProchaineMaintenance(prochaineMaintenance);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("finGarantie/{finGarantie}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByFinGarantie(DateTime finGarantie)
        {
            var actifs = await _repository.GetActifsByFinGarantie(finGarantie);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("assignedTo/{assignedToId}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByAssignedToId(int assignedToId)
        {
            var actifs = await _repository.GetActifsByAssignedToId(assignedToId);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("managedBy/{managedById}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByManagedById(int managedById)
        {
            var actifs = await _repository.GetActifsByManagedById(managedById);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("ownedBy/{ownedById}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByOwnedById(int ownedById)
        {
            var actifs = await _repository.GetActifsByOwnedById(ownedById);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("createdBy/{createdById}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByCreatedBy(string createdById)
        {
            var actifs = await _repository.GetActifsByCreatedBy(createdById);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("produit/{produitId}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByProduitId(int produitId)
        {
            var actifs = await _repository.GetActifsByProduitId(produitId);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("fournisseur/{fournisseurId}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByFournisseurId(int fournisseurId)
        {
            var actifs = await _repository.GetActifsByFournisseurId(fournisseurId);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpGet("emplacement/{emplacementId}")]
        public async Task<ActionResult<IEnumerable<ActifViewDto>>> GetActifsByEmplacementId(int emplacementId)
        {
            var actifs = await _repository.GetActifsByEmplacementId(emplacementId);
            var actifsViewDto = _mapper.Map<IEnumerable<ActifViewDto>>(actifs);
            return Ok(actifsViewDto);
        }

        [HttpPost]
        public async Task<ActionResult<ActifViewDto>> CreateActif([FromBody] ActifCreateDto actifCreate)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException("Le Modèle est invalide !");
            }
            var actif = _mapper.Map<Actif>(actifCreate);
            try
            {
                await _repository.CreateActif(actif);
                var actifViewDto = _mapper.Map<ActifViewDto>(actif);
                return CreatedAtAction(nameof(GetActifById), "Actif", new { actifId = actifViewDto.Id }, actifViewDto);
            }
            catch (DuplicateDataException ex) { throw ex; }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Une erreur s'est produite lors de la création de l'Actif");
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActifAsync(int id, [FromBody] ActifUpdateDto actifUpdate)
        {
            var existingActif = await _repository.GetActifById(id);

            if (existingActif == null) return NotFound();

            var updatedActif = _mapper.Map(actifUpdate, existingActif);

            updatedActif.UpdatedAt = DateTime.UtcNow;

            if (existingActif.Etat != updatedActif.Etat)
            {
                updatedActif.DateChangement = DateTime.UtcNow;
            }

            updatedActif.ProchaineMaintenance = _repository.CalculerProchaineMaintenance(updatedActif.Id);
            updatedActif.FinGarantie = _repository.CalculerFinGarantie(updatedActif.Id);
            updatedActif.HeureUtilisation = _repository.CalculerHeureUtilisation(updatedActif.Id);
            updatedActif.DateRecu = _repository.CalculerDateRecu(updatedActif.Id);
            updatedActif.InstalledAt = _repository.CalculerInstalledAt(updatedActif.Id);
            updatedActif.AssignedAt = _repository.CalculerAssignedAt(updatedActif.Id);

            await _repository.UpdateActif(updatedActif);
            await _repository.SaveChangesAsync();

            return Ok(_mapper.Map<ActifUpdateDto>(updatedActif));
        }

        [HttpGet("{etat}")]
        public async Task<ActionResult<List<Actif>>> GetActifsByEtat(Etat etat)
        {
            try
            {
                var actifs = await _repository.GetActifsByEtat(etat);

                if (actifs == null || actifs.Count == 0) return NotFound();
                
                return Ok(actifs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Une erreur est survenue lors de la récupération des actifs.");
            }
        }

        [HttpDelete("{actifId:int}")]
        public async Task<IActionResult> DeleteActif(int actifId)
        {
            try
            {
                var actif = await _repository.GetActifById(actifId);
                if (actif == null) return NotFound();
                await _repository.DeleteActif(actifId);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Une erreur s'est produite lors de la suppression de l'actif !");

                var response = new ErrorResponse
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Message = "Une erreur s'est produite lors du traitement de votre demande !"
                };

                return new ObjectResult(response)
                {
                    StatusCode = (int)response.StatusCode
                };
            }

        }
    }
}

