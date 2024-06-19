// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundPreviewPerformanceChartCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewPerformanceChartCard'
import ManagementFundPreviewStakeStatisticsCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewStakeStatisticsCard'
import ManagementFundPreviewDetailCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewDetailCard'
import ManagementFundPreviewSpecificationCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewSpecificationCard'
import ManagementFundPreviewDefaultPackageWalletCheckGrid from 'src/views/management/fund/preview/grids/ManagementFundPreviewDefaultPackageWalletCheckGrid'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundPreviewOverviewTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='overview'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <ManagementFundPreviewPerformanceChartCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ManagementFundPreviewStakeStatisticsCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewDetailCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewSpecificationCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewDefaultPackageWalletCheckGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundPreviewOverviewTabPanel
