// ** React Imports
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import toast from 'react-hot-toast'
import 'cleave.js/dist/addons/cleave-phone.us'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from 'src/views/forms/picker/CustomInput'
import { useTheme } from '@mui/material/styles'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { addEmplacement, fetchData, updateEmplacement } from 'src/store/apps/emplacement'
import {  fetchData as fetchEmployee } from 'src/store/apps/employee'
import { EmplacementType } from 'src/types/apps/emplacementType'
import { styled, alpha } from '@mui/material/styles'
import MenuItem,{ MenuItemProps } from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import Select from '@mui/material/Select'
import { EmployeeType } from 'src/types/apps/employeeType'
import Box from '@mui/material/Box/Box'
import Icon from 'src/@core/components/icon'
import InputLabel from '@mui/material/InputLabel'
import AddEmployeeDialog from '../../employee/add/addEmployeeDialog'
import { http } from 'src/global/http'
import { classNames } from 'src/global/ClassNames'
import { useTranslation } from 'react-i18next'

const EditEmplacement = forwardRef(
  ({ callback, emplacement }: { callback: () => void | null; emplacement: EmplacementType }, ref) => {
    const theme = useTheme()
  const {t} = useTranslation()

    const { direction } = theme
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

    const dispatch: AppDispatch = useDispatch()

     interface Emplacement {
    nomEmp: string
    employeId: string

    
  }

 const schema = yup.object().shape({
    nomEmp : yup.string().required(t('Name is required') as string),
    employeId: yup.string().required(t('Responsable is required') as string)
  })
  const defaultValues = {
    nomEmp: '',
    employeId: '',
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
      if (emplacement) {
        
        reset({
          nomEmp: emplacement.nomEmp,
          employeId: emplacement.employe?.id.toString(),
        })
      }
    }, [emplacement, reset])
    const onSubmit = (data: Emplacement) => {
     http.put(classNames.emplacements+`/${emplacement.id}`, {
      Id: emplacement.id,
      nomEmp: data.nomEmp,
      employeId: parseInt(data.employeId),
     }).then(res => {
      if (callback) callback()
      toast.success(t('Updated Successfully') as string)
      reset()
      dispatch(fetchData({q: ''}))
    }).catch(err => {
      toast.error(t('Error Updating') as string)
    })
      
    }
    useImperativeHandle(ref, () => ({
      submitForm() {
        //@ts-ignore
        handleSubmit(onSubmit)()
      }
    }))
      const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
}))

  const [employeeDialogShow, setEmployeeDialogShow] = useState(false)


  const handleEmployeeAdd = ()=>{
    setEmployeeDialogShow(true)

  }
  const employeeStore = useSelector((state: RootState) => state.employee)

   useEffect(() => {
    dispatch(
      fetchEmployee({
        q: ''
      })
    )
  }, [dispatch])


    return (
      <DatePickerWrapper>
        <AddEmployeeDialog
      mode='add'
      show={employeeDialogShow}
      setShow={setEmployeeDialogShow}
      />
        <form>
          <Grid container spacing={7}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='nomEmp'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label={t('Name') as string}
                        onChange={onChange}
                        placeholder={t('Please enter name') as string}
                        error={Boolean(errors.nomEmp)}
                      />
                    )}
                  />
                  {errors.nomEmp && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.nomEmp.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='employeId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                        <>
                      <InputLabel id='demo-simple-select-helper-label'>
                        {t('Responsable') as string}
                      </InputLabel>
                      <Select
                        value={value}
                        label='Assigned to'
                        labelId='demo-simple-select-helper-label'
                        onChange={onChange}
                        error={Boolean(errors.employeId)}
                      >
                        <CustomSelectItem value='' onClick={handleEmployeeAdd}>
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}
                          >
                            <Icon icon='mdi:plus' fontSize={20} />
                            {t('Add New Employee')}
                          </Box>
                        </CustomSelectItem>
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
                  {errors.employeId && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.employeId.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            
             
            </Grid>
        </form>
      </DatePickerWrapper>
    )
  }
)

export default EditEmplacement
