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
import { addEmployee, fetchData, updateEmployee } from 'src/store/apps/employee'
import { EmployeeType } from 'src/types/apps/employeeType'
import { http } from 'src/global/http'
import { classNames } from 'src/global/ClassNames'
import { useTranslation } from 'react-i18next'

const EditEmployee = forwardRef(
  ({ callback, employee }: { callback: () => void | null; employee: EmployeeType }, ref) => {
    const theme = useTheme()
    const { direction } = theme
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

    const dispatch: AppDispatch = useDispatch()
    const {t}=useTranslation()
    interface Employee {
      fullName: string
      email: string
      telephone: string
      poste: string
    }

     const schema = yup.object().shape({
    fullName : yup.string().required(t('Full Name is required') as string),
    email: yup.string().email(t('Email must be a valid email') as string).required(t('Email is required') as string),
    telephone: yup.string().required(t('Phone Number is required') as string),
    poste: yup.string().required(t('Poste is required') as string)
  })
    const defaultValues = {
      fullName: '',
      email: '',
      telephone: '',
      poste: ''
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
      if (employee) {
        reset(employee)
      }
    }, [employee, reset])
    const onSubmit = (data: Employee) => {
      http.put(`Employes/${employee.id}`, data).then(res => {
      if (callback) callback()
      toast.success(t('Updated Successfully') as string)
      reset()
      dispatch(fetchData({q: ''}))
    }).catch(err => {
      toast.error(t('Error') as string)
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
                    name='fullName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label={t('Full Name') as string}
                        onChange={onChange}
                        placeholder={t('Please enter full name') as string}
                        error={Boolean(errors.fullName)}
                      />
                    )}
                  />
                  {errors.fullName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>
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
                    name='poste'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label={t('Poste') as string}
                        onChange={onChange}
                        placeholder={t('Please enter poste') as string}
                        error={Boolean(errors.poste)}
                      />
                    )}
                  />
                  {errors.poste && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.poste.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
             
            </Grid>
        </form>
      </DatePickerWrapper>
    )
  }
)

export default EditEmployee
