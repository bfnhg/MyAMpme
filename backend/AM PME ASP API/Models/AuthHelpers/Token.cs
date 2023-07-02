using System;
namespace AM_PME_ASP_API.Models
{
	public class Token
	{
        public string Hash { get; set; }

        public DateTime ExpiresAt { get; set; }
    }
}

