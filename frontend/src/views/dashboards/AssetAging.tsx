// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid,frFR } from '@mui/x-data-grid'
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
import { assetsAging } from 'src/store/apps/dashboard/assetsAging'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'

type tableType={
  id: number,
    class: string,
    values: {
      "< 1 yr": number,
    ">1 and < 2yr": number,
    "> 3 yr": number
    }
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
    field: '< 1 yr',
    headerName: '< 1 yr',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.values['< 1 yr']??'0'}`}</Typography>
  },
  {
    flex:0.1,
    minWidth: 70,
    field: '>1 and < 2yr',
    headerName: '>1 and < 2yr',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.values['>1 and < 2yr']??'0'}`}</Typography>

    },
    {
    flex:0.1,
    minWidth: 70,
    field: '> 3 yr',
    headerName: '> 3 yr',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.values['> 3 yr']??'0'}`}</Typography>
    }
]

const AssetAging = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(5)
const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.assetAging)
  const {t,i18n} = useTranslation()

  useEffect(() => {
    dispatch(
      assetsAging({
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
            <Translations text = 'Assets Aging per class'/>
          </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Typography variant='body2' sx={{ mr: 2 }}>
            <Translations text = 'Search'/>:
          </Typography>
          <TextField size='small' placeholder={t('Search Class')} value={value} onChange={e => setValue(e.target.value)} />
        </Box>

        </Box>
      </CardContent>
      <DataGrid
      key={i18n.language}
        autoHeight
        rows={store.data}
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

export default AssetAging
