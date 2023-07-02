using System.Security.Claims;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models.Fournisseur;
using AM_PME_ASP_API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class FournisseurController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IFournisseurRepository _fournisseurRepository;

        public FournisseurController(IFournisseurRepository fournisseurRepository, IMapper mapper)
        {
            _fournisseurRepository = fournisseurRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FournisseurViewDto>>> GetAllFournisseurs()
        {
            var fournisseurs = await _fournisseurRepository.GetAllFournisseurs();
            var fournisseursViewDto = _mapper.Map<List<FournisseurViewDto>>(fournisseurs);
            return Ok(fournisseursViewDto);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<FournisseurViewDto>>> FindFournisseursByKeyword([FromQuery] string keyword)
        {
            var fournisseurs = await _fournisseurRepository.FindFournisseursByKeyword(keyword);
            if (fournisseurs.Count == 0) return new NotFoundResult();

            var fournisseursViewDto = _mapper.Map<IEnumerable<FournisseurViewDto>>(fournisseurs);
            return Ok(fournisseursViewDto);
        }

        [HttpPost]
        public async Task<ActionResult<FournisseurViewDto>> CreateFournisseur([FromBody] FournisseurCreateDto fournisseurCreate)
        {
            var fournisseur = _mapper.Map<Fournisseur>(fournisseurCreate);
            // Get the userId of the current user making the API call
            var currentUserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Set the UpdatedBy field to the currentUserId
            fournisseur.CreatedBy = currentUserId;
            await _fournisseurRepository.CreateFournisseur(fournisseur);
            var fournisseurViewDto = _mapper.Map<FournisseurViewDto>(fournisseur);
            return CreatedAtAction(nameof(GetFournisseurById), "Fournisseur", new { fournisseurId = fournisseurViewDto.Id }, fournisseurViewDto);
        }

        [HttpPut("{fournisseurId:int}")]
        public async Task<ActionResult<FournisseurViewDto>> UpdateFournisseur(int fournisseurId, [FromBody] FournisseurUpdateDto fournisseurUpdate)
        {
            if (fournisseurId != fournisseurUpdate.Id) return BadRequest();
            var fournisseur = await _fournisseurRepository.FindFournisseurById(fournisseurId);
            if (fournisseur == null) return NotFound();
            // Get the userId of the current user making the API call
            var currentUserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Set the UpdatedBy field to the currentUserId
            fournisseur.UpdatedBy = currentUserId;
            _mapper.Map(fournisseurUpdate, fournisseur);
            await _fournisseurRepository.UpdateFournisseur(fournisseur);

            return NoContent();
        }

        [HttpGet("{fournisseurId:int}")]
        public async Task<ActionResult<FournisseurViewDto>> GetFournisseurById(int fournisseurId)
        {
            var fournisseur = await _fournisseurRepository.FindFournisseurById(fournisseurId);
            if (fournisseur == null) return NotFound();
            var fournisseurViewDto = _mapper.Map<FournisseurViewDto>(fournisseur);
            return Ok(fournisseurViewDto);
        }

        [HttpDelete("{fournisseurId:int}")]
        public async Task<IActionResult> DeleteFournisseur(int fournisseurId)
        {
            var fournisseur = await _fournisseurRepository.FindFournisseurById(fournisseurId);
            if (fournisseur == null) return NotFound();
            await _fournisseurRepository.DeleteFournisseurById(fournisseurId);
            return NoContent();
        }

    }
}
