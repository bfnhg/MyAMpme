using AM_PME_ASP_API.Models.User;

namespace AM_PME_ASP_API.Models.Employe
{
    public class EmployeViewDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Poste { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public UserViewDto Creator { get; set; }
        public UserViewDto Updater { get; set; }
    }
}

