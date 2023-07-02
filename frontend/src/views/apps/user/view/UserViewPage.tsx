// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useState } from 'react'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import { UsersType } from 'src/types/apps/userTypes'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'

type Props = {
  userData: UsersType
}

const UserView = ({userData }: Props) => {
  const [data, setData] = useState<any>(userData)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft  data={data} setData={setData}/>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight data={data} tab='overview'/>
      </Grid>
    </Grid>
  )
}

export default UserView
