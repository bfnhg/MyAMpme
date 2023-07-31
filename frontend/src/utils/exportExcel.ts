import { http } from 'src/global/http'

type ExportType = 'asset' | 'product' | 'location' | 'employee' | 'supplier'
enum apiEndpoint {
  asset = 'ExportDatas/export-actifs',
  product = 'ExportDatas/export-produits',
  location = 'ExportDatas/export-emplacements',
  employee = 'ExportDatas/export-employees',
  supplier = 'ExportDatas/export-fournisseurs'
}

export const exportExcel = (type: ExportType, fields: string[], fileName: string) => {
  const endpoint = apiEndpoint[type]

  return http.post(endpoint, { fields, fileName }, { responseType: 'blob' }).then(({ data }) => {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileName}.xlsx`
    link.click()
    window.URL.revokeObjectURL(url)
  })
}
