// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'

// ** Custom Component Imports
import MediaAssetSelector from 'src/views/shared/media-asset-selector'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/blog'

// ** Util Imports
import { getMediaAssetFileAttributes, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'
import type { BlogType } from 'src/types/api/blogTypes'
import type { MediaAssetType } from 'src/types/api/mediaAssetTypes'

// ** Styled Previews
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
  initBlogEntity: BlogType
}

const ManagementBlogEditBannerPreviewBox = (props: Props) => {
  // ** Props
  const { initBlogEntity } = props

  // ** Hooks
  const [updateBlog, { data: updatedBlog = initBlogEntity, isLoading: isUpdateBlogLoading }] = useUpdateOneMutation()

  // ** Vars
  const currentCoverMediaAsset = updatedBlog.cover?.data?.id
    ? ({
        id: updatedBlog.cover.data.id,
        ...updatedBlog.cover.data.attributes
      } as MediaAssetType)
    : null

  //  ** Logics
  const handleUpdateCover = async (fileId: number | null = null) => {
    await updateBlog({
      id: initBlogEntity.id,
      data: { cover: fileId }
    })
  }

  if (isUpdateBlogLoading) {
    return (
      <RootPreviewBox>
        <Skeleton variant='rounded' width='100%' height='100%' />
      </RootPreviewBox>
    )
  }

  if (currentCoverMediaAsset) {
    const isImage = getMediaAssetFileAttributes(currentCoverMediaAsset).isImage

    return (
      <RootPreviewBox>
        {isImage ? (
          <Box
            sx={{
              width: 320,
              height: 128,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ProfilePicture
              alt={currentCoverMediaAsset.name}
              src={getPublicMediaAssetUrl(currentCoverMediaAsset.formats?.thumbnail?.url)}
            />
          </Box>
        ) : (
          <Icon icon='mdi:file' fontSize={40} />
        )}
        <Box sx={{ position: 'absolute', bottom: 20 }}>
          <Button variant='outlined' color='error' onClick={() => handleUpdateCover(null)}>
            移除封面
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
        <Icon icon='mdi:image-plus' fontSize={64} />
      </Box>
      <Box>
        <MediaAssetSelector handleFinish={handleUpdateCover} />
      </Box>
    </RootPreviewBox>
  )
}

export default ManagementBlogEditBannerPreviewBox
