// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'


import { ActifType } from 'src/types/apps/actifTypes'
import Preview from 'src/views/apps/actif/preview/Preview'
import { classNames } from 'src/global/ClassNames'

const ActifPreview = ({data}) => {
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
  const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + classNames.actif + `/${id}`).catch(err => {
    //return empty array if error
    return {
      data:null
    }
  })

  const data: ActifType  = await res.data
  
  if (!data) {
    return {
      notFound: true
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}

ActifPreview.acl={
  subject : 'actif',
  action : 'read'
}
export default ActifPreview
