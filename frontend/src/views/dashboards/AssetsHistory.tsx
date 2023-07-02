// ** MUI Import
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import Link from 'next/link'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
const AssetsHistory = () => {
  return (
    <Card>
      <CardHeader
        title='Assets History'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent>
        <Timeline sx={{ my: 0, py: 0 }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='error' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pr: 0, mt: 0, mb: theme => `${theme.spacing(1.5)} !important` }}>
              <Box
                sx={{
                  mb: 2.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                   State Changed{' '}
                   <StyledLink href={`#`}>{`#2561`}</StyledLink>
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Wednesday
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src='/images/avatars/1.png' sx={{ mr: 2.5, width: 24, height: 24 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Yvon Day</Typography>
              </Box>
              <Typography mt={2} variant='body2'> {' '}has changed State from 
             <strong> In Use</strong> to <strong>In Maintenance</strong>.</Typography>
              
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pr: 0, mt: 0, mb: theme => `${theme.spacing(1.5)} !important` }}>
              <Box
                sx={{
                  mb: 2.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                  Assigned to Changed{' '}<StyledLink href={`#`}>{`#31`}</StyledLink>
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  April, 18
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src='/images/avatars/1.png' sx={{ mr: 2.5, width: 24, height: 24 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Yvon Day</Typography>
              </Box>
              <Typography mt={2} variant='body2' sx={{ mb: 2 }}>
                Has assigned this asset to{' '}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src='/images/avatars/1.png' sx={{ mr: 2.5, width: 24, height: 24 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Bencharef Omar </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='error' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pr: 0, mt: 0, mb: theme => `${theme.spacing(1.5)} !important` }}>
              <Box
                sx={{
                  mb: 2.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                   State Changed{' '}
                   <StyledLink href={`#`}>{`#1255`}</StyledLink>
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  February, 12
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src='/images/avatars/1.png' sx={{ mr: 2.5, width: 24, height: 24 }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>John Doe</Typography>
              </Box>
              <Typography mt={2} variant='body2'> {' '}has changed State from 
             <strong> In Stock</strong> to <strong>Dispose</strong>.</Typography>
              
            </TimelineContent>
          </TimelineItem>

         
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default AssetsHistory
