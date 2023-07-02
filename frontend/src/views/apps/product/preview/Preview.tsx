
// ** React Imports
import { useState, useEffect, useContext } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'
import format from 'date-fns/format'


import AddPaymentDrawer from 'src/views/apps/invoice/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/apps/invoice/shared-drawer/SendInvoiceDrawer'
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import { classNames } from 'src/global/ClassNames'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

const formatDate = (date:Date) =>{
  const d = new Date(date)
  if(d.getFullYear() === 1) return 'N/A'

  return format(d, 'dd/MM/yyyy')
}


const Preview = ({data}) => {
  // ** State
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const ability = useContext(AbilityContext)
  const {t}=useTranslation()
  
  useEffect(() => {
    if (!data) {
      setError(true)
    }
  }, [data])


  if (data) {
    return (
      <>
        <Grid container spacing={6}>
          {
            ability.can('update', 'product')?<Grid item xl={9} md={8} xs={12}>
            <PreviewCard data={data} />
          </Grid>:
          <Grid item xl={12} md={12} xs={12}>
            <PreviewCard data={data} />
          </Grid>
          }
          {
            ability.can('update', 'product') && <Grid item xl={3} md={4} xs={12}>
            <PreviewActions
              id={data.id}
            />
          </Grid>
          }
        </Grid>
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            {t('Product does not exist. Please check the list of products')}:{' '}
            <Link href='/apps/invoice/list'>
              {t('Product List')}
            </Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid
         flex={1}
          justifyContent='center'
          alignItems='center' 
        item xs={12}>
          <CircularProgress disableShrink sx={{ mt: 6 }} />
        </Grid>
      </Grid>
    )
  }
}


export default Preview
