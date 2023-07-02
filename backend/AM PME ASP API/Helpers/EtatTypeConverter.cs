using System;
using AM_PME_ASP_API.Entities;
using AutoMapper;

namespace AM_PME_ASP_API.Helpers
{
    public class EtatTypeConverter : ITypeConverter<string, Etat>
    {
        public Etat Convert(string source, Etat destination, ResolutionContext context)
        {
            if (Enum.TryParse(source, out Etat etat))
            {
                return etat;
            }

            return default;
        }
    }
}

