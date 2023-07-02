using System;
namespace AM_PME_ASP_API.Helpers
{
    public class UserUpdateException : Exception
    {
        public UserUpdateException(string? message = null) : base(message ?? "An error occurred while updating the user.")
        {
        }
    }
}

