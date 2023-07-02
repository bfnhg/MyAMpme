// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import AnalyticsTable from 'src/views/dashboards/analytics/AnalyticsTable'
import AssetsOverView from 'src/views/dashboards/AssetsOverView'
import AssetsHistory from 'src/views/dashboards/AssetsHistory'
import AssetsByEtatChart from 'src/views/dashboards/AssetsByEtatChart'
import 'chart.js/auto'
import AssetsPriceChart from 'src/views/dashboards/AssetsPriceChart'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ActifListTable from 'src/views/apps/user/view/UsersActifListTable'
import AssetDistributionPerClass from 'src/views/dashboards/AssetDistributionPerClass'
import AssetAging from 'src/views/dashboards/AssetAging'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { classNames } from 'src/global/ClassNames'

const Dashboard = () => {
  const [maintenceDue, setMaintenceDue] = useState(0)

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_SERVER_URL +classNames.dashboard+ '/MaintenanceDueIn30Days').then((response) => {
      setMaintenceDue(response.data)
    })
  }, [])

  return (
    <DatePickerWrapper>
    <ApexChartWrapper>
      <Grid container spacing={6}>
        
        <Grid item xs={12} >
          <AssetsOverView />
        </Grid>
        
        
        <Grid item xs={12} md={6} lg={2}>
         
              <CardStatisticsVerticalComponent
                stats={maintenceDue.toString()}
                icon={<Icon icon='mdi:wrench-clock' />}
                color='warning'
                trendNumber={''}
                title='Maintenance due in 30 days'
                subtitle=''
              />
            
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
           <AssetsByEtatChart/>
        </Grid>
        <Grid item xs={12} md={6}>
            <AssetsPriceChart />
          </Grid>
         
        
         <Grid item xs={12} md={12} lg={12}>
          <AssetDistributionPerClass />
        </Grid>
         <Grid item xs={12} md={12} lg={12}>
          <AssetAging />
        </Grid>
        
           
         
        
       
       
        
      </Grid>
    </ApexChartWrapper>
    </DatePickerWrapper>
  )
}

Dashboard.acl ={
  action: 'read',
  subject: 'dashboard'
}

export default Dashboard
