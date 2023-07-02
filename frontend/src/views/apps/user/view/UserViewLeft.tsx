// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'
import {toast} from 'react-hot-toast'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import FormHelperText from '@mui/material/FormHelperText'
import { http } from 'src/global/http'
import { useTranslation } from 'react-i18next'

interface ColorsType {
  [key: string]: ThemeColor
}



const roleColors: ColorsType = {
  admin: 'error',
  responsable: 'warning',
  membre: 'primary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const UserViewLeft = ({data,setData}:{data:UsersType,setData:any}) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const {t} = useTranslation()

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
const schema = yup.object().shape({
    fullName: yup.string().required(t('Full Name is required') as string),
    email: yup.string()
    .email(t('Email must be a valid email') as string)
    .required(t('Email is required') as string),
  })
  const getUserData = () => {
    http.get('Users/'+data.id).then((res)=>{setData(res.data)})
  }
  
 const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
 
  useEffect(() => {
    if (data) {
      setValue('fullName', data.fullName)
      setValue('email', data.email)
    }
  }, [data])

  const onSubmit = (newData: any) => {
    const dataToSend = {
      ...newData,
      userName:newData.email
    }
    http.put('Users/'+data.id,dataToSend).then((res)=>{
      //@ts-ignore
     
      if (res.status === 200) {
        toast.success(t('Updated Successfully') as string)
        getUserData()
        handleEditClose()
       
      }
    }).catch((err)=>{
       if (err.response && err.response.status === 400) {
       
        toast.error(err.response.data)
      }else{
        toast.error(t('Error Updating') as string)
      }
    })
  }



  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
             
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color="primary"
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
               />
              
              <Typography variant='h6' sx={{ mb: 4 }}>
                {`${data.fullName}`}
              </Typography>
             
             {/* <CustomChip
                skin='light'
                size='small'
                label={data.role}
                color={roleColors[data.role]}
                sx={{ textTransform: 'capitalize' }}
              /> */}
              
            </CardContent>

           

            <CardContent>
              <Typography variant='h6'>
                {t('User Information')}
              </Typography>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pb: 1 }}>
               
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t('Email')}:</Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{t('Status')}:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {data.active ? 'Active':'Inactive'}
                  </Typography>
                </Box>
               
              
                
               
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                {t('Edit')}
              </Button>
              {
                data.active? (
                  <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                {t('Deactivate')}
              </Button>
                ) : (
                 <Button color='success' variant='contained' onClick={() => setSuspendDialogOpen(true)}>
                {t('Activate')}
              </Button>
                )
              }
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                {t('Edit User Information')}
              </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>

              <DialogContent>
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  {t('Updating user details will receive a privacy audit.')}
                </DialogContentText>
                  <Grid container spacing={6}>
                   
                    <Grid item xs={12} sm={6}>
                       <FormControl >
                    <Controller
                      name='fullName'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        
                      <TextField fullWidth label={t('Full Name')} 
                      value={value}
                          onChange={onChange}
                          error={Boolean(errors.fullName)}
                      />

                      )}
                    />
                    {errors.fullName && (

                      //@ts-ignore
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>
                    )}
                  </FormControl>
                    </Grid>
                   
                    <Grid item xs={12} sm={6}>
                       <FormControl >
                    <Controller
                      name='email'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        
                      <TextField fullWidth label={t('Email')}
                      value={value}
                          onChange={onChange}
                          error={Boolean(errors.email)}
                      />

                      )}
                    />
                    {errors.email && (
                      
                      //@ts-ignore
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                    )}
                  </FormControl>
                    </Grid>
                  
                   
                    
                  </Grid>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button type="submit" variant='contained' sx={{ mr: 1 }} >
                  {t('Submit')}
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  {t('Cancel')}
                </Button>
              </DialogActions>
                </form>

            </Dialog>

            <UserSuspendDialog active={data.active} open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
          </Card>
        </Grid>

      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
