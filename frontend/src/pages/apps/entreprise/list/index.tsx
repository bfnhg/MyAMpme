// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteEntreprise } from 'src/store/apps/entreprise'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { EntrepriseType } from 'src/types/apps/entrepriseTypes'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import TableHeader from 'src/views/apps/entreprise/list/TableHeader'

// ** Custom Table Components Imports
// import TableHeader from 'src/views/apps/entreprise/list/TableHeader'
// import AddEntrepriseDrawer from 'src/views/apps/entreprise/list/AddEntrepriseDrawer'

interface EntrepriseRoleType {
  [key: string]: { icon: string; color: string }
}

interface EntrepriseStatusType {
  [key: string]: ThemeColor
}

// ** Vars
const entrepriseRoleObj: EntrepriseRoleType = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  responsable: { icon: 'mdi:cog-outline', color: 'warning.main' },
  membre: { icon: 'mdi:account-outline', color: 'primary.main' }
}

interface CellType {
  row: EntrepriseType
}

const entrepriseStatusObj: EntrepriseStatusType = {
  true: 'success',
  false: 'warning',
}

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// // ** renders client column
// const renderClient = (row: EntreprisesType) => {
//   if (row.avatar.length) {
//     return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={row.avatarColor || 'primary'}
//         sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
//       >
//         {getInitials(row.fullName ? row.fullName : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteEntreprise(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href='/apps/entreprise/view/overview/'
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          Consulter
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Modifier
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Supprimer
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'Entreprise',
    renderCell: ({ row }: CellType) => {
      const { name,email} = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderClient(row)} */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <StyledLink href={`/apps/entreprise/view/${row.id}`}>{`${name}`}</StyledLink>
            <Typography noWrap variant='caption'>
              {`${email}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'telephone',
    headerName: 'Telephone',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.telephone}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 250,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.address}
        </Typography>
      )
    }


  },
  {
    flex: 0.1,
    field: 'website',
    minWidth: 150,
    headerName: 'Website',
    renderCell: ({ row }: CellType) => {
      return (
            <StyledLink target={'_blank'} href={row.website}>
        <Icon icon='mdi:open-in-new' />
            </StyledLink>
      )
    }
  },
  
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

const EntrepriseList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addEntrepriseOpen, setAddEntrepriseOpen] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.entreprise)

  useEffect(() => {
    dispatch(
      fetchData({
        q: value,
      })
    )
  }, [dispatch,  value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddEntrepriseDrawer = () => setAddEntrepriseOpen(!addEntrepriseOpen)

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>
          
          <TableHeader value={value} handleFilter={handleFilter} handleAdd={toggleAddEntrepriseDrawer} selectedRows={[]}/>
          <DataGrid
            autoHeight
            rows={store.data}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      {/* <AddEntrepriseDrawer open={addEntrepriseOpen} toggle={toggleAddEntrepriseDrawer} /> */}
    </Grid>
  )
}



export default EntrepriseList
