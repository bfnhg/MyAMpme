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
import { fetchData, deleteFournisseur } from 'src/store/apps/fournisseur'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import TableHeader from 'src/views/apps/fournisseur/list/TableHeader'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { FournisseurType } from 'src/types/apps/fournisseurType'
import AddFournisseurDialog from 'src/views/apps/fournisseur/add/addFournisseurDialog'
import { exportExcel } from 'src/utils/exportExcel'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import DeleteDialog from 'src/views/apps/DeleteDialog'
import { http } from 'src/global/http'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
import { toast } from 'react-hot-toast'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: FournisseurType
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
    field: 'name',
    headerName: 'Full Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.name}`}</Typography>
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
    flex: 0.18,
    minWidth: 90,
    field: 'adresse',
    headerName: 'Adresse',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.adresse}`}</Typography>
  }
]
const updatedColumns = defaultColumns.map(column => {
  return {
    ...column,
    headerName: <Translations text={`${column.headerName}`} />
  }
})

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

const FournisseurList = () => {
  // ** State
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [fournisseur, setFournisseur] = useState<FournisseurType | undefined>(undefined)
  const ability = useContext(AbilityContext)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.fournisseur)

  useEffect(() => {
    dispatch(
      fetchData({
        q: ''
      })
    )
  }, [dispatch])

  const handleFilter = (val: string) => {
    dispatch(
      fetchData({
        q: val
      })
    )
    setCurrentQuery(val)
  }

  const handleEdit = (fournisseur: FournisseurType) => {
    setFournisseur(fournisseur)
    setMode('edit')
    setShow(true)
  }
  const handleAdd = () => {
    setFournisseur(undefined)
    setMode('add')
    setShow(true)
  }
  const { i18n } = useTranslation()

  const columns = [
    ...updatedColumns,
    ability.can('update', 'fournisseur')
      ? {
          flex: 0.05,
          minWidth: 130,
          sortable: false,
          field: 'actions',
          headerName: 'Actions',
          renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {ability.can('delete', 'fournisseur') && (
                <Tooltip title={t('Delete')}>
                  <IconButton
                    size='small'
                    onClick={() => {
                      setSelectedRow(row.id)
                      setDeleteDialog(true)
                    }}
                  >
                    <Icon icon='mdi:delete-outline' fontSize={20} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={t('Edit')}>
                <IconButton size='small' onClick={() => handleEdit(row as FournisseurType)}>
                  <Icon icon='mdi:pencil-outline' fontSize={20} />
                </IconButton>
              </Tooltip>
            </Box>
          )
        }
      : null
  ]
  const removeNullFromColumns = (columns: any) => {
    return columns.filter((item: any) => item !== null)
  }
  const exportXlsx = () => {
    const fields = defaultColumns.map((item: any) => item.field)

    exportExcel('supplier', fields, 'Fournisseurs').catch(err => toast.error(t('Failed to export data') as string))
  }
  const deleteFournisseur = id => {
    return new Promise(async (resolve, reject) => {
      await http
        .delete(`Fournisseurs/${id}`)
        .then(res => {
          dispatch(
            fetchData({
              q: currentQuery
            })
          )
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  return (
    <DatePickerWrapper>
      <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} deelete={deleteFournisseur} rowId={selectedRow} />
      <Grid container spacing={6}>
        <AddFournisseurDialog setShow={setShow} show={show} mode={mode} fournisseur={fournisseur} />
        <Grid item xs={12}>
          <Card>
            <TableHeader
              handleAdd={handleAdd}
              exportXlsx={exportXlsx}
              selectedRows={selectedRows}
              handleFilter={handleFilter}
            />

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
              localeText={i18n.language === 'fr' ? frFR.components.MuiDataGrid.defaultProps.localeText : {}}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

FournisseurList.acl = {
  subject: 'fournisseur',
  action: 'read'
}

export default FournisseurList
