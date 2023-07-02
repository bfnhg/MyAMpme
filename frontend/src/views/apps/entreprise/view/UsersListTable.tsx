// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
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
import { UsersType } from 'src/types/apps/userTypes'

interface CellType {
  row: UsersType
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
    flex:0.1,

    minWidth: 150,
    field: 'fullName',
    headerName: 'Full Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.fullName}`}</Typography>
  },
 
   {
    flex:0.2,
   minWidth: 150,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.email }`}</Typography>
  },
]

const UsersListTable = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(7)
  const [data, setData] = useState<UsersType[]>([])

  useEffect(() => {
    axios
      .get('/apps/users/list', {
        params: {
          q: value
        }
      })
      .then(res => {
        setData(res.data.users)
      })
  }, [value])

  return (
    <Card>
      <CardHeader title='Users List' />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Typography variant='body2' sx={{ mr: 2 }}>
            Search:
          </Typography>
          <TextField size='small' placeholder='Search Users' value={value} onChange={e => setValue(e.target.value)} />
        </Box>
      </CardContent>
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />
    </Card>
  )
}

export default UsersListTable
