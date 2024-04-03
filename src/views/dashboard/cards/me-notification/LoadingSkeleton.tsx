// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Skeleton from '@mui/material/Skeleton'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Styled Timeline component
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

const MeNotificationLoadingSkeleton = () => {
  return (
    <Timeline sx={{ my: 0, py: 0 }}>
      {Array.from(Array(3).keys()).map(index => (
        <TimelineItem key={`me-notification-loading-skeleton-${index}`}>
          <TimelineSeparator>
            <TimelineDot color='primary' />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
            <Grid container spacing={4}>
              <Grid item xs={8}>
                <Skeleton variant='text' sx={{ width: '55%', fontSize: '1.25rem' }} />
              </Grid>
              <Grid item xs={4}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </Grid>
            </Grid>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default MeNotificationLoadingSkeleton
