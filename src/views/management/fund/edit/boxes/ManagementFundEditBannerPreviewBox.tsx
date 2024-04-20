// ** MUI Imports
import { styled, darken } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'

// ** Custom Component Imports
import MediaAssetSelector from 'src/views/shared/media-asset-selector'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/fund'

// ** Util Imports
import { getMediaAssetFileAttributes, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'
import { MediaAssetType } from 'src/types/api/mediaAssetTypes'

// ** Styled Preview Box Component
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
const BannerPicture = styled('img')(({ theme }) => ({
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
  initFundEntity: FundType
}

const ManagementFundEditBannerPreviewBox = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const [updateFund, { data: updatedFund = initFundEntity, isLoading: isUpdateFundLoading }] = useUpdateOneMutation()

  // ** Vars
  const currentBannerMediaAsset = updatedFund.banner?.data?.id
    ? ({
        id: updatedFund.banner.data.id,
        ...updatedFund.banner.data.attributes
      } as MediaAssetType)
    : null

  //  ** Logics
  const handleUpdateBanner = async (fileId: number | null = null) => {
    await updateFund({
      id: initFundEntity.id,
      data: { banner: fileId }
    })
  }

  if (isUpdateFundLoading) {
    return (
      <RootPreviewBox>
        <Skeleton variant='rounded' width='100%' height='100%' />
      </RootPreviewBox>
    )
  }

  if (currentBannerMediaAsset) {
    const isImage = getMediaAssetFileAttributes(currentBannerMediaAsset).isImage

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
            <BannerPicture
              alt={currentBannerMediaAsset.name}
              src={getPublicMediaAssetUrl(currentBannerMediaAsset.formats?.thumbnail?.url)}
            />
          </Box>
        ) : (
          <Icon icon='mdi:file' fontSize={40} />
        )}
        <Box sx={{ position: 'absolute', bottom: 20 }}>
          <Button variant='outlined' color='error' onClick={() => handleUpdateBanner(null)}>
            移除橫幅
          </Button>
        </Box>
      </RootPreviewBox>
    )
  }

  return (
    <RootPreviewBox>
      <Box
        sx={{
          width: 320,
          height: 128,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <BannerPicture src='/images/pages/profile-banner.png' alt={updatedFund.displayName} />
      </Box>
      <Box>
        <MediaAssetSelector handleFinish={handleUpdateBanner} />
      </Box>
    </RootPreviewBox>
  )
}

export default ManagementFundEditBannerPreviewBox
