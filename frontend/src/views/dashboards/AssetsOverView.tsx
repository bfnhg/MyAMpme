// ** React Imports
import { ReactElement, useState,useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import axios from 'axios'
import { classNames } from 'src/global/ClassNames'
import Translations from 'src/layouts/components/Translations'


const data = {
  "EnCommande":{
    stats: '0',
   title: 'In Order',
    color: 'info',
    icon: <Icon icon='mdi:warehouse' />
  },
 "EnStock": {
    stats: '0',
    title: 'In Stock',
    color: 'success',
    icon: <Icon icon='mdi:package-check' />
  },
  "EnMaintenance":{
    stats: '0',
   color: 'warning',
    title: 'In Maintenance',
    icon: <Icon icon='mdi:wrench-clock' />
  },
  "EnUtilisation":{
    stats: '0',
   color: 'primary',
    title: 'In Use',
    icon: <Icon icon='mdi:user-alert' />
  },"Retire":{
    stats: '0',
   color: 'error',
    title: 'Retired',
    icon: <Icon icon='mdi:cancel' />
  },"Dispose":{
    stats: '0',
    color: 'secondary',
    title: 'Disposed',
    icon: <Icon icon='mdi:delete-empty' />
  }
}

const renderStats = (stats) => {
  return stats.map((item, index: number) => (
    <Grid item xs={12} sm={4} lg={2} mt={2} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar
          variant='rounded'
          color={item.color}
          sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem' } }}
        >
          {item.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'><Translations text={item.title}/></Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const AssetsOverView = () => {
  const [stats, setStats] = useState([])
  const [nbrAssets, setNbrAssets] = useState(0)

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_SERVER_URL+classNames.dashboard+"/nombre-actifs-par-etat").then((response) => {
      const stats = response.data
      const keys = Object.keys(data)
      keys.forEach((key) => {
        //if key exists in stats
        if (stats[key]) {
          //set stats to data
          data[key].stats = stats[key]
        }
       
      })

      //@ts-ignore
      setStats(Object.values(data))
      
      
    })
    axios.get(process.env.NEXT_PUBLIC_SERVER_URL+classNames.dashboard+"/nombre-actifs").then((response) => {
      setNbrAssets(response.data)
    })
  }, [])

  return (
    <Card>
      <CardHeader
        title={<Translations text='Total assets' />}

        // action={
        //   <OptionsMenu
        //     options={['Last 28 Days', 'Last Month', 'Last Year']}
        //     iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
        //   />
        // }
        subheader={
          <Typography variant='h6'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {nbrAssets}
            </Box>
            
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(stats)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AssetsOverView
