// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import EntrepriseViewPage from 'src/views/apps/entreprise/view/EntrepriseViewPage'
import { EntrepriseType } from 'src/types/apps/entrepriseTypes'

const EntrepriseView = ({ id, entrepriseData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <EntrepriseViewPage id={id} entrepriseData={entrepriseData} />
}

export const getStaticPaths: GetStaticPaths = async () => {
 const res = await axios.get('/apps/entreprises/list')
  const data: EntrepriseType[] = await res.data.allData
  const paths = data.map((item: EntrepriseType) => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const res = await axios.get('/apps/entreprises/entreprise',{
    params: {
      id: params?.id

  }
  })
  const entrepriseData: EntrepriseType = await res.data
  
  
  return {
    props: {
      entrepriseData,
      id: params?.id
    }
  }
}

export default EntrepriseView
