using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models.Emplacement;
using AM_PME_ASP_API.Models.Employe;
using AM_PME_ASP_API.Models.Fournisseur;
using AM_PME_ASP_API.Repositories;
using AM_PME_ASP_API.Repositories.Imp;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class EmplacementController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IEmplacementRepository _emplacementRepository;

        public EmplacementController(IEmplacementRepository emplacementRepository, IMapper mapper)
        {
            _emplacementRepository = emplacementRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmplacementViewDto>>> GetAllEmplacements()
        {
            var emplacements = await _emplacementRepository.GetAllEmplacements();
            if (emplacements.Count == 0) return new NotFoundResult();
            var emplacementsViewDto = _mapper.Map<List<EmplacementViewDto>>(emplacements);
            return Ok(emplacementsViewDto);
        }

        [HttpGet("{emplacementId:int}")]
        public async Task<ActionResult<EmplacementViewDto>> GetEmplacementById(int emplacementId)
        {
            var emplacement = await _emplacementRepository.FindEmplacementById(emplacementId);
            if (emplacement == null) return new NotFoundResult();
            var emplacementViewDto = _mapper.Map<EmplacementViewDto>(emplacement);
            return Ok(emplacementViewDto);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<EmplacementViewDto>>> FindFournisseursByKeyword([FromQuery] string keyword)
        {
            var emplacements = await _emplacementRepository.FindEmplacementsByKeyword(keyword);
            if (emplacements.Count == 0) return new NotFoundResult();
            var emplacementsViewDto = _mapper.Map<List<EmplacementViewDto>>(emplacements);
            return Ok(emplacementsViewDto);
        }

        [HttpPost]
        public async Task<ActionResult<EmplacementViewDto>> CreateEmplacement([FromBody] EmplacementCreateDto emplacementCreate)
        {
            if (!ModelState.IsValid) return BadRequest();
            var emplacement = _mapper.Map<Emplacement>(emplacementCreate);
            var createdEmplacement = await _emplacementRepository.CreateEmplacement(emplacement);
            var createdEmplacementView = _mapper.Map<EmplacementViewDto>(createdEmplacement);
            return new CreatedAtActionResult(nameof(GetEmplacementById), "Emplacement", new { emplacementId = createdEmplacementView.Id }, createdEmplacementView);
        }

        [HttpPut("{emplacementId:int}")]
        public async Task<ActionResult<EmplacementViewDto>> UpdateEmplacement(int emplacementId, [FromBody] EmplacementUpdateDto emplacementUpdate)
        {
            if (emplacementId != emplacementUpdate.Id) return BadRequest();
            var emplacement = await _emplacementRepository.FindEmplacementById(emplacementId);
            if (emplacement == null) return NotFound();
            _mapper.Map(emplacementUpdate, emplacement);
            await _emplacementRepository.UpdateEmplacement(emplacement);

            return NoContent();
        }

        [HttpDelete("{emplacementId:int}")]
        public async Task<IActionResult> DeleteFournisseur(int emplacementId)
        {
            var emplacement = await _emplacementRepository.FindEmplacementById(emplacementId);
            if (emplacement == null) return NotFound();
            await _emplacementRepository.DeleteEmplacementById(emplacementId);
            return NoContent();
        }
    }
}
