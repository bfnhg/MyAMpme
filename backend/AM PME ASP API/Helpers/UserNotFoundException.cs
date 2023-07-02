using System;
namespace AM_PME_ASP_API.Helpers
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(string userId)
            : base($"User with ID {userId} could not be found.")
        {
        }
    }
}

