using System;
namespace AM_PME_ASP_API.Entities
{
    public interface IAuditEntity
    {
        int Id { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime? UpdatedAt { get; set; }
        string? CreatedBy { get; set; }
    }
}

