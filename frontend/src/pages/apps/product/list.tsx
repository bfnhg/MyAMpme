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
import {
  DataGrid,
  GridRowId,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  frFR
} from '@mui/x-data-grid'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/product'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import TableHeader from 'src/views/apps/product/list/TableHeader'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { ProductType } from 'src/types/apps/productType'
import { exportExcel } from 'src/utils/exportExcel'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import DeleteDialog from 'src/views/apps/DeleteDialog'
import { http } from 'src/global/http'
import { useTranslation } from 'react-i18next'
import { set } from 'nprogress'
import { toast } from 'react-hot-toast'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: ProductType
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const formatDate = (date: Date) => {
  const d = new Date(date)
  if (d.getFullYear() === 1) return 'N/A'

  return format(d, 'dd/MM/yyyy')
}

const defaultColumns = [
  {
    flex: 0.05,
    field: 'id',
    minWidth: 30,
    headerName: '#',
    renderCell: ({ row }: CellType) => <StyledLink href={`/apps/product/preview/${row.id}`}>{`#${row.id}`}</StyledLink>
  },

  {
    flex: 0.15,
    minWidth: 150,
    field: 'nomModele',
    headerName: 'Model Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.nomModele}`}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 125,
    field: 'numeroModele',
    headerName: 'Model Number',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.numeroModele}`}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 125,
    field: 'classe',
    headerName: 'Class',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.classe}`}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'coutAcquisition',
    headerName: 'Cost',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.coutAcquisition}$`}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'manufacturer',
    headerName: 'Manufacturer',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.manufacturier}`}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'mtbf',
    headerName: 'MTBF',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.mtbf ? `${row.mtbf} H` : 'N/A'}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 70,
    field: 'periodeGarantie',
    headerName: 'Waranty Period',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.periodeGarantie} mois`}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 50,
    field: 'finVie',
    headerName: 'End of Life',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{formatDate(row.finVie)}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 70,
    field: 'finSupport',
    headerName: 'End of Support',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{formatDate(row.finSupport)}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 70,
    field: 'createdAt',
    headerName: 'Created At',
    type: 'date',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{formatDate(row.createdAt)}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 70,
    field: 'updatedAt',
    headerName: 'Updated At',
    type: 'date',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{formatDate(row.updatedAt)}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 70,
    field: 'createdBy',
    headerName: 'Created By',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{`${row.creator ? row.creator.fullName : 'N/A'}`}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 70,
    field: 'updatedBy',
    headerName: 'Updated By',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{`${row.updater ? row.updater.fullName : 'N/A'}`}</Typography>
    )
  }
]

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  )
}

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

const ProductList = () => {
  // ** State
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const { settings, saveSettings } = useSettings()
  const ability = useContext(AbilityContext)
  const [visibilityModel, setVisibilityModel] = useState<any>(settings.productColumnVisibilityModel)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const { t, i18n } = useTranslation()
  const updatedColumns = defaultColumns.map(column => {
    return {
      ...column,
      headerName: t(`${column.headerName}`)
    }
  })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.product)

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

  const columns = [
    ...updatedColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} href={`/apps/product/preview/${row.id}`}>
              <Icon icon='mdi:eye-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
          {ability.can('delete', 'product') && (
            <Tooltip title='Delete '>
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
          {ability.can('update', 'product') && (
            <Tooltip title='Edit'>
              <IconButton size='small' component={Link} href={`/apps/product/edit/${row.id}`}>
                <Icon icon='mdi:pencil-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )
    }
  ]
  const exportXlsx = () => {
    const allColumns = columns.map((item: any) => item.field)

    const updatedVisibilityModel = allColumns.reduce((acc: any, item: any) => {
      if (visibilityModel[item] === undefined) {
        acc[item] = true
      } else {
        acc[item] = visibilityModel[item]
      }

      return acc
    }, {})
    const fields = Object.keys(updatedVisibilityModel).filter((item: any) => updatedVisibilityModel[item] === true)

    exportExcel('product', fields, 'produit').catch(err => {
      toast.error(t('Failed to export data') as string)
    })
  }
  const deleteProduct = id => {
    return new Promise(async (resolve, reject) => {
      await http
        .delete(`Produits/${id}`)
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
      <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} deelete={deleteProduct} rowId={selectedRow} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader exportXlsx={exportXlsx} selectedRows={selectedRows} handleFilter={handleFilter} />

            <DataGrid
              key={i18n.language}
              initialState={{
                columns: {
                  columnVisibilityModel: visibilityModel
                }
              }}
              autoHeight
              pagination
              rows={store.data}
              // @ts-ignore
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              onSelectionModelChange={rows => setSelectedRows(rows)}
              onColumnVisibilityModelChange={model => {
                setVisibilityModel(model)
                saveSettings({ ...settings, productColumnVisibilityModel: model })
              }}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              components={{
                Toolbar: CustomToolbar
              }}
              localeText={i18n.language === 'fr' ? frFR.components.MuiDataGrid.defaultProps.localeText : {}}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

ProductList.acl = {
  subject: 'product',
  action: 'read'
}

export default ProductList
