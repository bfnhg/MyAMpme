// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'
import { UsersType } from 'src/types/apps/userTypes'
import { http } from 'src/global/http'

const UserView = ({data}) => {
  return <UserViewPage  userData={data} />
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
  const res = await http.get(`Users/${id}`).catch(err => {
    
    
    //return empty array if error
    return {
      data:null
    }
  })

  const data: UsersType  = await res.data
  
  if (!data) {
    return {
      notFound: true
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}
export default UserView
