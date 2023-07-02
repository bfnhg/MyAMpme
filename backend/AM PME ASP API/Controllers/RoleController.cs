using System;
using AutoMapper;
using AM_PME_ASP_API.Repositories;
using Microsoft.AspNetCore.Mvc;
using AM_PME_ASP_API.Models.Role;
using AM_PME_ASP_API.Entities;
using System.Security.Claims;
using AM_PME_ASP_API.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAdminRepository _repository;

        public RoleController(IAdminRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<RoleViewDto>>> GetAllRoles()
        {
            var roles = _mapper.Map<List<RoleViewDto>>(await _repository.GetAllRoles());
            return Ok(roles);
        }

        [HttpGet("RoleName")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<RoleViewDto>>> FindRoleByName([FromQuery] string RoleName)
        {
            var role = await _repository.GetRoleByName(RoleName);
            if (role == null) return new NotFoundResult();
            return Ok(_mapper.Map<RoleViewDto>(role));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<RoleViewDto>> CreateRole([FromBody] RoleCreateDto roleCreate)
        {
            if (!ModelState.IsValid) return BadRequest();

            // Get the ID of the currently authenticated admin
            var currentAdminId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Map the RoleCreateDto to a Role entity
            var role = _mapper.Map<Role>(roleCreate);

            // Set the CreatedBy property to the ID of the currently authenticated admin
            role.CreatedBy = currentAdminId;

            var createdRole = await _repository.CreateRole(role);
            var createdRoleView = _mapper.Map<RoleViewDto>(createdRole);
            return new CreatedAtActionResult(nameof(GetRoleById), "Role", new { roleId = createdRoleView.Id },
                createdRoleView);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<RoleViewDto>> UpdateRole([FromBody] RoleUpdateDto roleUpdate)
        {
            if (!ModelState.IsValid) return BadRequest();

            // Get the current user's ID from the HttpContext
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var role = _mapper.Map<Role>(roleUpdate);
            role.UpdatedBy = userId; // Set the updatedBy field to the current user's ID
            var updatedRole = await _repository.UpdateRole(role);
            var updatedRoleView = _mapper.Map<RoleViewDto>(updatedRole);
            return new CreatedAtActionResult(nameof(GetRoleById), "Role", new { roleId = updatedRoleView.Id },
                updatedRoleView);
        }

        [HttpGet("{roleId}")]
        public async Task<ActionResult<RoleViewDto>> GetRoleById(string roleId)
        {
            var roleI = _mapper.Map<RoleViewDto>(await _repository.GetRoleById(roleId));
            return Ok(roleI);
        }

        [HttpDelete("{roleId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeactivateRoleById(string roleId, [FromQuery] bool confirm = false)
        {
            try
            {
                // Get the role to be deleted
                var role = await _repository.GetRoleById(roleId);

                // Check if there are any users assigned to this role
                var usersInRole = await _repository.GetUsersInRole(role.Name);
                if (usersInRole.Any())
                {
                    return BadRequest("Cannot delete role as it is assigned to one or more users");
                }

                // Check if the confirmation message matches a pre-defined message
                if (!confirm || HttpContext.Request.Headers["Confirmation-Message"] != "Confirm role deletion")
                {
                    return BadRequest("Confirmation message is required to delete the role");
                }

                // Delete the role
                await _repository.DeleteRoleById(roleId);
                return NoContent();
            }
            catch (RoleNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (RoleUpdateException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

