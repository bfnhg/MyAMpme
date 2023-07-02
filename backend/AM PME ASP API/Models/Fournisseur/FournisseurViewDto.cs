using AM_PME_ASP_API.Models.User;

namespace AM_PME_ASP_API.Models.Fournisseur
{
	public class FournisseurViewDto
	{
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string Adresse { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public UserViewDto Creator { get; set; }

        public UserViewDto Updater { get; set; }
    }
}

