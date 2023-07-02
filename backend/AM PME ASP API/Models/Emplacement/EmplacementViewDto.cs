using AM_PME_ASP_API.Models.Employe;
using AM_PME_ASP_API.Models.User;

namespace AM_PME_ASP_API.Models.Emplacement
{
	public class EmplacementViewDto
	{
        public int Id { get; set; }

        public string NomEmp { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public EmployeViewDto Employe { get; set; }

        public UserViewDto Creator { get; set; }
        public UserViewDto Updater { get; set; }
    }
}

