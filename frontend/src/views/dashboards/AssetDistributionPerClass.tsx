// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid, frFR } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import CustomChip from 'src/@core/components/mui/chip'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Third Party Imports
import axios from 'axios'

// ** Type Imports
import { ActifType } from 'src/types/apps/actifTypes'
import { classDis } from 'src/store/apps/dashboard'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

type tableType={
    class: string,
    EnCommande: number,
    EnMaintenance: number,
    EnStock: number,
    EnUtilisation: number,
    Retire: number,
    Dispose: number
}
interface CellType {
  row: tableType
}

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.8rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const columns = [
 {
    flex:0.15,
    field: 'class',
    minWidth: 100,
    headerName: '',
    renderCell: ({ row }: CellType) => <Typography variant='body2' sx={{
        fontWeight: 800,
    }}>{`${row.class}`}</Typography>

  },
  {
    flex:0.1,
    minWidth: 100,
    field: 'EnCommande',
    headerName: <Translations text='In Order'/>,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.EnCommande??'0'}`}</Typography>
  },
  {
    flex:0.1,
    minWidth: 70,
    field: 'EnMaintenance',
    headerName: <Translations text='In Maintenance'/>,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.EnMaintenance??'0'}`}</Typography>

    },
    {
    flex:0.1,
    minWidth: 70,
    field: 'EnStock',
    headerName: <Translations text='In Stock'/>,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.EnStock??'0'}`}</Typography>
    },
    {
    flex:0.1,
    minWidth: 70,
    field: 'EnUtilisation',
    headerName: <Translations text='In Use' />,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.EnUtilisation??'0'}`}</Typography>
    },
    {
    flex:0.1,
    minWidth: 70,
    field: 'Retire',
    headerName: <Translations text='Retired'/>,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.Retire??'0'}`}</Typography>
    },
    {
    flex:0.1,
    minWidth: 70,
    field: 'Dispose',
    headerName: <Translations text='Disposed'/>,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.Dispose??'0'}`}</Typography>
    },
]

const AssetDistributionPerClass = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(5)
const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.dashboard)
  const {t,i18n} = useTranslation()
  useEffect(() => {
    dispatch(
      classDis({
        q: value
      })
    )
  }, [dispatch, value])
 

  return (
    <Card>
      {/* <CardHeader title='Actif List' /> */}
      <CardContent>
       
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             
          <Typography variant='h6' sx={{ mr: 2 }}>
            <Translations text='Asset Distribution Per Class'/>
          </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Typography variant='body2' sx={{ mr: 2 }}>
            <Translations text='Search'/>:
          </Typography>
          <TextField size='small' placeholder={t('Search Class')} value={value} onChange={e => setValue(e.target.value)} />
        </Box>

        </Box>
      </CardContent>
      <DataGrid
      key={i18n.language}
        autoHeight
        rows={store.data}
        
        // @ts-ignore
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
         localeText={i18n.language==='fr'?frFR.components.MuiDataGrid.defaultProps.localeText:{}}
      />
    </Card>
  )
}

export default AssetDistributionPerClass
