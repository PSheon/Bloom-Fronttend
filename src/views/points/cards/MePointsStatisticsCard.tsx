// ** MUI Imports
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeStatisticsQuery } from 'src/store/api/management/pointRecord'

// ** Util Imports
import { getFormattedPriceUnit } from 'src/utils'

const MePointsStatisticsCard = () => {
  // ** Hooks
  const { data: meStatisticsData, isLoading: isFindMeStatisticsDataLoading } = useFindMeStatisticsQuery(null)

  // ** Vars
  const meStakedValue = meStatisticsData?.meStakedValue || 0
  const directReferralsStakedValue = meStatisticsData?.rankDownLine1?.totalStakedValue || 0

  const teamStakedValue =
    (meStatisticsData?.rankDownLine1?.totalStakedValue || 0) +
    (meStatisticsData?.rankDownLine2?.totalStakedValue || 0) +
    (meStatisticsData?.rankDownLine3?.totalStakedValue || 0) +
    (meStatisticsData?.rankTeam?.totalStakedValue || 0)

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6' component='p'>
            Statistics
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={4} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='primary'>
                <Icon icon='mdi:coins-outline' />
              </CustomAvatar>
              <Stack>
                {isFindMeStatisticsDataLoading ? (
                  <Skeleton variant='text' width={100} height={32} />
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {getFormattedPriceUnit(meStakedValue)}
                  </Typography>
                )}
                <Typography variant='caption'>My Staked Value</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={4} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='success'>
                <Icon icon='mdi:account' />
              </CustomAvatar>
              <Stack>
                {isFindMeStatisticsDataLoading ? (
                  <Skeleton variant='text' width={100} height={32} />
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {directReferralsStakedValue}
                  </Typography>
                )}
                <Typography variant='caption'>Direct Referrals Staked</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={4} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='info'>
                <Icon icon='mdi:account-group' />
              </CustomAvatar>
              <Stack>
                {isFindMeStatisticsDataLoading ? (
                  <Skeleton variant='text' width={100} height={32} />
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {teamStakedValue}
                  </Typography>
                )}
                <Typography variant='caption'>Team Staked Value</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MePointsStatisticsCard
