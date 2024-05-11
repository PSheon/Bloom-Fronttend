// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getMediaAssetFileAttributes, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'
import type { MediaAssetType } from 'src/types/mediaAssetTypes'
import type { NotificationType } from 'src/types/notificationTypes'

// ** Styled Preview Box
const RootPreviewBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: theme.spacing(2),
  height: theme.spacing(64),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  background: darken(theme.palette.background.paper, 0.1),
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
}))

const ProfilePicture = styled('img')(({ theme }) => ({
  margin: theme.spacing(4),
  width: 96,
  height: 96,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.background.paper}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface Props {
  initNotificationEntity: NotificationType
}

const ManagementNotificationEditNotifierAvatarPreviewBox = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  // ** Vars
  const notifier = {
    id: initNotificationEntity.notifier.data?.id,
    ...initNotificationEntity.notifier.data?.attributes,
    avatar: {
      id: initNotificationEntity.notifier.data?.attributes.avatar.data?.id,
      ...initNotificationEntity.notifier.data?.attributes.avatar.data?.attributes
    } as MediaAssetType
  }

  if (notifier?.avatar) {
    const isImage = getMediaAssetFileAttributes(notifier.avatar).isImage

    return (
      <RootPreviewBox>
        {isImage ? (
          <Box
            sx={{
              width: 128,
              height: 128,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ProfilePicture
              alt={notifier.avatar.name}
              src={getPublicMediaAssetUrl(notifier.avatar.formats?.thumbnail?.url)}
            />
          </Box>
        ) : (
          <Icon icon='mdi:user-outline' fontSize={40} />
        )}
      </RootPreviewBox>
    )
  }

  return (
    <RootPreviewBox>
      <Box
        sx={{
          width: 128,
          height: 128,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ProfilePicture src='/images/avatars/1.png' alt={notifier.username} />
      </Box>
    </RootPreviewBox>
  )
}

export default ManagementNotificationEditNotifierAvatarPreviewBox
