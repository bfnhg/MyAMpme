import { GridColumnVisibilityModel } from '@mui/x-data-grid'
import * as ExcelJS from 'exceljs'

export const exportExcel = async (columns: GridColumnVisibilityModel, data: any, filename: string) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')

  //remove key actions if exists
  if (columns.actions) delete columns.actions

  // for every key in columns, if value is true, add to worksheet.columns
  worksheet.columns = Object.keys(columns)
    .filter(key => columns[key])
    .map(key => ({ header: key, key, width: 30 }))

  // add data to worksheet
  worksheet.addRows(data)

  const buffer = await workbook.xlsx.writeBuffer()

  download(buffer, filename)
}

const download = (buffer: any, filename: string) => {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.xlsx`
  a.click()
  window.URL.revokeObjectURL(url)
}
