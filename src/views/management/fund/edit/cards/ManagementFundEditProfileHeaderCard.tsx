// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import AvatarGroup from '@mui/material/AvatarGroup'

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

const ManagementFundEditProfileHeaderCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Vars
  const fundCategoryProperties = getFundCategoryProperties(initFundEntity.category)

  const data = {
    fullName: 'John Doe',
    location: 'Vatican City',
    joiningDate: 'April 2021',
    designation: 'UX Designer',
    profileImg: '/images/avatars/1.png',
    designationIcon: 'mdi:fountain-pen-tip',
    coverImg: '/images/pages/profile-banner.png'
  }

  const currentBannerMediaAsset = initFundEntity.banner?.data?.id
    ? ({
        id: initFundEntity.banner.data.id,
        ...initFundEntity.banner.data.attributes
      } as MediaAssetType)
    : null

  const baseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  return data !== null ? (
    <Card>
      <CardMedia
        component='img'
        alt='banner'
        image={
          currentBannerMediaAsset
            ? getPublicMediaAssetUrl(currentBannerMediaAsset.formats?.thumbnail?.url)
            : data.coverImg
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
          <Tooltip title={baseCurrencyProperties.displayName}>
            <CustomAvatar
              src={baseCurrencyProperties.imageUrl}
              alt={baseCurrencyProperties.displayName}
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
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 4, fontSize: '1.375rem' }}>
              {initFundEntity.displayName}
            </Typography>
            <Stack direction='row' spacing={4} flexWrap='wrap' justifyContent={['center', 'flex-start']}>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:map-marker-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{initFundEntity.chain}</Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:category-plus-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {fundCategoryProperties.displayName}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Button
            component={Link}
            href={`/management/fund/preview/${initFundEntity.id}/overview`}
            variant='contained'
            startIcon={<Icon icon='mdi:print-preview' fontSize={20} />}
          >
            Preview
          </Button>
        </Box>
      </CardContent>
    </Card>
  ) : null
}

export default ManagementFundEditProfileHeaderCard
