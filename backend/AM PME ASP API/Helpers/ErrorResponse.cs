using System;
using System.Net;

namespace AM_PME_ASP_API.Helpers
{
        public class ErrorResponse
        {
            public HttpStatusCode StatusCode { get; set; }
            public string Message { get; set; }
            public string Details { get; set; }
        }
}

