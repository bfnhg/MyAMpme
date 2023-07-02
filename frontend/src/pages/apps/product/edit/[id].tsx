// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'   

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { ProductType } from 'src/types/apps/productType'
import EditProduct from 'src/views/apps/product/edit/EditProduct'
import { classNames } from 'src/global/ClassNames'

const ProductEdit = ({data}) => {
  return (
 
     <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <EditProduct data={data} />
    </DatePickerWrapper>
  )
}

export async function getServerSideProps(context) {
  //get id from query
  const id = context.params?.id as string
  
  if (!id) {
    return {
      notFound: true
    }
  }

  // Fetch data from external API
  const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + classNames.product + `/${id}`).catch(err => {
    //return empty array if error
    return {
      data:null
    }
  })

  const data: ProductType  = await res.data
  
  if (!data) {
    return {
      notFound: true
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}

ProductEdit.acl={
  subject : 'product',
  action : 'update'
}

export default ProductEdit
