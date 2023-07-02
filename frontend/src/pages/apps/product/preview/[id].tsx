// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'


import { ProductType } from 'src/types/apps/productType'
import Preview from 'src/views/apps/product/preview/Preview'
import { classNames } from 'src/global/ClassNames'
import { useRouter } from 'next/router'

const ProduitPreview = ({data}) => {

  return <Preview data={data} />
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

ProduitPreview.acl = {
  subject : 'product',
  action : 'read'
}
export default ProduitPreview
