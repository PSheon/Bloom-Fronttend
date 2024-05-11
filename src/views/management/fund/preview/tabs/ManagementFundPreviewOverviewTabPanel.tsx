// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import ManagementFundPreviewPerformanceChartCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewPerformanceChartCard'
import ManagementFundPreviewRiskAnalyticsCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewRiskAnalyticsCard'
import ManagementFundPreviewDetailCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewDetailCard'
import ManagementFundPreviewSpecificationCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewSpecificationCard'
import ManagementFundPreviewDefaultPackageGrid from 'src/views/management/fund/preview/grids/ManagementFundPreviewDefaultPackageGrid'

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
          <ManagementFundPreviewRiskAnalyticsCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewDetailCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewSpecificationCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>資金方案</Typography>
            <Typography variant='body2'>您可以從以下方案了解資金的運作方式，鑄造後將擁有相對應的資金權利</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewDefaultPackageGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundPreviewOverviewTabPanel
