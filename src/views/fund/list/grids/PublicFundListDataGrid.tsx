// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import LinearProgress from '@mui/material/LinearProgress'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import PublicFundListLoadingSkeletonCard from 'src/views/fund/list/cards/PublicFundListLoadingSkeletonCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFundCurrencyProperties } from 'src/utils'

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

  // ** Renders
  const renderTableDataGrid = () => {
    if (isFundListLoading) {
      return (
        <Grid container spacing={6}>
          {[...Array(6).keys()].map(index => (
            <Grid key={`fund-skeleton-${index}`} item xs={12} md={6}>
              <PublicFundListLoadingSkeletonCard />
            </Grid>
          ))}
        </Grid>
      )
    } else if (totalRows === 0) {
      return (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='h5' textAlign='center' sx={{ my: 12, fontSize: '1.5rem !important' }}>
              We are launching soon 🚀
            </Typography>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container spacing={6}>
          {funds.map(fund => {
            const baseCurrencyProperties = getFundCurrencyProperties(fund.baseCurrency)

            return (
              <Grid key={`fund-${fund.id}`} item xs={12} md={6} xl={4}>
                <Card
                  onClick={() => handleRedirectToFund(fund.id)}
                  sx={{
                    border: '1px transparent solid',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    '&:hover': {
                      borderColor: theme => theme.palette.primary.main
                    }
                  }}
                >
                  <CardHeader
                    avatar={
                      <AvatarGroup className='pull-up'>
                        <Tooltip title={baseCurrencyProperties.displayName}>
                          <CustomAvatar
                            src={baseCurrencyProperties.imageUrl}
                            alt={baseCurrencyProperties.displayName}
                            sx={{ height: 48, width: 48, borderWidth: '5px !important' }}
                          />
                        </Tooltip>
                        <Tooltip title='RWA'>
                          <CustomAvatar
                            src='/images/funds/rwa.png'
                            alt='rwa'
                            sx={{ height: 48, width: 48, borderWidth: '5px !important' }}
                          />
                        </Tooltip>
                      </AvatarGroup>
                    }
                    sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                    title={
                      <Typography variant='h6' sx={{ fontSize: '1.375rem' }}>
                        {fund.displayName}
                      </Typography>
                    }
                    subheader={<Typography sx={{ color: 'text.secondary' }}>{fund.chain}</Typography>}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        mb: 4,
                        gap: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ display: 'flex', position: 'relative' }}>
                        <Typography
                          variant='h3'
                          sx={{
                            mb: -1.2,
                            mr: 2,
                            lineHeight: 1,
                            color: 'primary.main'
                          }}
                        >
                          42%
                        </Typography>
                        <Sub> APY</Sub>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                        <Stack direction='row' spacing={2}>
                          <Typography sx={{ color: 'text.secondary' }}>Net Asset Value</Typography>
                          <Typography sx={{ fontWeight: 500 }}>6 M</Typography>
                        </Stack>
                        <Stack direction='row' spacing={2}>
                          <Typography sx={{ color: 'text.secondary' }}>TVL</Typography>
                          <Typography sx={{ fontWeight: 500 }}>436,555 USDT</Typography>
                        </Stack>
                      </Box>
                    </Box>
                    {fund.description && <Typography sx={{ color: 'text.secondary' }}>{fund.description}</Typography>}
                  </CardContent>
                  <Divider sx={{ my: '0 !important' }} />
                  <CardContent>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 1, fontWeight: 500 }}>Position:</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>TODO</Typography>
                      </Box>
                      <CustomChip size='small' rounded skin='light' color='success' label={`${25} days left`} />
                    </Box>
                    <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant='body2'>{`Tasks: ${12}/${34}`}</Typography>
                      <Typography variant='body2'>{`${Math.round(80)}% Completed`}</Typography>
                    </Box>
                    <LinearProgress
                      color='primary'
                      variant='determinate'
                      value={Math.round(1.2 * 100)}
                      sx={{
                        mb: 4,
                        height: 8,
                        borderRadius: 2,
                        '& .MuiLinearProgress-bar': { borderRadius: 2 }
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarGroup className='pull-up' sx={{ mr: 2 }}>
                          <Tooltip title='demo 01'>
                            <CustomAvatar src='/images/avatars/1.png' alt='demo 01' sx={{ height: 32, width: 32 }} />
                          </Tooltip>
                          <Tooltip title='demo 02'>
                            <CustomAvatar src='/images/avatars/2.png' alt='demo 02' sx={{ height: 32, width: 32 }} />
                          </Tooltip>
                          <Tooltip title='demo 03'>
                            <CustomAvatar src='/images/avatars/3.png' alt='demo 03' sx={{ height: 32, width: 32 }} />
                          </Tooltip>
                        </AvatarGroup>
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          234
                        </Typography>
                      </Box>
                      <Box
                        href='/'
                        component={Link}
                        onClick={e => e.preventDefault()}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          '& svg': { mr: 1, color: 'text.secondary' }
                        }}
                      >
                        <Icon icon='mdi:message-outline' />
                        <Typography sx={{ color: 'text.secondary' }}>13</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          By the community, for the community
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {renderTableDataGrid()}
      </Grid>
    </Grid>
  )
}

export default PublicFundListDataGrid
