// ** React Imports
import { useContext, useState} from 'react'

import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import SearchOrAddProduct from './SearchOrAddProduct'
import ActifRepeater from './ActifRepeater'
import { toast } from 'react-hot-toast'
import { ActifType } from 'src/types/apps/actifTypes'
import axios from 'axios'
import { Button } from '@mui/material'
import ImportXlsx from '../../product/import/importProduct'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

const AddNewActif = () => {


  const [show, setShow] = useState(false)
  
  const [selectedProduct, setSelectedProduct] = useState<number | string>("")
  const ability = useContext(AbilityContext)
  const {t} = useTranslation()
  const handleToast = async (actifArray:ActifType[]) => {
    
    const promise = axios.post('/apps/actif/add-actifs', {
      data: {
        actifArray,
        productId: selectedProduct
      }
    })
    

    return toast.promise(promise, {
      
      //@ts-ignore
      loading: t('Loading'),
      
      //@ts-ignore
      success: t('Added Successfully'),

      //@ts-ignore
      error: t('Error Adding')
    })
  }

  return (
    <>
    <ImportXlsx
    fetchData={null}
    show={show}
    setShow={setShow}
    classe='asset'
    />
      <Card>
        {
          ability.can('import', 'actif') ?<CardHeader title={t('Select a Product')} titleTypographyProps={{ variant: 'h6' }} 
        action={<Button 
          onClick={()=>setShow(true)}
          size='large' variant='contained' color='success'
        >{t('Import')}</Button>}
        />:<CardHeader title={t('Select a Product')} titleTypographyProps={{ variant: 'h6' }} 
        
        />
        }
        <Divider sx={{ margin: 0 }} />

        <CardContent>
          
          <SearchOrAddProduct 
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </CardContent>
      </Card>
      <ActifRepeater
      disabled={selectedProduct === ""}
      selectedProduct={selectedProduct}
      handleToast={handleToast}
      />
    
    </>
  )
}

export default AddNewActif
