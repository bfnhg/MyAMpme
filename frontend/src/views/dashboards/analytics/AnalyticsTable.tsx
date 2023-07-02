// ** React Import


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import CardHeader from '@mui/material/CardHeader'
import { CardContent } from '@mui/material'

interface TableBodyRowType {
  id: number
  name: string
  email: string
  username: string
  avatarSrc?: string
  status: 'active' | 'pending' | 'inactive'
  nbrActif:number
}

interface CellType {
  row: TableBodyRowType
}


const rows: TableBodyRowType[] = [
  {
    id: 1,
    nbrActif: 256,
    status: 'inactive',
    username: '@gslixby0',
    name: 'Joseph Wheeler',
    email: 'nuroani@icpair.com',
    avatarSrc: '/images/avatars/1.png'
  },
  {
    id: 2,
    status: 'active',
    name: 'May Lloyd',
    nbrActif: 123,
    email: 'jeju@ma.co.uk',
    username: '@hredmore1',
    avatarSrc: '/images/avatars/2.png'
  },
  {
    id: 3,
    status: 'pending',
    nbrActif: 99,
    username: '@msicely2',
    name: 'William Mckinney',
    email: 'cidagehe@nonalbo.com'
  },
  {
    id: 4,
    nbrActif: 23,
    status: 'active',
    name: 'Warren Clarke',
    username: '@mhurran4',
    email: 'hirasles@zozzetkuv.edu',
    avatarSrc: '/images/avatars/5.png'
  },
  {
    id: 5,
    nbrActif: 54,
    status: 'inactive',
    username: '@crisby3',
    name: 'Isabel Briggs',
    email: 'temiwiho@ohacma.gov'
  },
  {
    id: 6,
    nbrActif:12,
    status: 'pending',
    email: 'boz@peh.co.uk',
    name: 'Adeline Bennett',
    username: '@shalstead5',
    avatarSrc: '/images/avatars/4.png'
  },
  {
    id: 7,
    nbrActif: 77,
    status: 'active',
    name: 'Lora Simpson',
    email: 'dude@oco.nl',
    username: '@bkildayr',
    avatarSrc: '/images/avatars/8.png'
  }
]





const renderUserAvatar = (row: TableBodyRowType) => {
  if (row.avatarSrc) {
    return <CustomAvatar src={row.avatarSrc} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3, width: 30, height: 30, fontSize: '.8rem' }}>
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 200,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderUserAvatar(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                mb: -0.5,
                fontWeight: 600,
                lineHeight: 1.72,
                fontSize: '0.875rem',
                letterSpacing: '0.22px'
              }}
            >
              {row.name}
            </Typography>
            {/* <Typography variant='body2' sx={{ fontSize: '0.75rem', letterSpacing: '0.4px' }}>
              {row.username}
            </Typography> */}
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
        {row.email}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'nbrActif',
    headerName: 'Nombre d\'actif',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { fontSize: '1rem' } }}>
        
        <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
          {row.nbrActif}
        </Typography>
      </Box>
    )
  },
]

const AnalyticsTable = () => {
  return (
    <Card
      
    >
      <CardHeader
       title='Users'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      >
        
      </CardHeader>
    <CardContent>
      <DataGrid autoHeight hideFooter rows={rows} columns={columns} disableSelectionOnClick pagination={undefined} />

    </CardContent>
    </Card>
  )
}

export default AnalyticsTable
