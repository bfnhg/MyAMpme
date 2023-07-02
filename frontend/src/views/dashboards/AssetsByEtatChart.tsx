// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { classNames } from 'src/global/ClassNames'
import Translations from 'src/layouts/components/Translations'

interface LabelProp {
  cx: number
  cy: number
  percent: number
  midAngle: number
  innerRadius: number
  outerRadius: number
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = (props: LabelProp) => {
  // ** Props
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='#fff' textAnchor='middle' dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const AssetsByEtatChart = () => {
  const [data, setData] = useState([
    { id: 'EnCommande', name: 'In Order', value: 0, color: '#00d4bd' },
    { id: 'EnStock', name: 'In Stock', value: 0, color: '#ffe700' },
    { id: 'EnMaintenance', name: 'In Maintenance', value: 0, color: '#FFA1A1' },
    { id: 'EnUtilisation', name: 'In Use', value: 0, color: '#826bf8' },
    { id: 'Retire', name: 'Retired', value: 0, color: '#76baff' },
    { id: 'Dispose', name: 'Disposed', value: 0, color: '#6fc78d' }
  ])
  const [renderedData, setRenderedData] = useState([])

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_SERVER_URL + classNames.dashboard + '/nombre-actifs-par-etat').then(response => {
      const stats = response.data
      const keys = Object.keys(data)
      const dataDeepCopy = JSON.parse(JSON.stringify(data))
      const newdata = []
      dataDeepCopy.forEach(value => {
        //if key exists in stats
        if (stats[value.id]) {
          //set stats to data
          value.value = stats[value.id]
          value.name = <Translations text={value.name} />

          //@ts-ignore
          newdata.push(value)
        }
      })
    
      setRenderedData(newdata)
    })
  }, [])

  return (
    <Card>
      <CardHeader
        title={<Translations text='Assets by State' />}
        
        // subheader='Spending on various categories'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
       { renderedData.length > 0 ? <> <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <PieChart height={350} style={{ direction: 'ltr' }}>
              <Pie data={renderedData} innerRadius={80} dataKey='value' label={renderCustomizedLabel} labelLine={false}>
                {renderedData.map((entry, index) => (

                  // @ts-ignore
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4, justifyContent: 'center' }}>
          {renderedData.map((item, index) => {

            // @ts-ignore
            if (item.value > 0)
              return (
                <Box
                  key={index}
                  sx={{
                    mr: 6,
                    display: 'flex',
                    alignItems: 'center',
                    
                  // @ts-ignore
                    '& svg': { mr: 1.5, color: item.color }
                  }}
                >
                  <Icon icon='mdi:circle' fontSize='0.75rem' />

                  {/** @ts-ignore */}
                  <Typography variant='body2'>{item.name}</Typography>
                </Box>
              )
          })}
         
        </Box></>:(
          <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height: 350}}>
            <Typography variant='h6'>No data</Typography>
          </Box>
        )
        }
      </CardContent>
    </Card>
  )
}

export default AssetsByEtatChart
