// ** React Imports
import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Spinner from 'src/@core/components/spinner'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import { useTheme } from '@mui/material/styles'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { ProductType } from 'src/types/apps/productType'
import InputAdornment from '@mui/material/InputAdornment'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { classNames } from 'src/global/ClassNames'
import format from 'date-fns/format'
import { useTranslation } from 'react-i18next'

const PreviewCard = ({ data }:{data:ProductType}) => {
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
const formatDate = (date:Date) => {
  try {
    const d = new Date(date)
    if(d.getFullYear()==1){
      return 'N/A'
    }

    return format(new Date(date), 'dd/MM/yyyy')
  }catch(e){
    return 'N/A'
  }
}
const {t} = useTranslation()
  
   interface Product {
    nomModele: string
    coutAcquisition: number
    manufacturier: string
    mtbf: number | null
    classe: string
    numeroModele: string
    periodeGarantie: Date
    finVie: Date | null
    finSupport: Date | null
  }

  
  
  

  if (data) {
    return (
      <DatePickerWrapper>
        <Card>
          {/** @ts-ignore */}
            <CardContent>
              <Grid container spacing={7} mb={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={data.id}
                    sx={{ width: { sm: '250px', xs: '170px' } }}
                    InputProps={{
                      disabled: true,
                      startAdornment: <InputAdornment position='start'>#</InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={7}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                    InputProps={{
                            disabled: true,
                         }}
                          value={data.nomModele}
                          label={t('Model Name')}
                        />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                        <TextField
                        InputProps={{
                            disabled: true,
                         }}
                          value={data.coutAcquisition}
                          label={t('Cost')}
                        />
                      
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                        <TextField
                        InputProps={{
                            disabled: true,
                         }}
                          value={data.manufacturier}
                          label={t('Manufacturer')}
                        />
                     
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                        <TextField
                        InputProps={{
                            disabled: true,
                         }}
                          value={data.numeroModele}
                          label={t('Model Number')}
                        />
                     
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                        <TextField
InputProps={{
                            disabled: true,
                         }}
                          value={data.mtbf??'N/A'}
                          label={t('MTBF')}
                        />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                        <TextField
                        InputProps={{
                            disabled: true,
                         }}
                          value={data.classe}
                          label={t('Class')}
                        />
                      
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                        <TextField
                          InputProps={{
                            disabled: true,
                            endAdornment: <InputAdornment position='start'>
                              {t('months')}
                            </InputAdornment>
                          }}
                          value={data.periodeGarantie}
                          label={t('Warranty Period')}
                        />
                     
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                        <TextField
                         InputProps={{
                            disabled: true,
                         }}
                          value={formatDate(data.finVie)}
                          label={t('End of Life')}
                        />
                      
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                        <TextField
                         InputProps={{
                            disabled: true,
                         }}
                          value={formatDate(data.finSupport)}
                          label={t('End of Support')}
                        />
                     
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
           
        </Card>
      </DatePickerWrapper>
    )
  } else {
    return <Spinner />
  }
}

export default PreviewCard
