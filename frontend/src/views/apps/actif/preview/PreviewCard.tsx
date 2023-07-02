// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'


import { ActifType } from 'src/types/apps/actifTypes'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import CustomChip from 'src/@core/components/mui/chip'
import format from 'date-fns/format'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ProductType } from 'src/types/apps/productType'
import { Etat, EtatColor } from 'src/types/apps/Etat'
import { GridToolbarExport } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'

interface Props {
  data: ActifType
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))


const etatColor ={
  'In Stock': 'primary',
  'In Order': 'warning',
  'In Maintenance': 'error',
  'In Use': 'success',
  'Retired': 'info',
  'Dispose': 'secondary'
}
type etatType = 'In Stock' | 'In Order' | 'In Maintenance' | 'In Use' | 'Retired' | 'Dispose'
type etatColorType = 'primary' | 'warning' | 'error' | 'success' | 'info' | 'secondary'

const getEtatColor = (etat:etatType) :etatColorType => {
  if (etatColor[etat ] != undefined){
    return etatColor[etat] as etatColorType
  }

  return 'info'
}
const PreviewCard = ({ data }: Props) => {
  // ** Hook
  // const formatDate = (date: any) => {
  //   return date.split('T')[0].split('-').reverse().join('/')
  // }
const {t}= useTranslation()

const formatDate = (date:Date) => {
  try {
    const d = format(new Date(date), 'dd/MM/yyyy') 
    if (d == '01/01/0001') {
      return 'N/A'
    }

    return d
  }catch(e){
    return 'N/A'
  }
}
  if (data) {
    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='h6' sx={{ fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}>
                    {t('Asset')} #{data.id}
                  </Typography>
                </Box>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Name')} :</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>{`${data.nom}`}</Typography>
                      </MUITableCell>
                    </TableRow>

                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Serial Number')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.numeroSerie}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table sx={{ maxWidth: '200px' }}>
                  <TableBody>
                    <TableRow>
                      
                      <MUITableCell>
                        {/* @ts-ignore */}
                        <CustomChip label={t(Etat[data.etat])} skin='light' color={EtatColor[data.etat]} />
                       
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', direction: 'column' }}>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Tag')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.etiquette??'N/A'}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Assigned To')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.assignedTo.id!=0? data.assignedTo.fullName : 'N/A'}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Assigned At')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {formatDate(data.assignedAt)}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', direction: 'column' }}>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Function')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.fonction??'N/A'}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', direction: 'column' }}>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Support Group')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.groupe??'N/A'}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Supplier')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.fournisseur.id!=0? data.fournisseur.name : 'N/A'}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Location')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.emplacement.id!=0 ? data.emplacement.nomEmp : 'N/A'}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', direction: 'column' }}>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Created By')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.user? data.user.fullName:'N/A'}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Created At')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {formatDate(data.createdAt)}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        <CardContent>
          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', direction: 'column' }}>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Next Maintenance')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {formatDate(data.prochaineMaintenance)}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Usage Time')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.heureUtilisation} h
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', direction: 'column' }}>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Maintenance Done at')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {formatDate(data.prochaineMaintenance)}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
          <Accordion>
            <AccordionSummary
              id='panel-header-1'
              aria-controls='panel-content-1'
              expandIcon={<Icon icon='mdi:chevron-down' />}
            >
              <Typography variant='h6'>{t('Product Info')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', direction: 'column' }}>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Model Name')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.produit.nomModele}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Manufacturer')} :</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.produit.manufacturier}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Model Number')} :</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.produit.numeroModele}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('MTBF')} :</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.produit.mtbf??'N/A'}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', direction: 'column' }}>
                <Table sx={{ maxWidth: '400px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Cost')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {data.produit.coutAcquisition} $
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('Warranty period')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {`${data.produit.periodeGarantie} mois`}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('End of Life')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {formatDate(data.produit.finVie)}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body1'>{t('End of Support')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {formatDate(data.produit.finSupport)}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
            </AccordionDetails>
          </Accordion>

      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
