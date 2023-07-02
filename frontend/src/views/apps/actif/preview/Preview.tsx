
// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'


import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import { classNames } from 'src/global/ClassNames'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'



const Preview = ({data}) => {
  // ** State
  const [error, setError] = useState<boolean>(false)

 const ability = useContext(AbilityContext)
 const { t } = useTranslation()

  if (data) {
    return (
      <>
        <Grid container spacing={6}>
          {
            ability.can('update', 'actif')?<Grid item xl={9} md={8} xs={12}>
            <PreviewCard data={data} />
          </Grid>:
          <Grid item xl={12} md={12} xs={12}>
            <PreviewCard data={data} />
          </Grid>
          }
          {
            ability.can('update', 'actif') && <Grid item xl={3} md={4} xs={12}>
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
            {t('Asset does not exist. Please check the list of assets')}:{' '}
            <Link href='/apps/actif/list'>{t('Asset List')}</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default Preview
