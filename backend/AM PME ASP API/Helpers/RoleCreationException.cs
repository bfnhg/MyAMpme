using System;
namespace AM_PME_ASP_API.Helpers
{
    public class RoleCreationException : Exception
    {
        public RoleCreationException(string message) : base(message)
        {
            if (string.IsNullOrEmpty(message))
            {
                message = "Une erreur s'est produite lors de la création du rôle.";
            }
        }
    }
}

