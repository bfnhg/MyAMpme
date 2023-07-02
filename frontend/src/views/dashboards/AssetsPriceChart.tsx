// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import axios from 'axios'
import { classNames } from 'src/global/ClassNames'
import process from 'process'
import { useTranslation } from 'react-i18next'

interface PickerProps {
  year: DateType
}

const AssetsPriceChart = () => {
  // ** Hook
  const theme = useTheme()
  const initialOptions: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '30%',
        horizontal: true,
        startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    }
  }

  // ** States
  const [year, setYear] = useState(new Date())
  const [months, setMonths] = useState([])
  const [options, setOptions] = useState<ApexOptions>({ ...initialOptions })
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  const { t } = useTranslation()
  const getMonthsTillNow = () => {
    const date = new Date()
    const _months = []
    

    for (let i = 0; i < (date.getFullYear() == year.getFullYear() ? date.getMonth() + 1 : 12); i++) {
      const m = format(new Date(year.getFullYear(), i), 'MMMM')

      // @ts-ignore
      _months.push(t(m))
    }
    setMonths(_months)
    

    //change options xaxis categories
    setOptions(prevState => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        categories: _months
      }
    }))
  }
  useEffect(() => {
    getMonthsTillNow()
  }, [year])
  
  const getKeyNotEqual = (obj, key) => {
    return Object.keys(obj).filter(k => k !== key)[0]
  }
  useEffect(() => {
    Promise.all(
      months.map((month, i) =>
        axios.get(process.env.NEXT_PUBLIC_SERVER_URL + classNames.dashboard + '/expenses', {
          params: { month: i + 1, year: year.getFullYear() }
        })
      )
    ).then(res => {
      const data = res.map(r => r.data)
      const newdata = [{ data: [] }]

      months.forEach((month, index) => {
        const monthData = data[index]
        const key = getKeyNotEqual(monthData, '$id')
        if (key) {
          // @ts-ignore
          newdata[0].data.push(monthData[key])
        } else {
          // @ts-ignore
          newdata[0].data.push(0)
        }
      })

      const newTotal = newdata[0].data.reduce((a, b) => a + b, 0)
      setTotal(newTotal)

      // @ts-ignore
      setData(newdata)
    })
  }, [months])
  const CustomInput = forwardRef((props: PickerProps, ref) => {
    //@ts-ignore
    const value = `${t('Year')} : ${format(props.year, 'yyyy')}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:bell-outline' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  return (
    <Card>
      <CardHeader
        title={t('Assets Expenses')}
        subheader={`$${total}`}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <DatePicker
            showYearPicker
            selected={year}
            id='year-picker'
            dateFormat='MM/yyyy'
            onChange={(date: Date) => setYear(date)}
            customInput={<CustomInput year={year} />}
          />
        }
      />
      <CardContent>
        <ReactApexcharts type='bar' height={400} options={options} series={data} />
      </CardContent>
    </Card>
  )
}

export default AssetsPriceChart
