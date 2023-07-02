using System;
using AM_PME_ASP_API.Models;

namespace AM_PME_ASP_API.Repositories
{
	public interface IAuthRepository
	{
        public Task<Tokens> Auth(string login, string password);

        public Task<Tokens> ReAuth(Tokens tokens);
    }
}

