// ** React Imports
import { Grid, Icon } from '@mui/material'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import AddNewProduit from 'src/views/apps/product/add/AddNewProduit'
import { useContext, useRef, useState } from 'react'
import ImportXlsx from 'src/views/apps/product/import/importProduct'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

const AddProduit = () => {
  const [show, setShow] = useState(false)
 const formRef = useRef<any>(null)
const handleSubmit = (event:any) => {
  event.preventDefault()
 if(formRef.current){
   formRef.current.submitForm()
 }
} 
const { t}= useTranslation()
const ability = useContext(AbilityContext)

  return (
    <>
    <ImportXlsx
    show={show}
    setShow={setShow}
    classe='product'
    fetchData={null}
    />
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Card>
        {ability.can('import', 'product') ?<CardHeader title={t('Add New Product')}  titleTypographyProps={{ variant: 'h6' }}
        action={<Button 
          onClick={()=>setShow(true)}
          size='large' variant='contained' color='success'
        >
          {t('Import')}
        </Button>}
        />:<CardHeader title={t('Add New Product')} titleTypographyProps={{ variant: 'h6' }}
        />}
        <Divider sx={{ margin: 0 }} />
        
          <CardContent>
          <AddNewProduit
          ref={formRef}
          callback={()=>{
            return;
          }}
          />
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large'
            onClick={handleSubmit}
            sx={{ mr: 2 }} variant='contained'>
              {t('Save')}
            </Button>
            
          </CardActions>
      </Card>

        </Grid>
      </Grid>
    </>
  )
}
AddProduit.acl = {
  subject: 'product',
  action: 'create'
}

export default AddProduit
