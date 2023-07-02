// ** React Imports
import { Ref, forwardRef, ReactElement, useRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
import { TextField } from '@mui/material'
import { RoleType } from 'src/types/apps/roleTypes'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from 'src/store'
import { fetchData as fetchRoles } from 'src/store/apps/role'
import PasswordStrengthBar from 'react-password-strength-bar'
import { http } from 'src/global/http'
import { toast } from 'react-hot-toast'
import { fetchData } from 'src/store/apps/user'
import Translations from 'src/layouts/components/Translations'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const AddUserDialog = ({ show, setShow }) => {
  const handleClose = () => {
    setShow(false)
  }

  const dispatch = useDispatch<AppDispatch>()
  const roleStore = useSelector((state: RootState) => state.role)

  useEffect(() => {
    dispatch(fetchRoles({ q: '' }))
  }, [dispatch])

  const schema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().email('Email must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required')
  })
  const [password, setPassword] = useState('')
  const defaultValues = {
    fullName: '',
    email: '',
    password: '',
    role: 'Membre'
  }
  const {
    reset,
    control,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const submit = data => {
    const newData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      roles: [data.role]
    }
    http
      .post('Users', newData)
      .then(res => {
        //@ts-ignore
        if (res.response && res.response.status === 400) {
          //@ts-ignore
          toast.error(res.response.data.$values[0].description)

          return
        }
        

        if (res.status === 200) {
          toast.success('User added successfully')
          dispatch(fetchData({ q: '', currentPlan: '', role: '', status: '' }))
          handleClose()
        }
      })
      
  }

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='lg'
      scroll='body'
      onClose={handleClose}
      onBackdropClick={handleClose}
      TransitionComponent={Transition}
    >
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Add New User
            </Typography>
          </Box>
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
                      label='Full Name'
                      onChange={onChange}
                      placeholder='Please enter model name'
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
                      label='Email'
                      onChange={onChange}
                      placeholder='Please enter model name'
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Password'
                      onChange={e => {
                        onChange(e)
                        setPassword(e.target.value)
                      }}
                      placeholder='Please enter a password'
                      error={Boolean(errors.password)}
                    />
                  )}
                />
                <PasswordStrengthBar password={password} />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {roleStore.data && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='role'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <InputLabel id='demo-simple-select-helper-label'>Role</InputLabel>
                        <Select
                          value={value}
                          label='Role'
                          labelId='demo-simple-select-helper-label'
                          onChange={onChange}
                          error={Boolean(errors.role)}
                        >
                          {roleStore.data.map((role: RoleType) => (
                            <MenuItem key={role.id} value={role.name}>
                              <Translations text={role.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  {errors.role && <FormHelperText sx={{ color: 'error.main' }}>{errors.role.message}</FormHelperText>}
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button type='submit' variant='contained' sx={{ mr: 1 }}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddUserDialog
