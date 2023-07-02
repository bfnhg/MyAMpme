using System;
namespace AM_PME_ASP_API.Models
{
    public class Tokens
    {
        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        public DateTime AccessExpiration { get; set; }

        public DateTime RefreshExpiration { get; set; }
    }
}

