// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'

// ** Custom Component Imports
import AvatarUploader from 'src/views/shared/avatar-uploader'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateMeOneMutation } from 'src/store/api/management/user'

// ** Util Imports
import { getMediaAssetFileAttributes, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'
import type { UserDataType } from 'src/types/authTypes'

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
  initMeUserEntity: UserDataType
}

const MeAccountAvatarPreviewBox = (props: Props) => {
  // ** Props
  const { initMeUserEntity } = props

  // ** Hooks
  const [updateMeUser, { data: updatedMeUser = initMeUserEntity, isLoading: isUpdateMeUserLoading }] =
    useUpdateMeOneMutation()

  //  ** Logics
  const handleUpdateAvatar = async (fileId: number | null = null) => {
    await updateMeUser({
      data: { avatar: fileId }
    })
  }

  if (isUpdateMeUserLoading) {
    return (
      <RootPreviewBox>
        <Skeleton variant='rounded' width='100%' height='100%' />
      </RootPreviewBox>
    )
  }

  if (updatedMeUser?.avatar) {
    const isImage = getMediaAssetFileAttributes(updatedMeUser.avatar).isImage

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
              alt={updatedMeUser.avatar.name}
              src={getPublicMediaAssetUrl(updatedMeUser.avatar.formats?.thumbnail?.url)}
            />
          </Box>
        ) : (
          <Icon icon='mdi:file' fontSize={40} />
        )}
        <Box sx={{ position: 'absolute', bottom: 20 }}>
          <Button variant='outlined' color='error' onClick={() => handleUpdateAvatar(null)}>
            移除頭像
          </Button>
        </Box>
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
        <ProfilePicture src='/images/avatars/1.png' alt={updatedMeUser.username} />
      </Box>
      <Box>
        <AvatarUploader handleFinish={handleUpdateAvatar} />
      </Box>
    </RootPreviewBox>
  )
}

export default MeAccountAvatarPreviewBox
