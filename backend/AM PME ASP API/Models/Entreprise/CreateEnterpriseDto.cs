namespace AM_PME_ASP_API.Models.Entreprise
{
    public class CreateEnterpriseDto
    {
        public string Name { get; set; }
        public string Number { get; set; }
        public string Adresse { get; set; }
        public string Contact { get; set; }
        public string ContactSecondaire { get; set; }
        public string Logo { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
