// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import { EntrepriseType } from 'src/types/apps/entrepriseTypes'

// ** Demo Components Imports
import EntrepriseViewLeft from 'src/views/apps/entreprise/view/EntrepriseViewLeft'
import EntrepriseViewRight from 'src/views/apps/entreprise/view/EntrepriseViewRight'

type Props = {
  id: string|number
  entrepriseData: EntrepriseType
}

const EntrepriseView = ({ id, entrepriseData }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <EntrepriseViewLeft  data={entrepriseData}/>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <EntrepriseViewRight tab='overview'/>
      </Grid>
    </Grid>
  )
}

export default EntrepriseView
