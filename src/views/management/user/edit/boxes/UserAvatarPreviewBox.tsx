// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Utils Import
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Types
import { UserDataType } from 'src/context/types'

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
  initUserEntity: UserDataType
}

const UserAvatarPreviewBox = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  if (initUserEntity?.avatar) {
    return (
      <RootPreviewBox>
        <Box
          sx={{
            width: 128,
            height: 128,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img alt={initUserEntity.username} src={getPublicMediaAssetUrl(initUserEntity.avatar.url)} />
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ProfilePicture src='/images/avatars/1.png' alt={initUserEntity.username} />
      </Box>
    </RootPreviewBox>
  )
}

export default UserAvatarPreviewBox
