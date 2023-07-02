using System;
namespace AM_PME_ASP_API.Helpers
{
    public class InvalidPasswordException : Exception
    {
        public InvalidPasswordException(string message) : base(message)
        {
        }
    }
}

