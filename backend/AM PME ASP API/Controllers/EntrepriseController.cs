using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models.Employe;
using AM_PME_ASP_API.Models.Entreprise;
using AM_PME_ASP_API.Repositories;
using AM_PME_ASP_API.Repositories.Imp;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class EntrepriseController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IEntrepriseRepository _EnterpriseRepository;

        public EntrepriseController(IEntrepriseRepository EnterpriseRepository, IMapper mapper)
        {
            _EnterpriseRepository = EnterpriseRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entreprise>>> GetAllEnterprises()
        {
            var enterprises = await _EnterpriseRepository.GetAllEnterprises();
            if (enterprises.Count == 0) return new NotFoundResult();
            return Ok(enterprises);
        }

        [HttpPost]
        public async Task<ActionResult<Entreprise>> CreateEnterprise([FromBody] CreateEnterpriseDto CreateEnterprise)
        {
            if (!ModelState.IsValid) return BadRequest();
            var enterprise = _mapper.Map<Entreprise>(CreateEnterprise);
            await _EnterpriseRepository.CreateEnterprise(enterprise);
            return enterprise;
        }

        [HttpPut("{enterpriseId:long}")]
        public async Task<ActionResult<Entreprise>> UpdateEnterprise(long enterpriseId, [FromBody] UpdateEnterpriseDto UpdateEnterprise)
        {
            if (enterpriseId != UpdateEnterprise.Id) return BadRequest();
            var enterprise = await _EnterpriseRepository.FindEnterpriseById(enterpriseId);
            if (enterprise == null) return NotFound();
            _mapper.Map(UpdateEnterprise, enterprise);
            await _EnterpriseRepository.UpdateEnterprise(enterprise);
            return Ok(enterprise);
        }



        [HttpGet("{enterpriseId:long}")]
        public async Task<ActionResult<Entreprise>> GetEnterpriseById(long enterpriseId)
        {
            var enterprise = await _EnterpriseRepository.FindEnterpriseById(enterpriseId);
            if (enterprise == null) return new NotFoundResult();
            return Ok(enterprise);
        }

        [HttpDelete("{enterpriseId:long}")]
        public async Task<ActionResult> DeleteEnterprise(long enterpriseId)
        {
            if (_EnterpriseRepository.FindEnterpriseById(enterpriseId) == null) return NotFound();
            await _EnterpriseRepository.DeleteEnterprise(enterpriseId);
            return NoContent();
        }
    }
}




