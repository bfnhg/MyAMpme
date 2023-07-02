using System;
namespace AM_PME_ASP_API.Helpers
{
    public class UserCreationException : Exception
    {
        public UserCreationException(string? message) : base(message ?? "User creation failed")
        {
        }

        public UserCreationException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }

}

