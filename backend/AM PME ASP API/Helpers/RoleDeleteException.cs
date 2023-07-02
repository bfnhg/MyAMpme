using System;
namespace AM_PME_ASP_API.Helpers
{
    public class RoleDeleteException : Exception
    {
        public RoleDeleteException(string message) : base(message)
        {
        }

        public RoleDeleteException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}

