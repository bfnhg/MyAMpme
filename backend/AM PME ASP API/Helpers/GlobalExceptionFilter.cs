using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.ComponentModel.DataAnnotations;
using System.Net;
using AM_PME_ASP_API.Params;

namespace AM_PME_ASP_API.Helpers
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<GlobalExceptionFilter> _logger;

        public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger = null)
        {
            _logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError($"An error occurred: {context.Exception}");

            var response = new ErrorResponse
            {
                StatusCode = HttpStatusCode.InternalServerError,
                Message = "An error occurred while processing your request"
            };

            if (context.Exception is ValidationException validationException)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = validationException.Message;
            }

            else if (context.Exception is DuplicateDataException)
            {
                response.StatusCode = HttpStatusCode.Conflict;
                response.Message = "The data you are trying to create already exists";
            }

            else if (context.Exception is NotFoundException)
            {
                response.StatusCode = HttpStatusCode.NotFound;
                response.Message = "The requested resource was not found";
            }

            context.Result = new ObjectResult(response)
            {
                StatusCode = (int)response.StatusCode
            };

            _logger.LogError(context.Exception, context.Exception.Message);
        }
    }

}

