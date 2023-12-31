// ** React Imports
import { useState, useEffect, forwardRef, useContext } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled, useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRowId, GridToolbarColumnsButton, GridToolbarContainer, frFR } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import TableHeader from 'src/views/apps/actif/list/TableHeader'
import { deleteActif, fetchData } from 'src/store/apps/actif'
import { ActifType } from 'src/types/apps/actifTypes'
import { Etat, EtatColor } from 'src/types/apps/Etat'
import { exportExcel } from 'src/utils/exportExcel'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import DeleteDialog from 'src/views/apps/DeleteDialog'
import { http } from 'src/global/http'
import { useTranslation } from 'react-i18next'
import { set } from 'nprogress'
import { ca } from 'date-fns/locale'
import { toast } from 'react-hot-toast'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: ActifType
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',

  //check if dark mode is enabled, if not set the color to primary.main
  color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.primary.main
}))

const etatColor = {
  'In Stock': 'primary',
  'In Order': 'warning',
  'In Maintenance': 'error',
  'In Use': 'success',
  Retired: 'info',
  Dispose: 'secondary'
}
type etatType = 'In Stock' | 'In Order' | 'In Maintenance' | 'In Use' | 'Retired' | 'Dispose'
type etatColorType = 'primary' | 'warning' | 'error' | 'success' | 'info' | 'secondary'

const formatDate = (date: Date) => {
  try {
    const d = new Date(date)
    if (d.getFullYear() == 1) {
      return 'N/A'
    }

    return format(new Date(date), 'dd/MM/yyyy')
  } catch (e) {
    return 'N/A'
  }
}
const formatDateTime = (date: Date) => {
  try {
    const d = new Date(date)
    if (d.getFullYear() == 1) {
      return 'N/A'
    }

    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss')
  } catch (e) {
    return 'N/A'
  }
}

const CustomToolbar = () => {
  const theme = useTheme()
  const darkMode = theme.palette.mode === 'dark'

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

const ActifList = () => {
  // ** State
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const { settings, saveSettings } = useSettings()
  const [visibilityModel, setVisibilityModel] = useState<any>(settings.actifColumnVisibilityModel)
  const ability = useContext(AbilityContext)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { t, i18n } = useTranslation()
  const allColumns = [
    {
      minWidth: 100,
      flex: 0.1,
      field: 'id',
      headerName: '#',
      renderCell: ({ row }: CellType) => <StyledLink href={`/apps/actif/preview/${row.id}`}>{`#${row.id}`}</StyledLink>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'etiquette',
      headerName: 'Tag',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.etiquette ?? 'N/A'}`}</Typography>
    },
    {
      minWidth: 200,
      flex: 0.15,
      field: 'nom',
      headerName: 'Name',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.nom}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'numeroSerie',
      headerName: 'Serial Number',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.numeroSerie}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'assignedTo',
      headerName: 'Assigned To',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${
          row.assignedTo != null && row.assignedTo.id != 0 ? row.assignedTo.fullName : 'N/A'
        }`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'groupeSupport',
      headerName: 'Support Group',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.groupe ?? 'N/A'}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'nomModel',
      headerName: 'Model Name',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.produit.nomModele ?? 'N/A'}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'modelNumber',
      headerName: 'Model Number',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${row.produit.numeroModele ?? 'N/A'}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'class',
      headerName: 'Class',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.produit.classe ?? 'N/A'}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'cost',
      headerName: 'Cost',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${row.produit.coutAcquisition ?? 'N/A'}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'periodeGarantie',
      headerName: 'Warranty period',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${row.produit.periodeGarantie ?? 'N/A'}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'dateChangementEtat',
      headerName: 'State Change Date',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${formatDateTime(row.dateChangement)}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'numBonCommande',
      headerName: 'Order Number',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.numBonCommande ?? 'N/A'}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'manufacturer',
      headerName: 'Manufacturer',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${row.produit.manufacturier ?? 'N/A'}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'mtbf',
      headerName: 'MTBF',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.produit.mtbf ?? 'N/A'}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'finSupport',
      headerName: 'End of Support',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${formatDate(row.produit.finSupport)}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'finVie',
      headerName: 'End of Life',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${formatDate(row.produit.finVie)}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'etat',
      headerName: 'State',

      renderCell: ({ row }: CellType) => (
        //@ts-ignore
        <CustomChip label={t(Etat[row.etat])} skin='light' color={EtatColor[row.etat]} />
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'createdAt',
      headerName: 'Created At',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${formatDateTime(row.createdAt)}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'createdBy',
      headerName: 'Created By',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${row.user ? row.user.fullName : 'N/A'}`}</Typography>
      )
    },

    {
      minWidth: 150,
      flex: 0.15,
      field: 'gerePar',
      headerName: 'Managed By',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${
          row.managedBy != null && row.managedBy.id != 0 ? row.managedBy.fullName : 'N/A'
        }`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'dateAchat',
      headerName: 'Purchase Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${formatDate(row.dateAchat)}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'proprietede',
      headerName: 'Owned By',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${
          row.ownedBy != null && row.ownedBy.id != 0 ? row.ownedBy.fullName : 'N/A'
        }`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'updatedAt',
      headerName: 'Updated At',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${formatDateTime(row.updatedAt)}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'updatedBy',
      headerName: 'Updated By',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${row.updater ? row.updater.fullName : 'N/A'}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'assignedAt',
      headerName: 'Assigned At',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${formatDate(row.assignedAt)}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'prochaineMaintenance',
      headerName: 'Next Maintenance',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${formatDate(row.prochaineMaintenance)}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'dateRecu',
      headerName: 'Received At',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${formatDate(row.dateRecu)}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'installedAt',
      headerName: 'Installed At',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${row?.installedAt ? formatDate(row.installedAt) : 'N/A'}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'finGarantie',
      headerName: 'Warranty End',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${formatDate(row.finGarantie)}`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'heureUtilisation',
      headerName: 'Usage Time',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.heureUtilisation} h`}</Typography>
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'emplacement',
      headerName: 'Location',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${
          row.emplacement != null && row.emplacement.id != 0 ? row.emplacement.nomEmp : 'N/A'
        }`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'fonction',
      headerName: 'Function',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${!row.fonction || row.fonction === '' ? 'N/A' : row.fonction}`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'fournisseur',
      headerName: 'Supplier',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${
          row.fournisseur != null && row.fournisseur.id != 0 ? row.fournisseur.name : 'N/A'
        }`}</Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.15,
      field: 'maintenanceEffectueLe',
      headerName: 'Maintenance Done At',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{`${
          row?.maintenanceEffectueLe ? formatDate(row.maintenanceEffectueLe) : 'N/A'
        }`}</Typography>
      )
    }
  ]
  const updatedColumns = allColumns.map(column => {
    return {
      ...column,
      headerName: t(`${column.headerName}`)
    }
  })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.actif)
  const headers = {}
  allColumns.forEach(column => {
    headers[column.headerName] = ''
  })

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
          <Tooltip title={t('View')}>
            <IconButton size='small' component={Link} href={`/apps/actif/preview/${row.id}`}>
              <Icon icon='mdi:eye-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
          {ability.can('delete', 'actif') && (
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
          {ability.can('update', 'actif') && (
            <Tooltip title={t('Edit')}>
              <IconButton size='small' component={Link} href={`/apps/actif/edit/${row.id}`}>
                <Icon icon='mdi:pencil-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )
    }
  ]

  const exportXlsx = () => {
    //get all columns
    const allColumns = columns.map((item: any) => item.field)

    //update visibility model with all columns ( if a column is not in visibility model, it is set to true by default)
    const updatedVisibilityModel = allColumns.reduce((acc: any, item: any) => {
      if (visibilityModel[item] === undefined) {
        acc[item] = true
      } else {
        acc[item] = visibilityModel[item]
      }

      return acc
    }, {})
    // fields = ["nom","numBonCommande",...]
    const fields = Object.keys(updatedVisibilityModel).filter((item: any) => updatedVisibilityModel[item] === true)

    exportExcel('asset', fields, 'actif').catch(err => {
      toast.error(t('Failed to export data') as string)
    })
  }
  const deleteActif = id => {
    return new Promise(async (resolve, reject) => {
      await http
        .delete(`Actifs/${id}`)
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
      <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} deelete={deleteActif} rowId={selectedRow} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader exportXlsx={exportXlsx} selectedRows={selectedRows} handleFilter={handleFilter} />

            <DataGrid
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
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              onColumnVisibilityModelChange={model => {
                setVisibilityModel(model)

                saveSettings({ ...settings, actifColumnVisibilityModel: model })
              }}
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

ActifList.acl = {
  subject: 'actif',
  action: 'read'
}

export default ActifList
