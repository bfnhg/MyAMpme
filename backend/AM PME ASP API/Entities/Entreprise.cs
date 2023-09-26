using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AM_PME_ASP_API.Entities
{
    [Table("Enterprise")]
    public class Entreprise
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Adresse { get; set; }
        public string Contact { get; set; }
        public string ContactSecondaire { get; set; }
        public string Logo { get; set; }
        public List<Actif> Actifs { get; set; }
        public List<User> Users { get; set; }
    }
}
