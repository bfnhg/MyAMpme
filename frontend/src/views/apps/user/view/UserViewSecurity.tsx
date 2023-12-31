// ** React Imports
import { ChangeEvent, MouseEvent, useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import {toast} from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { http } from 'src/global/http'
import { useTranslation } from 'react-i18next'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

interface DataType {
  device: string
  browser: string
  location: string
  recentActivity: string
}

const UserViewSecurity = ({email}) => {
  // ** States
  const [defaultValues, setDefaultValues] = useState<any>({ mobile: '+1(968) 819-2547' })
  const [mobileNumber, setMobileNumber] = useState<string>(defaultValues.mobile)
  const [openEditMobileNumber, setOpenEditMobileNumber] = useState<boolean>(false)
  const {t} = useTranslation()
  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })

   const schema = yup.object().shape({
    password: yup.string().required(t('Password is required') as string),
    confirmPassword: yup.string() .required(t("Confirm Password is required") as string)
      .min(4, t("Password length should be at least 4 characters") as string)
      .oneOf([yup.ref("password")], t("Passwords do not match") as string)
  })
  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Handle Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle edit mobile number dialog
  const handleEditMobileNumberClickOpen = () => setOpenEditMobileNumber(true)
  const handleEditMobileNumberClose = () => setOpenEditMobileNumber(false)

  // Handle button click inside the dialog
  const handleCancelClick = () => {
    setMobileNumber(defaultValues.mobile)
    handleEditMobileNumberClose()
  }
  const handleSubmitClick = () => {
    setDefaultValues({ ...defaultValues, mobile: mobileNumber })
    handleEditMobileNumberClose()
  }
  const onSubmit = (data: any) => {
    const newData = {
      newPassword: data.password,
      email: email
    }

    http.post('Users/ChangePassword', newData).then(res => {
      

      //@ts-ignore
      if (res.response && res.response.status === 400) {
        //@ts-ignore
        toast.error(res.response.data.$values[0].description)
      }
      if (res.status === 204) {
        toast.success(t('Password Changed Successfully') as string)
        reset({
          password: '',
          confirmPassword: ''
        })  
      }
      
    })
  }

  return (
    <Grid mt={6} container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Change Password' />
          <CardContent>
            <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
              <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                {t('Ensure that these requirements are met')}
              </AlertTitle>
              {t('Minimum 8 characters long, uppercase & symbol')}
            </Alert>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='small'>
                    <InputLabel htmlFor='user-view-security-new-password'>
                      {t('New Password')}
                    </InputLabel>
                    
                    <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <OutlinedInput
                      label={t('New Password')}
                      value={value}
                      id='user-view-security-new-password'
                      onChange={onChange}
                      type={values.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            aria-label='toggle password visibility'
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                )}
              />
              {errors.password && (

                // @ts-ignore
                <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
              )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='small'>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>
                      {t('Confirm New Password')}
                    </InputLabel>
                    
                     <Controller
                name='confirmPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <OutlinedInput
                      label= {t('Confirm New Password')}
                      value={value}
                      id='user-view-security-confirm-new-password'
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={onChange}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            <Icon icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                )}
              />
              {errors.confirmPassword && (

                // @ts-ignore
                <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmPassword.message}</FormHelperText>
              )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                   {t('Change Password')}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Two-step verification'
            titleTypographyProps={{ sx: { mb: 1 } }}
            subheader='Keep your account secure with authentication step.'
          />
          <CardContent>
            <Typography variant='body2' sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}>
              SMS
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'action.active' }}>{mobileNumber}</Typography>
              <div>
                <IconButton
                  aria-label='edit'
                  sx={{ color: 'text.secondary' }}
                  onClick={handleEditMobileNumberClickOpen}
                >
                  <Icon icon='mdi:edit-outline' fontSize='1.25rem' />
                </IconButton>
                <IconButton aria-label='delete' sx={{ color: 'text.secondary' }}>
                  <Icon icon='mdi:delete-outline' fontSize='1.25rem' />
                </IconButton>
              </div>
            </Box>

            <Divider sx={{ mt: '0 !important', mb: theme => `${theme.spacing(4)} !important` }} />

            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in.{' '}
              <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                Learn more
              </Link>
              .
            </Typography>
          </CardContent>

          <Dialog
            open={openEditMobileNumber}
            onClose={handleCancelClick}
            aria-labelledby='user-view-security-edit-mobile-number'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-security-edit-mobile-number-description'
          >
            <DialogTitle
              id='user-view-security-edit-mobile-number'
              sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}
            >
              Enable One Time Password
            </DialogTitle>

            <DialogContent>
              <Typography variant='h6'>Verify Your Mobile Number for SMS</Typography>
              <Typography variant='body2' sx={{ mt: 2, mb: 5 }}>
                Enter your mobile phone number with country code and we will send you a verification code.
              </Typography>
              <form onSubmit={e => e.preventDefault()}>
                <TextField
                  autoFocus
                  fullWidth
                  value={mobileNumber}
                  label='Mobile number with country code'
                  onChange={e => setMobileNumber(e.target.value)}
                />
                <Box sx={{ mt: 6.5, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type='reset' color='secondary' variant='outlined' onClick={handleCancelClick}>
                    Cancel
                  </Button>
                  <Button type='submit' sx={{ ml: 3 }} variant='contained' onClick={handleSubmitClick}>
                    Send
                  </Button>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Recent devices' />

          <Divider sx={{ m: '0 !important' }} />

          <TableContainer>
            <Table sx={{ minWidth: 500 }}>
              <TableHead
                sx={{ backgroundColor: theme => (theme.palette.mode === 'light' ? 'grey.50' : 'background.default') }}
              >
                <TableRow>
                  <TableCell>Browser</TableCell>
                  <TableCell>Device</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Recent Activity</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item: DataType, index: number) => (
                  <TableRow hover key={index} sx={{ '&:last-of-type td': { border: 0 } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img width='22' height='22' alt='Chrome' src='/images/logos/chrome.png' />
                        <Typography sx={{ ml: 2 }}>{item.browser}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.device}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.recentActivity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default UserViewSecurity
