import Dialog from '@mui/material/Dialog'
import {toast} from 'react-hot-toast'
import FileUploaderRestrictions from 'src/views/forms/form-elements/file-uploader/FileUploaderRestrictions'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import process from 'process'
import { useDispatch } from 'react-redux'

// ** Types Imports
import {  AppDispatch } from 'src/store'

type Classe = "product" | "asset" | "employee"
type ImportXlsxProps = {
    show: boolean,
    setShow: (show: boolean) => void,
    classe: Classe,
    fetchData: any
}
const endpoints = {
    product: 'ImportProducts',
    asset: 'ImportActifss',
    employee: 'ImportEmployess'
}
const ImportXlsx = ({
    show,
    setShow,
    classe,
    fetchData
}:ImportXlsxProps) => {
const dispatch = useDispatch<AppDispatch>()
    const handleUpload = (file) => {
       //send file multipart/form-data
         //then close dialog    
         const formData = new FormData()
            formData.append('file', file)
            axios.post(process.env.NEXT_PUBLIC_SERVER_URL+endpoints[classe], formData).then((res) => {
                if (res.status === 200) {
                    toast.success(res.data)
                    if(fetchData) dispatch(fetchData({q: ''}))
                    setShow(false)
                } else {
                    toast.error(res.data)
                }
            }).catch((err) => {
                
                
                toast.error(err.response.data)
            })
            
            
    }

    return (
        <Dialog
            fullWidth
            open={show}
            maxWidth='lg'
            >
                <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
                    <IconButton size='small' onClick={()=>{setShow(false)}} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
                    <DropzoneWrapper>
                    <FileUploaderRestrictions
                    handleUpload={handleUpload}
                    />

                    </DropzoneWrapper>
                </DialogContent>
               

            </Dialog>
    )
}
export default ImportXlsx