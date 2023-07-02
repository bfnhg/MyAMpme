using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models.Employe;
using AM_PME_ASP_API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class EmployeController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly IEmployeRepository _employeRepository;

        public EmployeController(IEmployeRepository employeRepository, IMapper mapper)
        {
            _employeRepository = employeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeViewDto>>> GetAllEmployes()
        {
            var employes = await _employeRepository.GetAllEmployes();
            if (employes.Count == 0) return new NotFoundResult();
            var employeViewDtos = _mapper.Map<List<EmployeViewDto>>(employes);
            return Ok(employeViewDtos);
        }

        //[HttpGet("search")]
        //public async Task<ActionResult<IEnumerable<EmployeViewDto>>> FindEmployesByKeyword([FromQuery] string keyword)
        //{
        //    var employes = await _employeRepository.FindEmployesByKeyword(keyword);
        //    if (employes.Count == 0) return new NotFoundResult();
        //    return Ok(_mapper.Map<List<EmployeViewDto>>(employes));
        //}

        [HttpPost]
        public async Task<ActionResult<EmployeViewDto>> CreateEmploye([FromBody] EmployeCreateDto employeCreate)
        {
            if (!ModelState.IsValid) return BadRequest();
            var employe = _mapper.Map<Employe>(employeCreate);            
            await _employeRepository.CreateEmploye(employe);
            var employeViewDto = _mapper.Map<EmployeViewDto>(employe);
            return CreatedAtAction(nameof(GetEmployeById), "Employe" , new { employeId = employeViewDto.Id }, employeViewDto);
        }

        [HttpPut("{employeId:int}")]
        public async Task<ActionResult<EmployeViewDto>> UpdateEmploye(int employeId, [FromBody] EmployeUpdateDto employeUpdate)
        {
            if (employeId != employeUpdate.Id) return BadRequest();
            var employe = await _employeRepository.FindEmployeById(employeId);
            if (employe == null) return NotFound();
            _mapper.Map(employeUpdate, employe);
            try
            {
                await _employeRepository.UpdateEmploye(employe);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_employeRepository.EmployeExists(employeId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var employeViewDto = _mapper.Map<EmployeViewDto>(employe);
            return Ok(employeViewDto);
        }

        [HttpGet("{employeId:int}")]
        public async Task<ActionResult<EmployeViewDto>> GetEmployeById(int employeId)
        {
            var employe = await _employeRepository.FindEmployeById(employeId);
            if (employe == null) return new NotFoundResult();
            var employeViewDto = _mapper.Map<EmployeViewDto>(employe);
            return Ok(employeViewDto);
        }

        [HttpDelete("{employeId:int}")]
        public async Task<ActionResult> DeleteEmploye(int employeId)
        {
            if (!_employeRepository.EmployeExists(employeId)) return NotFound();
            await _employeRepository.DeleteEmployetById(employeId);
            return NoContent();
        }


    }
}

