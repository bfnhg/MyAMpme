﻿using System;
using AM_PME_ASP_API.Models;
using AM_PME_ASP_API.Repositories;
using AM_PME_ASP_API.Repositories.Imp;
using Microsoft.AspNetCore.Mvc;

namespace AM_PME_ASP_API.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class ExportDataController : ControllerBase
    {
        private readonly IExportRepository _repository;

        public ExportDataController(IExportRepository repository) { _repository = repository; }


        [HttpPost("export-actifs")]
        public async Task<IActionResult> ExportActifDataToExcel([FromBody] ExportRequestBody requestBody)
        {
            if (requestBody == null) return BadRequest("Request body is null.");

            var fileBytes = await _repository.ExportActifDataToExcel(requestBody.FileName, requestBody.Fields);

            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", requestBody.FileName);
        }


        [HttpPost("export-produits")]
        public async Task<IActionResult> ExportProduitDataToExcel([FromBody] ExportRequestBody requestBody)
        {
            if (requestBody == null) return BadRequest("Request body is null.");

            var fileBytes = await _repository.ExportProduitDataToExcel(requestBody.FileName, requestBody.Fields);

            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", requestBody.FileName);
        }

        [HttpPost("export-employees")]
        public async Task<IActionResult> ExportEmployeeDataToExcel([FromBody] ExportRequestBody requestBody)
        {
            if (requestBody == null) return BadRequest("Request body is null.");

            var fileBytes = await _repository.ExportEmployeDataToExcel(requestBody.FileName);

            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", requestBody.FileName);
        }

        [HttpPost("export-fournisseurs")]
        public async Task<IActionResult> ExportFournisseurDataToExcel([FromBody] ExportRequestBody requestBody)
        {
            if (requestBody == null) return BadRequest("Request body is null.");

            var fileBytes = await _repository.ExportFournisseurDataToExcel(requestBody.FileName);

            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", requestBody.FileName);
        }

        [HttpPost("export-emplacements")]
        public async Task<IActionResult> ExportEmplacementsDataToExcel([FromBody] ExportRequestBody requestBody)
        {
            if (requestBody == null) return BadRequest("Request body is null.");

            var fileBytes = await _repository.ExportEmplacementDataToExcel(requestBody.FileName);

            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", requestBody.FileName);
        }
    }
}

