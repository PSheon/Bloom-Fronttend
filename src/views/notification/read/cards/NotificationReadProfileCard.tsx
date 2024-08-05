// ** MUI Imports
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import NotificationReadNotifierAvatarPreviewBox from 'src/views/notification/read/boxes/NotificationReadNotifierAvatarPreviewBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

const NotificationReadProfileCard = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <NotificationReadNotifierAvatarPreviewBox initNotificationEntity={initNotificationEntity} />
        <Typography variant='h6' component='p' sx={{ mt: 4, mb: 2 }}>
          {initNotificationEntity.title}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={initNotificationEntity.isSeen ? 'Seen' : 'Not Seen'}
          color={initNotificationEntity.isSeen ? 'success' : 'warning'}
          sx={{
            height: 20,
            fontWeight: 600,
            borderRadius: '5px',
            fontSize: '0.875rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { mt: -0.25 }
          }}
        />
      </CardContent>

      <CardContent sx={{ my: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
            <Icon icon='mdi:storage' />
          </CustomAvatar>
          <Box>
            <Typography variant='subtitle1' sx={{ lineHeight: 1.3 }}>
              {initNotificationEntity.category}
            </Typography>
            <Typography variant='body2'>Trigger</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
            <Icon icon='mdi:list-status' />
          </CustomAvatar>
          <Box>
            <Typography variant='subtitle1' sx={{ lineHeight: 1.3 }}>
              Succeed
            </Typography>
            <Typography variant='body2'>Status</Typography>
          </Box>
        </Box>
      </CardContent>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant='subtitle2'>Information</Typography>
        <Stack alignSelf='stretch'>
          <Divider />
        </Stack>
        <Stack spacing={2.7}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography variant='subtitle2' color='text.primary'>
              Title:
            </Typography>
            <Typography variant='body2' noWrap>
              {initNotificationEntity.title}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default NotificationReadProfileCard
