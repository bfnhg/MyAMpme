using System.ComponentModel.DataAnnotations;
using System.Formats.Asn1;
using System.Globalization;
using System.Net;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Helpers;
using AM_PME_ASP_API.Models.Actif;
using AM_PME_ASP_API.Models.Produit;
using AM_PME_ASP_API.Params;
using AM_PME_ASP_API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class ProduitController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly ILogger<ProduitController> _logger;

        private readonly IProduitRepository _repository;

        public ProduitController(IProduitRepository repository, IMapper mapper, ILogger<ProduitController> logger)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProduitViewDto>>> GetAllProduits()
        {
            var produits = await _repository.GetAllProduits();
            var produitsViewDto = _mapper.Map<List<ProduitViewDto>>(produits);
            return Ok(produitsViewDto);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ProduitViewDto>>> FindProduitsByKeyword([FromQuery] string keyword)
        {
            var produits = await _repository.FindProduitsByKeyword(keyword);
            if (produits.Count == 0) return new NotFoundResult();
            var produitsViewDto = _mapper.Map<IEnumerable<ProduitViewDto>>(produits);
            return Ok(produitsViewDto);
        }

        [HttpPost]
        public async Task<ActionResult<ProduitViewDto>> CreateProduit([FromBody] ProduitCreateDto produitCreate)
        {
            try
            {
                var produit = _mapper.Map<Produit>(produitCreate);
                var createdProduit = await _repository.CreateProduit(produit);
                var produitViewDto = _mapper.Map<ProduitViewDto>(createdProduit);
                return CreatedAtAction(nameof(GetProduitById), "Produit", new { produitId = produitViewDto.Id }, produitViewDto);
            }
            catch (ValidationException ex)
            {
                _logger.LogError(ex, "Une erreur de validation s'est produite lors de la création d'un produit !");
                var response = new ErrorResponse
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = ex.Message
                };
                return BadRequest(response);
            }
            catch (DuplicateDataException ex)
            {
                _logger.LogError(ex, "Une erreur de duplication des données s'est produite lors de la création d'un produit !");
                var response = new ErrorResponse
                {
                    StatusCode = HttpStatusCode.Conflict,
                    Message = "Un produit du même nom existe déjà !"
                };
                return Conflict(response);
            }
            catch (InvalidOperationException ex) when (ex.Message == "User not found.")
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Une erreur s'est produite lors de la création d'un produit !");
                var response = new ErrorResponse
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Message = "Une erreur s'est produite lors du traitement de votre demande !"
                };
                return StatusCode((int)response.StatusCode, response);
            }
        }

        [HttpPut("{produitId:int}")]
        public async Task<ActionResult<ProduitViewDto>> UpdateProduit(int produitId, [FromBody] ProduitUpdateDto produitUpdate)
        {
            try
            {
                if (produitId != produitUpdate.Id) return BadRequest();
                var produit = await _repository.FindProduitById(produitId);
                if (produit == null) throw new NotFoundException();
                _mapper.Map(produitUpdate, produit);
                var updatedProduit = await _repository.UpdateProduit(produit);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (InvalidOperationException ex) when (ex.Message == "User not found.")
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Une erreur s'est produite lors de la mise à jour d'un produit !");
                var response = new ErrorResponse
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Message = "Une erreur s'est produite lors du traitement de votre demande !"
                };
                return StatusCode((int)response.StatusCode, response);
            }
        }

        [HttpGet("{produitId:int}")]
        public async Task<ActionResult<ProduitViewDto>> GetProduitById(int produitId)
        {
            try {
                var produit = await _repository.FindProduitById(produitId);
                if (produit == null) return NotFound();
                var produitViewDto = _mapper.Map<ProduitViewDto>(produit);
                return Ok(produitViewDto);
            } catch (Exception ex) {
                _logger.LogError(ex, "Une erreur s'est produite lors de l'obtention du produit avec l'identifiant {produitId}", produitId);
                return StatusCode(StatusCodes.Status500InternalServerError, "Une erreur s'est produite lors du traitement de votre demande !");
            }
        }

        [HttpDelete("{produitId:int}")]
        public async Task<IActionResult> DeleteProduit(int produitId)
        {
            try {
                var produit = await _repository.FindProduitById(produitId);
                if (produit == null) return NotFound();
                await _repository.DeleteProduitById(produitId);
                return NoContent();

            } catch (Exception ex) {
                _logger.LogError(ex, "Une erreur s'est produite lors de la suppression d'un produit !");

                var response = new ErrorResponse
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Message = "Une erreur s'est produite lors du traitement de votre demande !"
                };

                if (ex is DbUpdateException dbUpdateException)
                {
                    var innerException = dbUpdateException.InnerException;
                    if (innerException is MySqlException mySqlException && mySqlException.Number == 1062)
                    {
                        response.StatusCode = HttpStatusCode.BadRequest;
                        response.Message = "Impossible de supprimer le produit car il est utilisé dans des autres Tables !";
                    }
                }

                return new ObjectResult(response)
                {
                    StatusCode = (int)response.StatusCode
                };
            }
        }
    }
}
