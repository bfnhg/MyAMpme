// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'


// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import EditCard from './EditCard'
import { classNames } from 'src/global/ClassNames'
import { useTranslation } from 'react-i18next'

const ActifEdit = ({data}) => {
  // ** State
  const [error, setError] = useState<boolean>(false)

  const {t} = useTranslation()

  if (data) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item  xs={12}>
            <EditCard data={data} />
          </Grid>
         
        </Grid>
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            {t('Asset does not exist. Please check the list of assets')}:{' '}
            <Link href='/apps/actif/list'>{t('Assets List')}</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default ActifEdit
