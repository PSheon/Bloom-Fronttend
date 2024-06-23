// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import PublicFundListLoadingSkeletonCard from 'src/views/fund/list/cards/PublicFundListLoadingSkeletonCard'

// ** Util Imports
import { getFundCurrencyProperties, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

interface Props {
  funds: FundType[]
  totalRows: number
  isFundListLoading: boolean
}

const PublicFundListDataGrid = (props: Props) => {
  // ** Props
  const { funds, totalRows, isFundListLoading } = props

  // ** Hooks
  const router = useRouter()

  // ** Logics
  const handleRedirectToFund = (fundId: number) => {
    router.push(`/fund/live/${fundId}/overview`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          By the community, for the community
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          {isFundListLoading ? (
            [...Array(6).keys()].map(index => (
              <Grid key={`fund-skeleton-${index}`} item xs={12} md={6}>
                <PublicFundListLoadingSkeletonCard />
              </Grid>
            ))
          ) : totalRows === 0 ? (
            <Grid item xs={12}>
              <Typography variant='h5' textAlign='center' sx={{ my: 12, fontSize: '1.5rem !important' }}>
                We are launching soon 🚀
              </Typography>
            </Grid>
          ) : (
            funds.map(fund => {
              const baseCurrencyProperties = getFundCurrencyProperties(fund.baseCurrency)

              return (
                <Grid key={`fund-${fund.id}`} item xs={12} sm={6} md={4}>
                  <Card
                    onClick={() => handleRedirectToFund(fund.id)}
                    sx={{
                      position: 'relative',
                      border: '1px transparent solid',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      '&:hover': {
                        borderColor: theme => theme.palette.primary.main
                      }
                    }}
                  >
                    <CardMedia
                      component='img'
                      alt='banner'
                      image={
                        fund?.banner?.data
                          ? getPublicMediaAssetUrl(fund.banner.data.attributes.url)
                          : '/images/pages/profile-banner.png'
                      }
                      sx={{
                        height: { xs: 120, md: 160 }
                      }}
                    />
                    <AvatarGroup
                      className='pull-up'
                      sx={{
                        position: 'absolute',
                        top: theme => ({
                          xs: theme.spacing(20),
                          md: theme.spacing(28)
                        }),
                        left: theme => theme.spacing(4)
                      }}
                    >
                      <Tooltip title={baseCurrencyProperties.displayName}>
                        <CustomAvatar
                          src={baseCurrencyProperties.imageUrl}
                          alt={baseCurrencyProperties.displayName}
                          sx={{
                            height: 48,
                            width: 48,
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
                            height: 48,
                            width: 48,
                            borderWidth: '5px !important',
                            backgroundColor: theme => theme.palette.background.default
                          }}
                        />
                      </Tooltip>
                    </AvatarGroup>
                    <CardHeader
                      title={
                        <Typography variant='h6' component='p' sx={{ fontSize: '1.375rem' }}>
                          {fund.displayName}
                        </Typography>
                      }
                      subheader={<Typography sx={{ color: 'text.secondary' }}>{fund.chain}</Typography>}
                      sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                    />
                    <CardContent>
                      <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                        flexWrap='wrap'
                        sx={{ mb: 4, gap: 2 }}
                      >
                        <Stack direction='row'>
                          <Typography
                            variant='h3'
                            component='p'
                            color='primary.main'
                            sx={{
                              mb: -1.2,
                              mr: 2,
                              lineHeight: 1
                            }}
                          >
                            {`${14}%`}
                          </Typography>
                          <Sub> average APY</Sub>
                        </Stack>
                      </Stack>
                      <Typography variant='body2' component='p'>
                        {fund.description || 'No description'}
                      </Typography>
                    </CardContent>
                    <Divider sx={{ my: '0 !important' }} />
                    <CardContent>
                      <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack
                          direction='row'
                          spacing={2}
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <Typography component='p' color='tet.secondary'>
                            Performance Fee
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>{`${fund.performanceFeePercentage} %`}</Typography>
                        </Stack>
                        <Stack
                          direction='row'
                          spacing={2}
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <Typography component='p' color='tet.secondary'>
                            Redemption Frequency
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            {fund.performanceFeePercentage > 0 ? `${fund.performanceFeePercentage} Days` : 'No limit'}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>

                    {/* TODO: fill here later */}
                    {/* <CardContent>
                      <Stack spacing={4}>
                        <Box>
                          <CustomChip size='small' rounded skin='light' color='success' label={`${25} days left`} />
                        </Box>
                        <Stack spacing={2}>
                          <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography
                              variant='body2'
                              component='p'
                              sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}
                            >
                              Progress
                            </Typography>
                            <Typography variant='body2' component='p' sx={{ fontWeight: 600, color: 'text.primary' }}>
                              68%
                            </Typography>
                          </Stack>
                          <LinearProgress value={68} color='success' sx={{ mb: 5.75 }} variant='determinate' />
                        </Stack>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                          <AvatarGroup className='pull-up' sx={{ mr: 2 }}>
                            <CustomAvatar src='/images/avatars/1.png' alt='demo 01' sx={{ height: 32, width: 32 }} />
                            <CustomAvatar src='/images/avatars/1.png' alt='demo 01' sx={{ height: 32, width: 32 }} />
                            <CustomAvatar src='/images/avatars/1.png' alt='demo 01' sx={{ height: 32, width: 32 }} />
                          </AvatarGroup>
                          <Stack
                            direction='row'
                            alignItems='center'
                            sx={{ '& svg': { mr: 1, color: 'text.secondary' } }}
                          >
                            <Icon icon='mdi:paperclip' fontSize='1.375rem' />
                            <Typography variant='body2' sx={{ mr: 2.5, fontWeight: 600 }}>
                              24
                            </Typography>
                            <Icon icon='mdi:check-circle-outline' fontSize='1.375rem' />
                            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                              74/180
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent> */}
                  </Card>
                </Grid>
              )
            })
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PublicFundListDataGrid
