import Grid from '@mui/material/Grid/Grid'

import Icon from 'src/@core/components/icon'
import Button from '@mui/material/Button'
import SearchProductSelect from './SearchProductSelect'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { fetchData } from 'src/store/apps/product'
import AddProductDialog from './AddProductDialog'
import { useTranslation } from 'react-i18next'

const SearchOrAddProduct = ({ selectedProduct, setSelectedProduct }) => {
  const [query, setQuery] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.product)
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(
      fetchData({
        q: query
      })
    )
  }, [dispatch, query])

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={6}>
        <SearchProductSelect
          data={store.data}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setQuery={setQuery}
        />
        <AddProductDialog show={show} setShow={setShow} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          sx={{ height: '100%' }}
          onClick={() => setShow(true)}
          variant='contained'
          endIcon={<Icon icon='mdi:plus' />}
        >
          {t('Add Product')}
        </Button>
      </Grid>
    </Grid>
  )
}
export default SearchOrAddProduct
