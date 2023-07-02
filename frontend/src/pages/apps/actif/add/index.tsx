// ** React Imports
import { Grid } from '@mui/material'
import AddNewActif from 'src/views/apps/actif/add/AddNewActif'

const AjoutActif = () => {
  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <AddNewActif />
        </Grid>
      </Grid>
    </>
  )
}
AjoutActif.acl = {
  subject: 'actif',
  action: 'create',
}

export default AjoutActif
