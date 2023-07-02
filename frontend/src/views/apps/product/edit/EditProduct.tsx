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
import { http } from 'src/global/http'
import { useTranslation } from 'react-i18next'

const EditProduct = ({ data }) => {
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
const { t} =useTranslation()
  const handleToast = (promise: Promise<ProductType>) => {
    return toast.promise(promise, {
      loading: t('Loading') as string,
      success: t('Updated Successfully') as string,
      error: (err: any) => {
        
        return t('Error') as string
    }})
  }
  
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

  const schema = yup.object().shape({
    nomModele: yup.string().required(t('Model Name is required') as string),
    coutAcquisition: yup
      .number()
      .typeError(t('Cost must be a number') as string)
      .required(t("Cost is required") as string)
      .moreThan(0, t("Cost must be greater than 0") as string),
    manufacturier: yup.string().required(t('Manufacturer is required') as string),
    mtbf: yup.number().nullable().typeError(t('MTBF must be a number') as string),
    numeroModele: yup.string()
    .required(t('Model Number is required') as string),
    classe: yup.string().required(t('Class is required') as string),
    periodeGarantie: yup
      .number()
      .typeError(t('Warranty period must be a number') as string)
      .required(t('Warranty period is required') as string)
      .moreThan(0, t('Warranty period must be greater than 0') as string),
    finVie: yup.date().nullable(),
    finSupport: yup.date().nullable()
  })
  const defaultValues = {
    nomModele: '',
    manufacturier: '',
    numeroModele:  '',
    classe: '',
    coutAcquisition: '',
    mtbf: null,
    periodeGarantie:  '',
    finVie: null,
    finSupport: null
  }
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const formatDate= (date: string) => {
    const d = new Date(date)
    const year = d.getFullYear()
    if (year === 1) return undefined

    return d
  }
useEffect(() => {
    if (data) {
        setValue('nomModele', data.nomModele)
        setValue('coutAcquisition', data.coutAcquisition)
        setValue('manufacturier', data.manufacturier)
        setValue('mtbf', data.mtbf)
        setValue('numeroModele', data.numeroModele)
        setValue('classe', data.classe)

        //@ts-ignore
        setValue('periodeGarantie', data.periodeGarantie)

        //@ts-ignore
        setValue('finVie', formatDate(data.finVie))

        //@ts-ignore
        setValue('finSupport', formatDate(data.finSupport))
    }
   
  }, [data,setValue])
  const onSubmit = (submitteddata: Product) => {
    handleToast(
      http.put(process.env.NEXT_PUBLIC_SERVER_URL + classNames.product + `/${data.id}`, {
        id:data.id,
        ...submitteddata,
      })
    )
  }

  if (data) {
    return (
      <DatePickerWrapper>
        <Card>
          <CardHeader title='Edit a product' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          {/** @ts-ignore */}
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Controller
                name='nomModele'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label={t('Model Name') as string}
                    onChange={onChange}
                    placeholder={t('Please enter model name') as string}
                    error={Boolean(errors.nomModele)}
                  />
                )}
              />
              {errors.nomModele && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.nomModele.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='coutAcquisition'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    InputProps={{
                      endAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                  type='number'

                    value={value}
                    label={t('Cost') as string}
                    onChange={onChange}
                    placeholder={t('Please enter the cost') as string}
                    error={Boolean(errors.coutAcquisition)}
                  />
                )}
              />
              {errors.coutAcquisition && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.coutAcquisition.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='manufacturier'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label={t('Manufacturer') as string}
                    onChange={onChange}
                    placeholder={t('Please enter manufacturer') as string}
                    error={Boolean(errors.manufacturier)}
                  />
                )}
              />
              {errors.manufacturier && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.manufacturier.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='numeroModele'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField

                    value={value}
                    label={t('Model Number') as string}
                    onChange={onChange}
                    placeholder={t('Please enter model number') as string}
                    error={Boolean(errors.numeroModele)}
                  />
                )}
              />
              {errors.numeroModele && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.numeroModele.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
              name='mtbf'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label={t('MTBF') as string}
                  onChange={(e)=>{
                    if(e.target.value === '') onChange(null)
                    else onChange(e.target.value)
                  }}
                  placeholder={t('Please enter MTBF') as string}
                  error={Boolean(errors.mtbf)}
                />
              )}
            />
              {errors.mtbf && <FormHelperText sx={{ color: 'error.main' }}>{errors.mtbf.message}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='classe'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label={t('Class') as string}
                    onChange={onChange}
                    placeholder={t('Please enter the class') as string}
                    error={Boolean(errors.classe)}
                  />
                )}
              />
              {errors.classe && <FormHelperText sx={{ color: 'error.main' }}>{errors.classe.message}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='periodeGarantie'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                  type='number'

                    InputProps={{
                      endAdornment: <InputAdornment position='start'>{t('months')}</InputAdornment>
                    }}
                    value={value}
                    label={t('Warranty period') as string}
                    onChange={onChange}
                    placeholder={t('Please enter the warranty period') as string}
                    error={Boolean(errors.periodeGarantie)}
                  />
                )}
              />
              {errors.periodeGarantie && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.periodeGarantie.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='finVie'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    showYearDropdown
                    showMonthDropdown
                    selected={value}
                    id='finVie'
                    placeholderText='MM-DD-YYYY'
                    popperPlacement={popperPlacement}
                    onChange={onChange}
                    customInput={<CustomInput fullWidth error={Boolean(errors.finVie)} label={t('End of Life')} />}
                  />
                )}
              />

              {errors.finVie && <FormHelperText sx={{ color: 'error.main' }}>{errors.finVie.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='finSupport'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    showYearDropdown
                    showMonthDropdown
                    selected={value}
                    id='finSupport'
                    placeholderText='MM-DD-YYYY'
                    popperPlacement={popperPlacement}
                    onChange={onChange}
                    customInput={<CustomInput fullWidth error={Boolean(errors.finSupport)} label={t('End of Support')} />}
                  />
                )}
              />
              {errors.finSupport && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.finSupport.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                {t('Edit')}
              </Button>
            </CardActions>
          </form>
        </Card>
      </DatePickerWrapper>
    )
  } else {
    return <Spinner />
  }
}

export default EditProduct
