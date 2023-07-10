using System;
namespace AM_PME_ASP_API.Models
{
    public class ExportRequestBody
    {
        public string FileName { get; set; }
        public List<string> Fields { get; set; }
    }
}

