// ** React Imports
import { Ref, forwardRef, ReactElement, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import AddnewEmplacement from './addNewEmplacement'
import { EmplacementType } from 'src/types/apps/emplacementType'
import EditEmplacement from './editEmplacement'
import { useTranslation } from 'react-i18next'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

//props
interface AddEmplacementDialogProps {
    show:boolean,
    setShow:(value:boolean)=>void
    mode: 'add' | 'edit'
    emplacement?:EmplacementType

}

const AddEmplacementDialog = ({show,setShow,mode,emplacement}:AddEmplacementDialogProps) => {
 const formRef=useRef<any>(null)
 const {t} = useTranslation()
const handleSubmit = (event) => {
  event.preventDefault()
 if(formRef.current){
   formRef.current.submitForm()
 }
} 
const handleClose=()=>{
  setShow(false)
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
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
             {mode==='edit'?t('Edit Location'):t('Add New Location')}
            </Typography>
          </Box>
         {
              mode==='edit'?
              emplacement &&
                <EditEmplacement
                ref={formRef}
                callback = {()=>{setShow(false)}}
                emplacement={emplacement}
                />
                :
                <AddnewEmplacement
                ref={formRef}
                callback = {()=>{setShow(false)}}
                />
         }
         
          
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 1 }} onClick={handleSubmit}>
            {t('Submit')}
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default AddEmplacementDialog
