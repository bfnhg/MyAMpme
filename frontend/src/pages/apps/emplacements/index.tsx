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
import { DataGrid, GridRowId, frFR } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/emplacement'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import TableHeader from 'src/views/apps/emplacement/list/TableHeader'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { EmplacementType } from 'src/types/apps/emplacementType'
import AddEmplacementDialog from 'src/views/apps/emplacement/add/addEmplacementDialog'
import { exportExcel } from 'src/utils/exportExcel'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import DeleteDialog from 'src/views/apps/DeleteDialog'
import { http } from 'src/global/http'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'




interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: EmplacementType
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const formatDate = (date:Date) => format(new Date(date), 'dd/MM/yyyy')


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
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.nomEmp }`}</Typography>
  },{
    flex: 0.3,
    minWidth: 125,
    field: 'responsable',
    headerName: 'Responsable',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.employe?.fullName}`}</Typography>
  }
]
const updatedColumns = defaultColumns.map(column => {
  return {
    ...column,
    headerName: <Translations text={`${column.headerName}`} />
  };
});
/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const EmplacementList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const {t,i18n} = useTranslation()
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
    const [show,setShow] = useState<boolean>(false)
    const [mode,setMode] = useState<'add'|'edit'>('add')
    const [emplacement,setEmplacement] = useState<EmplacementType|undefined>(undefined)
const ability = useContext(AbilityContext)
const [ deleteDialog,setDeleteDialog] = useState<boolean>(false)
const [selectedRow,setSelectedRow] = useState<any>(null)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.emplacement)

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

const handleEdit = (emplacement:EmplacementType) => {
    setEmplacement(emplacement)
    setMode('edit')
    setShow(true)
}
const handleAdd = () => {
    setEmplacement(undefined)
    setMode('add')
    setShow(true)
}

  const columns = [
    ...updatedColumns,
    ability?.can('update','emplacement') ?  {
      flex: 0.05,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {
            ability?.can('delete','emplacement') && (<Tooltip title={t('Delete')}>
            <IconButton size='small' onClick={() =>
            
          {
            setSelectedRow(row.id)
            setDeleteDialog(true)
          }
            }>
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
          )
          }
          <Tooltip title={t('Edit')}>
            <IconButton size='small' 
            onClick={() => handleEdit(row as EmplacementType)}
            >
              <Icon icon='mdi:pencil-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
         
        </Box>
      )
    }: null
   
  ]

  const removeNullFromColumns = (columns: any) => {
    return columns.filter((item: any) => item !== null)
  }
 const exportXlsx = () => {
  const visibilityModel = {
    id:true,
    name:true,
    responsable:true,

  }
  let ids = [...selectedRows]
    if(ids.length==0){
      ids = store.data.map((item: any) => item.id)
    }
  
    const exportData = store.data.filter((item: any) => ids.includes(item.id)).map((item: any) => {
      return {
        id: item.id,
        name: item.nomEmp,
        responsable: item.employe? item.employe.fullName : 'N/A',
        
      }
    })

    exportExcel(visibilityModel,exportData, 'Emplacements')
  }
  const deleteEmplacement = (id) => {
    return new Promise(async (resolve, reject) => {
      await http.delete(`Emplacements/${id}`).then((res) => {
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
      deelete={deleteEmplacement}
      rowId={selectedRow}
      />

      <Grid container spacing={6}>
        <AddEmplacementDialog
        setShow={setShow}
        show={show}
        mode = {mode}
        emplacement={emplacement}
        />
        <Grid item xs={12}>
          <Card>
            <TableHeader 
            exportXlsx={exportXlsx}
            handleAdd={handleAdd}
            
            value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            
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
              localeText={i18n.language==='fr' ? frFR.components.MuiDataGrid.defaultProps.localeText : {}}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

EmplacementList.acl={
  subject:'emplacement',
  action : 'read'
}


export default EmplacementList
