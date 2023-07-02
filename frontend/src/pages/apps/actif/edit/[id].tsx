// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'


// ** Demo Components Imports
import Edit from 'src/views/apps/actif/edit/Edit'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { ActifType } from 'src/types/apps/actifTypes'
import { classNames } from 'src/global/ClassNames'

const ActifEdit = ({ data }) => {
  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Edit data={data} />
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
  const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + classNames.actif + `/${id}`).catch(err => {
    //return empty array if error
    return {
      data:null
    }
  })

  const data: ActifType  = await res.data
  console.log(data)
  
  if (!data) {
    return {
      notFound: true
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}

ActifEdit.acl={
  subject : 'actif',
  action : 'update'
}

export default ActifEdit
