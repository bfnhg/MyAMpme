using System;
using AM_PME_ASP_API.Entities;

namespace AM_PME_ASP_API.Models.Actif
{
	public class ActifUpdateEtatDto
	{
		public int Id { get; set; }

		public Etat Etat { get; set; }
	}
}

