// ** React Imports
import { useState, useEffect, forwardRef, useContext } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId, GridToolbar, frFR } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteEmployee } from 'src/store/apps/employee'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import TableHeader from 'src/views/apps/employee/list/TableHeader'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { EmployeeType } from 'src/types/apps/employeeType'
import AddEmployeeDialog from 'src/views/apps/employee/add/addEmployeeDialog'
import { exportExcel } from 'src/utils/exportExcel'
import ImportXlsx from 'src/views/apps/product/import/importProduct'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import DeleteDialog from 'src/views/apps/DeleteDialog'
import { http } from 'src/global/http'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: EmployeeType
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const formatDate = (date: Date) => format(new Date(date), 'dd/MM/yyyy')

const defaultColumns = [
  {
    flex: 0.05,
    field: 'id',
    minWidth: 30,
    headerName: '#',
    renderCell: ({ row }: CellType) => <StyledLink href={``}>{`#${row.id}`}</StyledLink>
  },

  {
    flex: 0.2,
    minWidth: 150,
    field: 'fullName',
    headerName: 'Full Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.fullName}`}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.email}`}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'telephone',
    headerName: 'Phone Number',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.telephone}`}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 90,
    field: 'poste',
    headerName: 'Poste',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.poste}`}</Typography>
  }
]

const updatedColumns = defaultColumns.map(column => {
  return {
    ...column,
    headerName: <Translations text={`${column.headerName}`} />
  };
});

const EmployeeList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [employee, setEmployee] = useState<EmployeeType | undefined>(undefined)
  const [importShow, setImportShow] = useState<boolean>(false)
  const ability = useContext(AbilityContext)
const [ deleteDialog,setDeleteDialog] = useState<boolean>(false)
const [selectedRow,setSelectedRow] = useState<any>(null)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.employee)
  const {i18n} = useTranslation()
  useEffect(() => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [dispatch, value])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleEdit = (employee: EmployeeType) => {
    setEmployee(employee)
    setMode('edit')
    setShow(true)
  }
  const handleAdd = () => {
    setEmployee(undefined)
    setMode('add')
    setShow(true)
  }

  const columns = [
    ...updatedColumns,
    ability.can('update', 'employee') ? {
      flex: 0.05,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {
            ability.can('delete', 'employee') && <Tooltip title='Delete'>
            <IconButton size='small' onClick={() =>
            
          {
            setSelectedRow(row.id)
            setDeleteDialog(true)
          }}>
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
        

          }
          <Tooltip title='Edit'>
            <IconButton size='small' onClick={() => handleEdit(row as EmployeeType)}>
              <Icon icon='mdi:pencil-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }:null
  ]
const removeNullFromColumns = (columns: any) => {
    return columns.filter((item: any) => item !== null) 
  }
    const exportXlsx = () => {
      const visibilityModel = {
        id: true,
        fullName : true,
        email: true,
        telephone: true,
        poste: true,

      }
      
      let ids = [...selectedRows]
      
    if(ids.length==0){
      ids = store.data.map((item: any) => item.id)
    }
  
    const exportData = store.data.filter((item: any) => ids.includes(item.id)).map((item: any) => {
      return {
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        telephone: item.telephone,
        poste: item.poste,
      }
    })

    exportExcel(visibilityModel,exportData, 'Employee')
  }
   const deleteEmployee = (id) => {
    return new Promise(async (resolve, reject) => {
      await http.delete(`Employes/${id}`).then((res) => {
        dispatch(
          fetchData({
            q: value
          })
        )
        resolve(res)
      }).catch((err) => {
        reject(err)
      }
      )
    })
  }

  return (
    <DatePickerWrapper>
      <DeleteDialog
      open={deleteDialog}
      setOpen={setDeleteDialog}
      deelete={deleteEmployee}
      rowId={selectedRow}
      />
      <ImportXlsx
        show={importShow}
        setShow={setImportShow}
        classe="employee"
        fetchData={fetchData}
        />
      <Grid container spacing={6}>
        <AddEmployeeDialog setShow={setShow} show={show} mode={mode} employee={employee} />
        <Grid item xs={12}>
          <Card>
            <TableHeader
            setShow={setImportShow}
            exportXlsx={exportXlsx}
            handleAdd={handleAdd} value={value} selectedRows={selectedRows} handleFilter={handleFilter} />

            <DataGrid
              key={i18n.language}
              autoHeight
              pagination
              rows={store.data}
              columns={removeNullFromColumns(columns)}
              checkboxSelection
              disableSelectionOnClick
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              onSelectionModelChange={rows => setSelectedRows(rows)}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              localeText={i18n.language=='fr'?frFR.components.MuiDataGrid.defaultProps.localeText:{}}
             
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}
EmployeeList.acl={
  subject : 'employee',
  action: 'read'
}

export default EmployeeList
