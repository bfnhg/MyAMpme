// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { deleteProduct } from 'src/store/apps/product'
import { useRouter } from 'next/dist/client/router'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

interface Props {
  id: number | string
}

const PreviewActions = ({ id }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
const ability = useContext(AbilityContext)
  const handleClickOpen = () => setOpen(true)
  const { t} = useTranslation()
  const router = useRouter()
  const handleClose = (isDelete = false) => {
    setOpen(false)
    if (isDelete) {
      dispatch(deleteProduct(id))
      router.push('/apps/product/list')
    }
  }
  const dispatch = useDispatch<AppDispatch>()

  return (
    <>
      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
      >
        <DialogTitle id='alert-dialog-title'>
          {t('Are you sure You want to delete this item?')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
           {t('By clicking Agree, you will delete this item. This action cannot be undone.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button
            variant='outlined'
            onClick={() => {
              handleClose()
            }}
          >
            {t('Disagree')}
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              handleClose(true)
            }}
          >
            {t('Agree')}
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardContent>
          <Button
            fullWidth
            sx={{ mb: 3.5 }}
            variant='contained'
            startIcon={<Icon icon='mdi:plus' />}
            href={`/apps/product/add/`}
          >
            {t('Add')}
          </Button>

          <Button
            fullWidth
            sx={{ mb: 3.5 }}
            component={Link}
            color='secondary'
            variant='outlined'
            startIcon={<Icon icon='mdi:edit' />}
            href={`/apps/product/edit/${id}`}
          >
            {t('Edit')}
          </Button>
          {
            ability.can('delete', 'product') && <Button
            fullWidth
            color='error'
            variant='contained'
            onClick={handleClickOpen}
            startIcon={<Icon icon='mdi:trash' />}
          >
            {t('Delete')}
          </Button>
          }
        </CardContent>
      </Card>
    </>
  )
}

export default PreviewActions
