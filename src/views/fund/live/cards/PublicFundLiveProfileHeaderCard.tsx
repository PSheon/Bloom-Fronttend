// ** MUI Components
import { styled } from '@mui/material/styles'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFundCategoryProperties, getPublicMediaAssetUrl, getFundCurrencyProperties } from 'src/utils'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'
import type { MediaAssetType } from 'src/types/mediaAssetTypes'

const FundAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveProfileHeaderCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Vars
  const fundCategoryProperties = getFundCategoryProperties(initFundEntity.category)
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const currentBannerMediaAsset = initFundEntity.banner?.data?.id
    ? ({
        id: initFundEntity.banner.data.id,
        ...initFundEntity.banner.data.attributes
      } as MediaAssetType)
    : null

  return (
    <Card>
      <CardMedia
        component='img'
        alt='banner'
        image={
          currentBannerMediaAsset
            ? getPublicMediaAssetUrl(currentBannerMediaAsset.formats?.thumbnail?.url)
            : '/images/pages/profile-banner.webp'
        }
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <FundAvatarGroup className='pull-up'>
          <Tooltip title={fundBaseCurrencyProperties.displayName}>
            <CustomAvatar
              src={fundBaseCurrencyProperties.imageUrl}
              alt={fundBaseCurrencyProperties.displayName}
              sx={{
                height: 120,
                width: 120,
                borderWidth: '5px !important',
                backgroundColor: theme => theme.palette.background.default
              }}
            />
          </Tooltip>
          <Tooltip title='RWA'>
            <CustomAvatar
              src='/images/funds/rwa.png'
              alt='rwa'
              sx={{
                height: 120,
                width: 120,
                borderWidth: '5px !important',
                backgroundColor: theme => theme.palette.background.default
              }}
            />
          </Tooltip>
        </FundAvatarGroup>
        <Stack
          direction='row'
          flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
          alignItems='flex-start'
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          sx={{ width: '100%', ml: { xs: 0, md: 6 } }}
        >
          <Stack
            spacing={4}
            alignSelf='flex-end'
            alignItems={{
              xs: 'center',
              sm: 'flex-start'
            }}
            sx={{ mb: { xs: 6, sm: 0 } }}
          >
            <Typography variant='h5' textAlign={{ xs: 'center', sm: 'left' }} sx={{ fontSize: '1.375rem' }}>
              {initFundEntity.displayName}
            </Typography>
            <Stack direction='row' spacing={4} flexWrap='wrap' justifyContent={['center', 'flex-start']}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='center'
                sx={{ '& svg': { color: 'text.secondary' } }}
              >
                <Icon icon='mdi:map-marker-outline' />
                <Typography color='text.secondary' sx={{ fontWeight: 600 }}>
                  {initFundEntity.chain}
                </Typography>
              </Stack>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='center'
                sx={{ '& svg': { color: 'text.secondary' } }}
              >
                <Icon icon='mdi:category-plus-outline' />
                <Typography color='text.secondary' sx={{ fontWeight: 600 }}>
                  {fundCategoryProperties.displayName}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            {initFundEntity.twitterUrl && (
              <Button color='info' variant='contained' sx={{ p: 1.5, minWidth: 38 }}>
                <Icon icon='mdi:twitter' fontSize={20} />
              </Button>
            )}
            {initFundEntity.discordUrl && (
              <Button color='primary' variant='contained' sx={{ p: 1.5, minWidth: 38 }}>
                <Icon icon='ic:outline-discord' fontSize={20} />
              </Button>
            )}
            <Button color='primary' variant='outlined' sx={{ p: 1.5, minWidth: 38 }}>
              <Icon icon='mdi:share-variant-outline' fontSize={20} />
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PublicFundLiveProfileHeaderCard
