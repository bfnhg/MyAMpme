using System;
namespace AM_PME_ASP_API.Helpers
{
    public class RoleNotFoundException : Exception
    {
        public RoleNotFoundException() : base() { }

        public RoleNotFoundException(string message) : base(message) { }
    }

}

