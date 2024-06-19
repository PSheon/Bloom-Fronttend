// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
// import PublicFundLivePerformanceChartCard from 'src/views/fund/live/cards/PublicFundLivePerformanceChartCard'
// import PublicFundLiveStakeStatisticsCard from 'src/views/fund/live/cards/PublicFundLiveStakeStatisticsCard'
import PublicFundLiveDetailCard from 'src/views/fund/live/cards/PublicFundLiveDetailCard'
import PublicFundLiveSpecificationCard from 'src/views/fund/live/cards/PublicFundLiveSpecificationCard'
import PublicFundLiveDefaultPackageWalletCheckGrid from 'src/views/fund/live/grids/PublicFundLiveDefaultPackageWalletCheckGrid'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveOverviewTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='overview'>
      <Grid container spacing={6}>
        {/* TODO: fix here later */}
        {/* <Grid item xs={12} md={8}>
          <PublicFundLivePerformanceChartCard initFundEntity={initFundEntity} />
        </Grid> */}
        {/* <Grid item xs={12} md={4}>
          <PublicFundLiveStakeStatisticsCard initFundEntity={initFundEntity} />
        </Grid> */}
        <Grid item xs={12}>
          <PublicFundLiveDetailCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveSpecificationCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveDefaultPackageWalletCheckGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default PublicFundLiveOverviewTabPanel
