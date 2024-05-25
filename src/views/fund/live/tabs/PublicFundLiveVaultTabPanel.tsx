// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Core Component Imports
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Custom Component Imports
import PublicFundLiveAwardCard from 'src/views/fund/live/cards/PublicFundLiveAwardCard'
import PublicFundLiveOwnedSFTListGrid from 'src/views/fund/live/grids/PublicFundLiveOwnedSFTListGrid'
import PublicFundLiveStakedSFTListGrid from 'src/views/fund/live/grids/PublicFundLiveStakedSFTListGrid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveVaultTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <PublicFundLiveAwardCard />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='155k'
            color='primary'
            trendNumber='+22%'
            title='Total Orders'
            chipText='Last 4 Month'
            icon={<Icon icon='mdi:cart-plus' />}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='$13.4k'
            color='success'
            trendNumber='+38%'
            title='Total Sales'
            chipText='Last Six Month'
            icon={<Icon icon='mdi:currency-usd' />}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>My SFT</Typography>
            <Typography variant='body2'>
              List of SFTs that you have staked in the fund. You can redeem the SFTs at any time
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveOwnedSFTListGrid initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>Staked SFT</Typography>
            <Typography variant='body2'>
              List of SFTs that staked in the fund. You can redeem the SFTs at any time.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveStakedSFTListGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default PublicFundLiveVaultTabPanel
