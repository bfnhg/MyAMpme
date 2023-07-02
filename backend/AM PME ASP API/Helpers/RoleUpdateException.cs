using System;
namespace AM_PME_ASP_API.Helpers
{
    public class RoleUpdateException : Exception
    {
        public RoleUpdateException() : base() { }

        public RoleUpdateException(string message) : base(message) { }

        public RoleUpdateException(string message, Exception innerException)
            : base(message, innerException) { }
    }

}

