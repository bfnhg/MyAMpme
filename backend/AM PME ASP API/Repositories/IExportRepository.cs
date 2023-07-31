using System;
namespace AM_PME_ASP_API.Repositories
{
    public interface IExportRepository
    {
        public Task<byte[]> ExportActifDataToExcel(string fileName, List<string> fields);
        public Task<byte[]> ExportProduitDataToExcel(string fileName, List<string> fields);
        public Task<byte[]> ExportFournisseurDataToExcel(string fileName);
        public Task<byte[]> ExportEmplacementDataToExcel(string fileName);
        public Task<byte[]> ExportEmployeDataToExcel(string fileName);
    }
}

