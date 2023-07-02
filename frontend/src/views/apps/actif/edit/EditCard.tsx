// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled,alpha } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'


import { ActifType } from 'src/types/apps/actifTypes'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ProductType } from 'src/types/apps/productType'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import { fetchData as fetchEmployees} from 'src/store/apps/employee'
import { fetchData as fetchEmplacements } from 'src/store/apps/emplacement'
import { fetchData as fetchFournisseurs } from 'src/store/apps/fournisseur'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import AddEmployeeDialog from '../../employee/add/addEmployeeDialog'
import AddEmplacementDialog from '../../emplacement/add/addEmplacementDialog'
import { EmployeeType } from 'src/types/apps/employeeType'
import AddFournisseurDialog from '../../fournisseur/add/addFournisseurDialog'
import { FournisseurType } from 'src/types/apps/fournisseurType'
import { EmplacementType } from 'src/types/apps/emplacementType'
import { Etat } from 'src/types/apps/Etat'
import { classNames } from 'src/global/ClassNames'
import { http } from 'src/global/http'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'


interface Props {
  data: ActifType
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))


const etatColor ={
  'In Stock': 'primary',
  'In Order': 'warning',
  'In Maintenance': 'error',
  'In Use': 'success',
  'Retired': 'info',
  'Dispose': 'secondary'
}
type etatType = 'In Stock' | 'In Order' | 'In Maintenance' | 'In Use' | 'Retired' | 'Dispose'
type etatColorType = 'primary' | 'warning' | 'error' | 'success' | 'info' | 'secondary'

const getEtatColor = (etat:etatType) :etatColorType => {
  if (etatColor[etat ] != undefined){
    return etatColor[etat] as etatColorType
  }

  return 'info'
}

  const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
    color: theme.palette.success.main,
    backgroundColor: 'transparent !important',
    '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
  }))


const EditCard = ({ data }: Props) => {
  // ** Hook
  const [tagDisabled, setTagDisabled] = useState(false)
 const formatDate = (date:Date) => {
  try {
    //check if date is not 01/01/0001
    const d = new Date(date)
    if (d.getFullYear() == 1){
      return undefined
    }

    return d

  }catch(e){
    
    
    return undefined
  }
}
const formatDateToString = (date:Date) => {
  try {
    //check if date is not 01/01/0001
    const d = new Date(date)
    if (d.getFullYear() == 1){
      return 'N/A'
    }

    return format(d, 'yyyy-MM-dd')

  }catch(e){

    return 'N/A'
  }
}
   const schema = yup.object().shape({
    nom: yup.string().required('Name is required'),
    numeroSerie: yup.string().required('Serial Number is required'),
    etat: yup.number().required('state is required'),
    etiquette: yup.string(),
    assignedTo: yup.string(),
    fonction: yup.string(),
    groupe: yup.string(),
    fournisseur: yup.string(),
    emplacement: yup.string(),
    ownedBy: yup.string(),
    managedBy: yup.string(),
    prochaineMaintenance: yup.date(),
    heureUtilisation: yup.number(),
    maintenanceEffectueLe: yup.date(),
    numBonCommande: yup.string(),
  })
  const defaultValues:{
    nom:string,
    numeroSerie:string,
    etat:number,
    etiquette:string,
    assignedTo:string|number,
    managedBy:string | number,
    ownedBy:string | number,
    fonction:string | number,
    groupe:string,
    fournisseur:string | number,
    emplacement:string | number,
    prochaineMaintenance:any,
    heureUtilisation:number,
    maintenanceEffectueLe:any,
    numBonCommande:string,
  } = {
    nom:'',
    numeroSerie:'',
    etat:Etat['In Order'],
    etiquette:'',
    assignedTo:'',
    managedBy:'',
    ownedBy:'',
    fonction:'',
    groupe:'',
    fournisseur:'',
    emplacement:'',
    prochaineMaintenance:null,
    heureUtilisation:0,
    maintenanceEffectueLe:null,
    numBonCommande:''
  }
const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  useEffect(()=>{
    if(data){
      setValue('nom',data.nom)
    setValue('numeroSerie',data.numeroSerie)
    setValue('etat',data.etat)
    setValue('etiquette',data.etiquette)
    setValue('assignedTo',data.assignedTo!=null && data.assignedTo.id!=0? data.assignedTo.id:'')
    setValue('managedBy',data.managedBy!=null && data.managedBy.id!=0? data.managedBy.id:'')
    setValue('ownedBy',data.ownedBy!=null && data.ownedBy.id!=0? data.ownedBy.id:'')
    setValue('fonction',data.fonction)
    setValue('groupe',data.groupe)
    setValue('fournisseur',data.fournisseur!=null && data.fournisseur.id!=0? data.fournisseur.id:'')
    setValue('emplacement',data.emplacement!=null && data.emplacement.id!=0? data.emplacement.id:'')
    setValue('prochaineMaintenance',data.prochaineMaintenance?formatDate(data.prochaineMaintenance):undefined)
    setValue('heureUtilisation',data.heureUtilisation)
    setValue('maintenanceEffectueLe',data.maintenanceEffectueLe? formatDate(data.maintenanceEffectueLe):undefined)
    setValue('numBonCommande',data.numBonCommande)
    if(data.etiquette) 
      setTagDisabled(true)
    
    }

  },[data,setValue])

    const handleToast = (promise : Promise<ProductType>) => {
  

    return toast.promise(promise, {
      loading: t('Loading') as string,
      success: (data) => {
        reloadData()

        return t('Updated Successfully') as string
      },
      error: t('Error') as string
    })
  }
  const reloadData = () => {
    http.get(`Actifs/${data.id}`).then((response) => {
      const data = response.data
       setValue('nom',data.nom)
    setValue('numeroSerie',data.numeroSerie)
    setValue('etat',data.etat)
    setValue('etiquette',data.etiquette)
    setValue('assignedTo',data.assignedTo!=null && data.assignedTo.id!=0? data.assignedTo.id:'')
    setValue('managedBy',data.managedBy!=null && data.managedBy.id!=0? data.managedBy.id:'')
    setValue('ownedBy',data.ownedBy!=null && data.ownedBy.id!=0? data.ownedBy.id:'')
    setValue('fonction',data.fonction)
    setValue('groupe',data.groupe)
    setValue('fournisseur',data.fournisseur!=null && data.fournisseur.id!=0? data.fournisseur.id:'')
    setValue('emplacement',data.emplacement!=null && data.emplacement.id!=0? data.emplacement.id:'')
    setValue('prochaineMaintenance',data.prochaineMaintenance?formatDate(data.prochaineMaintenance):undefined)
    setValue('heureUtilisation',data.heureUtilisation)
    setValue('maintenanceEffectueLe',data.maintenanceEffectueLe? formatDate(data.maintenanceEffectueLe):undefined)
    setValue('numBonCommande',data.numBonCommande)
    if(data.etiquette) 
      setTagDisabled(true)
    })
  }

  const onSubmit = (submittedData: any) => {
    
    const dataToSend = {
      id : data.id,
      numeroSerie:submittedData.numeroSerie,
      nom:submittedData.nom,
      etat:submittedData.etat,
      etiquette:submittedData.etiquette!=''? submittedData.etiquette:null,
      assignedToId: submittedData.assignedTo!=''? parseInt(submittedData.assignedTo):null,
      managedById: submittedData.managedBy!=''? parseInt(submittedData.managedBy):null,
      ownedById: submittedData.ownedBy!=''? parseInt(submittedData.ownedBy):null,
      fonction: submittedData.fonction!=''? submittedData.fonction:null,
      groupe: submittedData.groupe!=''? submittedData.groupe:null,
      fournisseurId: submittedData.fournisseur!=''? parseInt(submittedData.fournisseur):null,
      emplacementId: submittedData.emplacement!=''? parseInt(submittedData.emplacement):null,
      numBonCommande: submittedData.numBonCommande!=''? submittedData.numBonCommande:null,



    }
      handleToast(http.put(process.env.NEXT_PUBLIC_SERVER_URL + classNames.actif+`/${data.id}`, dataToSend))
     
    
  }

  const dispatch = useDispatch<AppDispatch>()

   const employeeStore = useSelector((state: RootState) => state.employee)
  const emplacementStore = useSelector((state: RootState) => state.emplacement)
  const fournisseurStore = useSelector((state: RootState) => state.fournisseur)

    useEffect(() => {
    dispatch(fetchEmployees({q:''}))
    dispatch(fetchEmplacements({q:''}))
    dispatch(fetchFournisseurs({q:''}))
    
  }, [dispatch])

  const [employeeDialogShow, setEmployeeDialogShow] = useState(false)
  const [emplacementDialogShow, setEmplacementDialogShow] = useState(false)
  const [fournisseurDialogShow, setFournisseurDialogShow] = useState(false)
  const { t} = useTranslation()
  const handleEmployeeAdd = ()=>{
    setEmployeeDialogShow(true)

  }
  const handleEmplacementAdd = ()=>{
    setEmplacementDialogShow(true)

  }
  const handleFournisseurAdd = ()=>{
    setFournisseurDialogShow(true)

  }

  if (data) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
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
      <AddFournisseurDialog
      mode='add'
      show={fournisseurDialogShow}
      setShow={setFournisseurDialogShow}
      />
       <CardContent>
          <Grid container>
            <Grid item xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h6' sx={{ fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}>
                    {t('Asset')} #{data.id}
                  </Typography>
                </Box>
                </Grid>
            <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'400px' }}>
                  <Typography variant='body1'>{t('Model Name')} :</Typography>
                  
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={data.produit.nomModele}
                        />
                     
                </Box>
            
      <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'400px' }}>
                  <Typography variant='body1'>{t('Manufacturer')} :</Typography>
                  
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={data.produit.manufacturier}
                        />
                     
                </Box>
 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'400px' }}>
                  <Typography variant='body1'>{t('Model Number')} :</Typography>
                  
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={data.produit.numeroModele}
                        />
                     
                </Box>
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'400px' }}>
                  <Typography variant='body1'>{t('MTBF')} :</Typography>
                  
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={data.produit.mtbf??'N/A'}
                        />
                     
                </Box>


              </Box>

            </Grid>
            <Grid item sm={6} xs={12}>
              
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'480px' }}>
                  <Typography variant='body1'>{t('Cost')} :</Typography>
                  
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={data.produit.coutAcquisition}
                        />
                     
                </Box>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'480px' }}>
                  <Typography variant='body1'>{t('Warranty Period')} :</Typography>
                  
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={data.produit.periodeGarantie}
                        />
                     
                </Box>
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'480px' }}>
                  <Typography variant='body1'>{t('End of Support')} :</Typography>
                  
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={formatDateToString(data.produit.finSupport)}
                        />
                     
                </Box>
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'480px' }}>
                  <Typography variant='body1'>{t('End of Life')} :</Typography>
                  
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={formatDateToString(data.produit.finVie)}
                        />
                     
                </Box>
                </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        <CardContent>
          <Grid container>
          
            <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'400px' }}>
                  <Typography variant='body1'>{t('Name')} :</Typography>
                  <FormControl >
                    <Controller
                      name='nom'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                        InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.nom)}
                        />
                      )}
                    />
                    {errors.nom && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.nom.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'400px' }}>
                  <Typography variant='body1'>{t('Serial Number')} :</Typography>
                  <FormControl >
                    <Controller
                      name='numeroSerie'
                     
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                        InputProps={{
                        disabled: true
                      }}
                        size='small'
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.numeroSerie)}
                        />
                      )}
                    />
                    {errors.numeroSerie && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.numeroSerie.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'400px' }}>
                  <Typography variant='body1'>{t('Tag')} :</Typography>
                  <FormControl >
                    <Controller
                      name='etiquette'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                         InputProps={{
                          disabled: tagDisabled
                        }}
                        size='small'
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.etiquette)}
                        />
                      )}
                    />
                    {errors.etiquette && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.etiquette.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box> 
     
              </Box>

            </Grid>
            <Grid item sm={6} xs={12}>
              
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-around', alignItems: 'center', maxWidth:'300px' }}>
                  <Typography variant='body1'>{t('State')} :</Typography>
                  <FormControl 
                  sx={{width:'200px'}}
                  >
                    <Controller
                      name='etat'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select value={value}  onChange={onChange} error={Boolean(errors.etat)}>
                      
                      {
                      (Object.keys(Etat) as Array<keyof typeof Etat>).filter(
                        (el)=>isNaN(Number(el))
                      ).map((key,i) => 
                      <MenuItem key={i} value={Etat[key]}>{t(key)}</MenuItem>)
                      }
                    </Select>
                      )}
                    />
                    {errors.etat && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.etat.message}</FormHelperText>
                    )}
                  </FormControl>
                
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Order Number')} :</Typography>
                  <FormControl >
                    <Controller
                      name='numBonCommande'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                        
                        size='small'
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.numBonCommande)}
                        />
                      )}
                    />
                    {errors.numBonCommande && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.numBonCommande.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box> 
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Assigned to')} :</Typography>
                  <FormControl
                  sx={{
                    width: '55%',
                  }}
                  >
                    <Controller
                      name='assignedTo'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                        value={value}
                        size='small'
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
                      )}
                    />
                    {errors.assignedTo && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.assignedTo.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Managed by')}:</Typography>
                  <FormControl
                  sx={{
                    width: '55%',
                  }}
                  >
                    <Controller
                      name='managedBy'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                        value={value}
                        size='small'
                        onChange={onChange}
                        error={Boolean(errors.managedBy)}
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
                      )}
                    />
                    {errors.managedBy && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.managedBy.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Support Group')} :</Typography>
                  <FormControl
                  sx={{
                    width: '55%',
                  }}
                  >
                    <Controller
                      name='groupe'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                         <TextField
                        size='small'
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.groupe)}
                        />
                      )}
                    />
                    {errors.groupe && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.groupe.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Function')} :</Typography>
                  <FormControl >
                    <Controller
                      name='fonction'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                        size='small'
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.fonction)}
                        />
                      )}
                    />
                    {errors.fonction && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.fonction.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Supplier')} :</Typography>
                  <FormControl 
                  sx={{
                    width: '55%',
                  }}
                  >
                    <Controller
                      name='fournisseur'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                        value={value}
                        size='small'
                        onChange={onChange}
                        error={Boolean(errors.fournisseur)}
                      >
                        <CustomSelectItem value='' onClick={handleFournisseurAdd}>
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}
                          >
                            <Icon icon='mdi:plus' fontSize={20} />
                            {t('Add New Supplier')}
                          </Box>
                        </CustomSelectItem>
                         <MenuItem value=''>
                          <Typography
                            variant='subtitle2'
                            fontWeight={800}
                            >{t('None')}</Typography>
                        </MenuItem>
                        {
                          fournisseurStore.data.map((fournisseur : FournisseurType) => (
                            <MenuItem key={fournisseur.id} value={fournisseur.id}>
                              {fournisseur.name}
                            </MenuItem>
                          ))
                        }
                      </Select>
                      )}
                    />
                    {errors.fournisseur && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.fournisseur.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                  <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Owned By')} :</Typography>
                  <FormControl
                  sx={{
                    width: '55%',
                  }}
                  >
                    <Controller
                      name='ownedBy'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                        value={value}
                        size='small'
                        onChange={onChange}
                        error={Boolean(errors.ownedBy)}
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
                      )}
                    />
                    {errors.ownedBy && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.ownedBy.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Location')} :</Typography>
                  <FormControl sx={{
                    width: '55%',
                  }}>
                    <Controller
                      name='emplacement'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                        value={value}
                        size='small'
                        
                        onChange={onChange}
                        error={Boolean(errors.emplacement)}
                      >
                        <CustomSelectItem value='' onClick={handleEmplacementAdd}>
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
                      )}
                    />
                    {errors.emplacement && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.emplacement.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

       

        <Divider />
        <CardContent>
          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Next Maintenance')} :</Typography>
                  <FormControl >
                    <Controller
                      name='prochaineMaintenance'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                         disabled
                        showYearDropdown
                        showMonthDropdown
                        selected={value}
                        id='prochaineMaintenance'
                        placeholderText='MM-DD-YYYY'
                        onChange={onChange}
                        customInput={<CustomInput size='small' fullWidth error={Boolean(errors.prochaineMaintenance)} />}
                      />
                      )}
                    />
                    {errors.prochaineMaintenance && errors.prochaineMaintenance.message &&(
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.prochaineMaintenance.message as string}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'460px' }}>
                  <Typography variant='body1'>{t('Usage Time')} :</Typography>
                  <FormControl >
                    <Controller
                      name='heureUtilisation'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                         InputProps={{
                          disabled: true
                        }}
                        size='small'
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.heureUtilisation)}
                        />
                      )}
                    />
                    {errors.heureUtilisation && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.heureUtilisation.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                 <Box sx={{ mb: 4, display: 'flex',justifyContent:'space-between', alignItems: 'center', maxWidth:'480px' }}>
                  <Typography variant='body1'>{t('Maintenance Done At')} :</Typography>
                  <FormControl >
                    <Controller
                      name='maintenanceEffectueLe'
                      
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                        
                        showYearDropdown
                        showMonthDropdown
                        selected={value}
                        id='maintenanceEffectueLe'
                        placeholderText='MM-DD-YYYY'
                        onChange={onChange}
                        customInput={<CustomInput size='small' fullWidth error={Boolean(errors.maintenanceEffectueLe)} />}
                      />
                      )}
                    />
                    {errors.maintenanceEffectueLe && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.maintenanceEffectueLe.message as string}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                
               
              </Box>
            </Grid>
          </Grid>
        </CardContent>
       
          <Divider/>
          <CardActions>
              <Button 
              size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                {t('Edit')}
              </Button>
            </CardActions>

      </Card>
    </form>
    )
  } else {
    return null
  }
}

export default EditCard
