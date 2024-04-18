// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Third-Party Imports
import format from 'date-fns/format'
import { convertFromRaw } from 'draft-js'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getNotificationAttributes } from 'src/utils'

// ** Type Imports
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import { NotificationType } from 'src/types/api/notificationTypes'

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

// ** Styled Avatar Component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 24,
  height: 24,
  fontSize: '1.125rem'
})

interface Props {
  notifications: NotificationType[]
}

const MeNotificationList = (props: Props) => {
  // ** Props
  const { notifications } = props

  // ** Hooks
  const router = useRouter()

  // ** Logics
  const handleClickNotification = (notificationId: number) => {
    router.push(`/notification/read/${notificationId}`)
  }

  return (
    <Timeline sx={{ my: 0, py: 0 }}>
      {notifications.map(notification => {
        const { icon, color } = getNotificationAttributes(notification.catalog)

        return (
          <TimelineItem key={`me-notification-list-${notification.id}`}>
            <TimelineSeparator>
              <TimelineDot color={color} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ width: '100%', mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>{notification.title}</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {format(new Date(notification.updatedAt), 'MM/dd')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ width: '65%', display: 'flex', alignItems: 'center' }}>
                  <Avatar skin='light' color={color} sx={{ mr: 2 }}>
                    <Icon icon={icon} fontSize={14} />
                  </Avatar>
                  <Typography variant='body2' noWrap>
                    {convertFromRaw(notification.content).getPlainText()}
                  </Typography>
                </Box>

                <Button size='small' variant='outlined' onClick={() => handleClickNotification(notification.id)}>
                  閱讀更多
                </Button>
              </Box>
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}

export default MeNotificationList
