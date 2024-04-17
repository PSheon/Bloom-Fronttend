// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Util Imports
import { getPublicMediaAssetUrl, getActivityLogActionAttributes } from 'src/utils'

// ** Type Imports
import { ActivityLogType } from 'src/types/api/activityLogTypes'

// ** Styled Timeline Component
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

interface Props {
  activityLogs: ActivityLogType[]
  handleOpenDialog: (activityLog: ActivityLogType) => void
}

const ActivityTimeLine = (props: Props) => {
  // ** Props
  const { activityLogs, handleOpenDialog } = props

  return (
    <Timeline sx={{ my: 0, py: 0 }}>
      {activityLogs.map(activityLog => {
        const { title, color } = getActivityLogActionAttributes(activityLog.action)

        return (
          <TimelineItem key={`request-sheet-edit-activity-${activityLog.id}`}>
            <TimelineSeparator>
              <TimelineDot color={color} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ width: '100%', mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
              <Stack spacing={4}>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    {format(new Date(activityLog.date), 'hh:mm MM/dd')}
                  </Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Stack direction='row' alignItems='center' spacing={4} flex='1'>
                    <Stack>
                      <Avatar
                        src={getPublicMediaAssetUrl(activityLog.user.data?.attributes.avatar?.data?.attributes.url)}
                        variant='rounded'
                        sx={{ width: 28, height: 28 }}
                      />
                    </Stack>
                    <Stack sx={{ maxWidth: '10ch' }}>
                      <Typography variant='body2' noWrap sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {activityLog.user.data?.attributes.username}
                      </Typography>
                      <Typography variant='caption' noWrap>
                        {activityLog.user.data?.attributes.email}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction='row' spacing={4} alignItems='center' justifyContent='flex-end' flex='1'>
                    <Button size='small' variant='outlined' onClick={() => handleOpenDialog(activityLog)}>
                      細節
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}

export default ActivityTimeLine
