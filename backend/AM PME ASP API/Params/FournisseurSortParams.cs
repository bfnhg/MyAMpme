using System;
using System.ComponentModel.DataAnnotations;

namespace AM_PME_ASP_API.Params
{
	public class FournisseurSortParams
    {
        public SortDirection Direction { get; set; }

        public FournisseurSortField Field { get; set; }
    }

    public enum FournisseurSortField
    {
        Name,
        Adresse,
        Telephone,
        Email,
        CreatedAt,
        UpdatedAt
    }

    public enum SortDirection
    {
        Ascending,
        Descending
    }

}

