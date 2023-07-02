// ** React Imports
import { forwardRef, useImperativeHandle } from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import toast from 'react-hot-toast'
import 'cleave.js/dist/addons/cleave-phone.us'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import { useTheme } from '@mui/material/styles'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { AppDispatch } from 'src/store'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { useDispatch } from 'react-redux'
import { InputAdornment } from '@mui/material'
import axios from 'axios'
import { fetchData } from 'src/store/apps/product'
import { classNames } from 'src/global/ClassNames'
import { http } from 'src/global/http'
import { useTranslation } from 'react-i18next'

const AddNewProduit = forwardRef(({ callback }: { callback: () => void | null }, ref) => {
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const {t}=useTranslation()
  const dispatch: AppDispatch = useDispatch()

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
    reset,
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
  const addProduct = (data: Product) => {
    return http.post(process.env.NEXT_PUBLIC_SERVER_URL + classNames.product, {
      ...data
    })
  }

  const onSubmit = (data: Product) => {
    addProduct(data)
      .then(res => {
        if (res.status === 201) {
          if (callback) callback()
        toast.success(t('Added Successfully') as string)
        reset(defaultValues)
        }

      })
      .catch(err => {
       
        toast.error(t('Error Adding') as string)
      })
  }
  useImperativeHandle(ref, () => ({
    submitForm() {
      //@ts-ignore
      handleSubmit(onSubmit)()
    }
  }))

  return (
    <DatePickerWrapper>
      <form>
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
      </form>
    </DatePickerWrapper>
  )
})

export default AddNewProduit
