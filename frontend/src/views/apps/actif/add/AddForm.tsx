// ** React Imports
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Button, CardActions, Typography } from '@mui/material'
import SearchProductSelect from './SearchProductSelect'
import Box from '@mui/material/Box/Box'
import Icon from 'src/@core/components/icon'
import { styled, alpha } from '@mui/material/styles'
import { MenuItemProps } from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData as fetchEmployees} from 'src/store/apps/employee'
import { fetchData as fetchEmplacements } from 'src/store/apps/emplacement'
import { AppDispatch, RootState } from 'src/store'
import { EmployeeType } from 'src/types/apps/employeeType'
import AddEmployeeDialog from '../../employee/add/addEmployeeDialog'
import AddEmplacementDialog from '../../emplacement/add/addEmplacementDialog'
import { EmplacementType } from 'src/types/apps/emplacementType'
import { Etat } from 'src/types/apps/Etat'
import axios from 'axios'
import { classNames } from 'src/global/ClassNames'
import { http } from 'src/global/http'
import { date } from 'yup/lib/locale'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

interface AddFormProps {
  count: number
  setActifCount: (func: any) => void
  setActifArray: (func : any) => void
  selectedProduct: number|string
  removeFromRefArray: (ref: any) => void
}
const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
}))
const AddForm = forwardRef((props: AddFormProps, ref) => {
  const [deleted , setDeleted] = useState(false)
 
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (deleted) return
      handleSubmit(onSubmit)()
    }
  }))
  const {t } = useTranslation()

  const schema = yup.object().shape({
    etiquette: yup.string(),
    etat: yup.number(),
    numeroSerie: yup.string().required('Veuillez saisir le numero de serie'),
    fonction: yup.string(),
    assignedTo: yup.string(),
    emplacement: yup.string(),
    groupe: yup.string(),
    gerePar: yup.string(),
    proprietede: yup.string(),
    numBonCommande: yup.string(),
    dateAchat: yup.date().nullable(),
  })
  const defaultValues = {
   etiquette: '',
    etat: Etat['In Order'],
    numeroSerie: '',
    fonction: '',
    assignedTo: '',
    emplacement: '',
    fournisseur: '',
    groupe: '',
    gerePar: '',
    proprietede: '',
    numBonCommande: '',
    dateAchat: null
  }
  const {
    reset,
    control, 
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const deleteFormRef = useRef(null)

  const onSubmit = (data: any) => {
    
    
    const dataToSubmit = {
      produitId: props.selectedProduct,
      etiquette: data.etiquette!==''?data.etiquette:null,
      etat: data.etat,
      numeroSerie: data.numeroSerie,
      fonction: data.fonction!==''?data.fonction:null,
      groupe: data.groupe!==''?data.groupe:null,
      assignedToId: data.assignedTo!==''?parseInt(data.assignedTo):null,
      managedById: data.gerePar!==''?parseInt(data.gerePar):null,
      ownedById: data.proprietede!==''?parseInt(data.proprietede):null,
      emplacementId: data.emplacement!==''?parseInt(data.emplacement):null,
      numBonCommande: data.numBonCommande!==''?data.numBonCommande:null,
      dateAchat: data.dateAchat!==null?data.dateAchat:null
      
    }
    http.post(process.env.NEXT_PUBLIC_SERVER_URL+classNames.actif, dataToSubmit).then(res=>{
      //delete the form
      //@ts-ignore
      if(res.status===201) {
      //@ts-ignore
        if(deleteFormRef.current!==undefined && deleteFormRef.current!=null) deleteFormRef.current.click()

        toast.success(`Asset #${props.count} : created successfully`)
      }

     
    }).catch(err=>{
      if(err.response && err.response.status===409) {
        toast.error(`Asset #${props.count} : `+err.response.data.message)
      }else{
        toast.error(`Asset #${props.count} : internal server error`)
      }
      
    }
    )

    
  }
  const deleteForm = (e: any) => {
    e.preventDefault()
    props.setActifCount(prevCount => prevCount - 1)
    
    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()

    setDeleted(true)
  }

 // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const employeeStore = useSelector((state: RootState) => state.employee)
  const emplacementStore = useSelector((state: RootState) => state.emplacement)

    useEffect(() => {
    dispatch(fetchEmployees({q:''}))
    dispatch(fetchEmplacements({q:''}))
    
  }, [dispatch])

  const [employeeDialogShow, setEmployeeDialogShow] = useState(false)
  const [emplacementDialogShow, setEmplacementDialogShow] = useState(false)

  const handleEmployeeAdd = ()=>{
    setEmployeeDialogShow(true)

  }
  const handleEmplacementAdd = ()=>{
    setEmplacementDialogShow(true)

  }

  return (
    <DatePickerWrapper>
      <AddEmployeeDialog
      mode='add'
      show={employeeDialogShow}
      setShow={setEmployeeDialogShow}
      />
      <AddEmplacementDialog
      mode='add'
      show={emplacementDialogShow}
      setShow={setEmplacementDialogShow}
      />
      <Card>
        <CardHeader
          action={
            <Button ref={deleteFormRef} variant='contained' color='error' onClick={deleteForm}>
              Remove
            </Button>
          }
          title={`Asset #${props.count}`}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <Divider sx={{ margin: 0 }} />
        
        <CardContent>
          <Grid container spacing={7}>
          
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='numeroSerie'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label={t('Serial Number')}
                      onChange={onChange}
                      placeholder={t('Please enter the serial number')}
                      error={Boolean(errors.numeroSerie)}
                    />
                  )}
                />
                {errors.numeroSerie && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.numeroSerie.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='etiquette'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label={t('Tag')}
                      onChange={onChange}
                      placeholder={t('Please enter the tag')}
                      error={Boolean(errors.etiquette)}
                    />
                  )}
                />
                {errors.etiquette && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.etiquette.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='etat'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                    <InputLabel id='demo-simple-select-helper-label'>{t('State')}</InputLabel>
                    <Select value={value} label='State' labelId='demo-simple-select-helper-label' onChange={onChange} error={Boolean(errors.etat)}>
                      
                      {
                      (Object.keys(Etat) as Array<keyof typeof Etat>).filter(
                        (el)=>isNaN(Number(el))
                      ).map((key,i) => 
                      <MenuItem key={i} value={Etat[key]}>{t(key)}</MenuItem>)
                      }
                    </Select>
                    </>
                    
                  )}
                />
                {errors.etat && <FormHelperText sx={{ color: 'error.main' }}>{errors.etat.message}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='fonction'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label={t('Function')}
                      onChange={onChange}
                      placeholder={t('Please enter the function')}
                      error={Boolean(errors.fonction)}
                    />
                  )}
                />
                {errors.fonction && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.fonction.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
 
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='numBonCommande'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label={t('Order Number')}
                      onChange={onChange}
                      placeholder={t('Please enter the order number')}
                      error={Boolean(errors.fonction)}
                    />
                  )}
                />
                {errors.numBonCommande && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.numBonCommande.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
        <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='assignedTo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <InputLabel id='demo-simple-select-helper-label'>{t('Assigned to')}</InputLabel>
                      <Select
                        value={value}
                        label='Assigned to'
                        labelId='demo-simple-select-helper-label'
                        onChange={onChange}
                        error={Boolean(errors.assignedTo)}
                      >
                        <CustomSelectItem value='' onClick={handleEmployeeAdd}>
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}
                          >
                            <Icon icon='mdi:plus' fontSize={20} />
                            {t('Add New Employee')}
                          </Box>
                        </CustomSelectItem>
                        <MenuItem value=''>
                          <Typography
                            variant='subtitle2'
                            fontWeight={800}
                            >{t('None')}</Typography>
                        </MenuItem>
                        {employeeStore.data.map((employee : EmployeeType) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.fullName}
                          </MenuItem>
                        )
                        )}
                      </Select>
                    </>
                  )}
                />
                {errors.assignedTo && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.assignedTo.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='gerePar'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <InputLabel id='demo-simple-select-helper-label'>
                        {t('Managed By')}
                      </InputLabel>
                      <Select
                        value={value}
                        label='Managed By'
                        labelId='demo-simple-select-helper-label'
                        onChange={onChange}
                        error={Boolean(errors.gerePar)}
                      >
                        <CustomSelectItem value='' onClick={handleEmployeeAdd}>
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}
                          >
                            <Icon icon='mdi:plus' fontSize={20} />
                           {t('Add New Employee')}
                          </Box>

                        </CustomSelectItem>
                        <MenuItem value=''>
                          <Typography
                            variant='subtitle2'
                            fontWeight={800}
                            >{t('None')}</Typography>
                        </MenuItem>
                        {employeeStore.data.map((employee : EmployeeType) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.fullName}
                          </MenuItem>
                        )
                        )}
                      </Select>
                    </>
                  )}
                />
                {errors.gerePar && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.gerePar.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='proprietede'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <InputLabel id='demo-simple-select-helper-label'>
                        {t('Owned By')}
                      </InputLabel>
                      <Select
                        value={value}
                        label='Owned By'
                        labelId='demo-simple-select-helper-label'
                        onChange={onChange}
                        error={Boolean(errors.proprietede)}
                      >
                        <CustomSelectItem value='' 
                        onClick={handleEmployeeAdd}
                        >
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}
                          >
                            <Icon icon='mdi:plus' fontSize={20} />
                            {t('Add New Employee')}
                          </Box>
                        </CustomSelectItem>
                        <MenuItem value=''>
                          <Typography
                            variant='subtitle2'
                            fontWeight={800}
                            >{t('None')}</Typography>
                        </MenuItem>
                       {employeeStore.data.map((employee : EmployeeType) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.fullName}
                          </MenuItem>
                        )
                        )}
                      </Select>
                    </>
                  )}
                />
                {errors.proprietede && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.proprietede.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
             <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='emplacement'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <InputLabel id='demo-simple-select-helper-label'>
                        {t('Location')}
                      </InputLabel>
                      <Select
                        value={value}
                        label='Location'
                        labelId='demo-simple-select-helper-label'
                        onChange={onChange}
                        error={Boolean(errors.emplacement)}
                      >
                        <CustomSelectItem value='' onClick={handleEmplacementAdd} 
                        >
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}
                          >
                            <Icon icon='mdi:plus' fontSize={20} />
                            {t('Add New Location')}
                          </Box>
                        </CustomSelectItem>
                        <MenuItem value=''>
                          <Typography
                            variant='subtitle2'
                            fontWeight={800}
                            >{t('None')}</Typography>
                        </MenuItem>
                        {
                          emplacementStore.data.map((emplacement : EmplacementType) => (
                            <MenuItem key={emplacement.id} value={emplacement.id}>
                              {emplacement.nomEmp}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </>
                  )}
                />
                {errors.emplacement && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.emplacement.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='groupe'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                   <TextField
                      value={value}
                      label={t('Support Group')}
                      onChange={onChange}
                      placeholder={t('Please enter support group')}
                      error={Boolean(errors.groupe)}
                    />
                  )}
                />
                {errors.groupe && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.groupe.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
             <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='dateAchat'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    showYearDropdown
                    showMonthDropdown
                    selected={value}
                    id='dateAchat'
                    placeholderText='MM-DD-YYYY'
                    onChange={onChange}
                    customInput={<CustomInput fullWidth error={Boolean(errors.dateAchat)} label={t('Purchase date')} />}
                  />
                )}
              />

              {errors.dateAchat && <FormHelperText sx={{ color: 'error.main' }}>{errors.dateAchat.message}</FormHelperText>}
            </FormControl>
          </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
        
        </CardActions>
      </Card>
    </DatePickerWrapper>
  )
})
export default AddForm