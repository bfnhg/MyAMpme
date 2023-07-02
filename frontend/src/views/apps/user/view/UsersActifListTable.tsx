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


// ** Third Party Imports
import axios from 'axios'

// ** Type Imports
import { ActifType } from 'src/types/apps/actifTypes'
import { http } from 'src/global/http'
import { Etat, EtatColor } from 'src/types/apps/Etat'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'

interface CellType {
  row: ActifType
}
const etatColor ={
  'In Stock': 'primary',
  'In Order': 'warning',
  'In Maintenance': 'error',
  'In Use': 'success',
  'Retired': 'info',
  'Dispose': 'secondary'
}
type etatType = 'In Stock' | 'In Order' | 'In Maintenance' | 'In Use' | 'Retired' | 'Dispose'
type etatColorType = 'primary' | 'warning' | 'error' | 'success' | 'info' | 'secondary'

const getEtatColor = (row:any) :etatColorType => {
  if (etatColor[row.etat as etatType] != undefined){
    return etatColor[row.etat as etatType] as etatColorType
  }

  return 'info'
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


const ActifListTable = ({userId}) => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(7)
  const [data, setData] = useState<ActifType[]>([])
  const {t,i18n} = useTranslation()
  const searchDatas = (value: string,data:ActifType[]) => {
    const searchValue = value.toLowerCase()
    
   
    const filteredData = data.filter(item => {
      return item.nom.toLowerCase().includes(searchValue) ||
      item.numeroSerie.toLowerCase().includes(searchValue) 
    })
    
    
    return filteredData
  }
const columns = [
 {
    flex:0.15,
    minWidth: 200,
    field: 'nom',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <StyledLink href={`/apps/actif/preview/${row.id}`}>{`${row.nom}`}</StyledLink>

  },
  {
    flex:0.1,
    minWidth: 150,
    field: 'numeroSerie',
    headerName: 'Serial Number',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.numeroSerie}`}</Typography>
  },
 {
    flex:0.1,
    minWidth: 150,
    field: 'etiquette',
    headerName: 'Tag',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.etiquette }`}</Typography>
  },
  {
    minWidth: 150,
    flex: 0.15,
    field: 'etat',
    headerName: 'State',

    //@ts-ignore
    renderCell: ({ row }: CellType) => <CustomChip label={t(Etat[row.etat])} skin='light' color={EtatColor[row.etat]} />
     
    
  },
]
const updatedColumns = columns.map(column => {
  return {
    ...column,
    headerName: <Translations text={`${column.headerName}`} />
  };
});
  useEffect(() => {
    
    
    http.get('Actifs/createdBy/'+userId).then(response => {
      const receivedData = response.data.$values
      setData(searchDatas(value,receivedData))
    })
  }, [userId, value])


 

  return (
    <Card>
      <CardHeader title={t('Assets List')} />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Typography variant='body2' sx={{ mr: 2 }}>
            {t('Search')}:
          </Typography>
          <TextField size='small' placeholder={t('Search')} value={value} onChange={e => setValue(e.target.value)} />
        </Box>
      </CardContent>
      <DataGrid
      key={i18n.language}
        autoHeight
        rows={data}

        //@ts-ignore
        columns={updatedColumns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        localeText={i18n.language == 'fr' ? frFR.components.MuiDataGrid.defaultProps.localeText:{}}
        />
    </Card>
  )
}

export default ActifListTable
