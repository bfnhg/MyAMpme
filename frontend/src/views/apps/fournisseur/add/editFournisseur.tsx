// ** React Imports
import { forwardRef, useEffect, useImperativeHandle } from 'react'

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
import { addFournisseur, fetchData, updateFournisseur } from 'src/store/apps/fournisseur'
import { FournisseurType } from 'src/types/apps/fournisseurType'
import { http } from 'src/global/http'
import { classNames } from 'src/global/ClassNames'
import { useTranslation } from 'react-i18next'

const EditFournisseur = forwardRef(
  ({ callback, fournisseur }: { callback: () => void | null; fournisseur: FournisseurType }, ref) => {
    const theme = useTheme()
    const { direction } = theme
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
const {t} =useTranslation()
    const dispatch: AppDispatch = useDispatch()

    interface Fournisseur {
      name: string
      email: string
      telephone: string
      adresse: string
    }

   const schema = yup.object().shape({
    name : yup.string().required(t('Full Name is required') as string),
    email: yup.string()
    .email(t('Email must be a valid email') as string)
    .required(t('Email is required') as string),
    telephone: yup.string().required(t('Phone number is required') as string),
    adresse: yup.string().required(t('Address is required') as string)
  })
    const defaultValues = {
      name: '',
      email: '',
      telephone: '',
      adresse: ''
    }
    const {
      reset,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues,
      mode: 'onChange',
      resolver: yupResolver(schema)
    })
    useEffect(() => {
      if (fournisseur) {
        reset(fournisseur)
      }
    }, [fournisseur, reset])
    const onSubmit = (data: Fournisseur) => {
      http.put(classNames.fournisseurs+'/'+fournisseur.id,{ 
        ...data,
       }).then((res) => {
if (callback) callback()
      toast.success(t('Updated Successfully') as string)
      reset()
      dispatch(fetchData({ q: '' }))
       }).catch((err) => {
         toast.error(t('Error Updating') as string)
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
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label={t('Full Name') as string}
                        onChange={onChange}
                        placeholder={t('Please enter full name') as string}
                        error={Boolean(errors.name)}
                      />
                    )}
                  />
                  {errors.name && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label={t('Email') as string}
                        onChange={onChange}
                        placeholder={t('Please enter email') as string}
                        error={Boolean(errors.email)}
                      />
                    )}
                  />
                  {errors.email && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='telephone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label={t('Phone Number') as string}
                        onChange={onChange}
                        placeholder={t('Please enter phone number') as string}
                        error={Boolean(errors.telephone)}
                      />
                    )}
                  />
                  {errors.telephone && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.telephone.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='adresse'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label={t('Address') as string}
                        onChange={onChange}
                        placeholder={t('Please enter address') as string}
                        error={Boolean(errors.adresse)}
                      />
                    )}
                  />
                  {errors.adresse && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.adresse.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
             
            </Grid>
        </form>
      </DatePickerWrapper>
    )
  }
)

export default EditFournisseur
