// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import { styled } from '@mui/material/styles'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import {
  getFundCategoryProperties,
  getPublicMediaAssetUrl,
  getChainId,
  getBaseCurrencyAddress,
  getFundCurrencyProperties,
  getBaseCurrencyABI,
  getFormattedPriceUnit
} from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

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

  // ** Hooks
  const walletAccount = useAccount()

  const { data: payTokenBalance, isLoading: isPayTokenBalanceLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: getBaseCurrencyABI(initFundEntity.chain, initFundEntity.baseCurrency),
    address: getBaseCurrencyAddress(initFundEntity.chain, initFundEntity.baseCurrency),
    functionName: 'balanceOf',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected'
    }
  })

  // ** Vars
  const fundCategoryProperties = getFundCategoryProperties(initFundEntity.category)
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const currentBannerMediaAsset = initFundEntity.banner?.data?.id
    ? ({
        id: initFundEntity.banner.data.id,
        ...initFundEntity.banner.data.attributes
      } as MediaAssetType)
    : null

  const baseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  return (
    <Card>
      <CardMedia
        component='img'
        alt='banner'
        image={
          currentBannerMediaAsset
            ? getPublicMediaAssetUrl(currentBannerMediaAsset.formats?.thumbnail?.url)
            : '/images/pages/profile-banner.png'
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
            alignItems: 'flex-start',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 4, fontSize: '1.375rem' }}>
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
          </Box>
          <Stack direction='row' spacing={4} justifyContent='center'>
            <Stack alignItems='flex-end' justifyContent='center'>
              <Typography variant='caption' sx={{ color: 'text.secondary', fontWeight: 600 }}>
                My Total Position
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: 'text.secondary', fontWeight: 600 }}
              >{`(${baseCurrencyProperties.currency})`}</Typography>
            </Stack>
            {isPayTokenBalanceLoading ? (
              <Stack alignItems='center' justifyContent='center'>
                <Skeleton variant='text' width={100} height={40} />
              </Stack>
            ) : (
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <Typography variant='h5' sx={{ fontSize: '1.375rem' }}>
                  {`${fundBaseCurrencyProperties.symbol} ${payTokenBalance ? getFormattedPriceUnit(Number(payTokenBalance ?? 0) / 10 ** 18) : 0} ${fundBaseCurrencyProperties.currency}`}
                </Typography>
                <IconButton
                  component={Link}
                  href={`${walletAccount?.chain?.blockExplorers?.default.url}/address/${walletAccount.address}`}
                  target='_blank'
                >
                  <Icon icon='mdi:arrow-top-right-thin-circle-outline' fontSize={16} />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PublicFundLiveProfileHeaderCard
