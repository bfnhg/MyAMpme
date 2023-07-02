// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ActifUsersType } from 'src/types/apps/actifTypes'

interface Props {
  open: boolean
  toggle: () => void
  users: ActifUsersType[] | undefined
  setUsers: (val: ActifUsersType[]) => void
  setSelectedUer: (val: ActifUsersType) => void
}

interface FormData {
  nom: string
  prenom: string
  email: string
  role: string
  groupe: string
  carteAccess: string
  telephone: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  nom: yup.string().required(),
  prenom: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().required(),
  carteAccess: yup.string().required(),
  groupe: yup.string().required(),
  telephone: yup.string().min(10).max(10).required()
})

const AddNewUser = ({ open, toggle, setSelectedUer, users, setUsers }: Props) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { nom: '', prenom: '', email: '', groupe: '', carteAccess: '', role: 'Membre', telephone: '' }
  })

  const onSubmit = (data: FormData) => {
    const { carteAccess, groupe, telephone, role, email, nom, prenom } = data
    const finalData = {
      nom,
      prenom,
      telephone,
      role,
      groupe,
      carteAccess,
      email
    }
    if (users !== undefined) {
      setUsers([...users, finalData])
    }
    setSelectedUer(finalData)

    toggle()
    reset({ nom: '', prenom: '', email: '', groupe: '', carteAccess: '', role: 'Membre', telephone: '' })
  }

  const handleDrawerClose = () => {
    toggle()
    reset({ nom: '', prenom: '', email: '', groupe: '', carteAccess: '', role: 'Membre', telephone: '' })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleDrawerClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
    >
      <Header>
        <Typography variant='h6'>Ajouter nouveau Utilisateur</Typography>
        <IconButton size='small' onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box component='form' sx={{ p: 5 }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='nom'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField label='Nom' value={value} variant='outlined' onChange={onChange} error={Boolean(errors.nom)} />
            )}
          />
          {errors.nom && (
            <FormHelperText sx={{ color: 'error.main' }} id='actif-nom-error'>
              {errors.nom.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='prenom'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                label='Prenom'
                value={value}
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.prenom)}
              />
            )}
          />
          {errors.prenom && (
            <FormHelperText sx={{ color: 'error.main' }} id='actif-prenom-error'>
              {errors.prenom.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='groupe'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='Groupe'
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.groupe)}
              />
            )}
          />
          {errors.groupe && (
            <FormHelperText sx={{ color: 'error.main' }} id='actif-groupe-error'>
              {errors.groupe.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                type='email'
                label='Email'
                value={value}
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.email)}
              />
            )}
          />
          {errors.email && (
            <FormHelperText sx={{ color: 'error.main' }} id='actif-email-error'>
              {errors.email.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='carteAccess'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                label='carteAccess'
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.carteAccess)}
                placeholder='GRP97lwZM2KonYmF'
              />
            )}
          />
          {errors.carteAccess && (
            <FormHelperText sx={{ color: 'error.main' }} id='actif-carteAccess-error'>
              {errors.carteAccess.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <InputLabel id='actif-role'>Role</InputLabel>

          <Controller
            name='role'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Select label='role' value={value} onChange={onChange} labelId='actif-role' error={Boolean(errors.role)}>
                <MenuItem value='Responsabble'>Responsabble</MenuItem>
                <MenuItem value='Membre'>Membre</MenuItem>
              </Select>
            )}
          />
          {errors.role && (
            <FormHelperText sx={{ color: 'error.main' }} id='actif-role-error'>
              {errors.role.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='telephone'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                type='number'
                value={value}
                variant='outlined'
                onChange={onChange}
                label='numéro de Téléphone'
                placeholder='+212658142766'
                error={Boolean(errors.telephone)}
              />
            )}
          />
          {errors.telephone && (
            <FormHelperText sx={{ color: 'error.main' }} id='actif-telephone-error'>
              {errors.telephone.message}
            </FormHelperText>
          )}
        </FormControl>
        <div>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Ajouter
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={handleDrawerClose}>
            Annuler
          </Button>
        </div>
      </Box>
    </Drawer>
  )
}

export default AddNewUser
