// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundEditOverviewProfileCard from 'src/views/management/fund/edit/cards/ManagementFundEditOverviewProfileCard'
import ManagementFundEditOverviewMetadataCard from 'src/views/management/fund/edit/cards/ManagementFundEditOverviewMetadataCard'
import ManagementFundEditOverviewStatisticsCard from 'src/views/management/fund/edit/cards/ManagementFundEditOverviewStatisticsCard'
import ManagementFundEditOverviewCreateDefaultPackageStack from 'src/views/management/fund/edit/stacks/ManagementFundEditOverviewCreateDefaultPackageStack'
import ManagementFundEditOverviewDefaultPackagesGrid from 'src/views/management/fund/edit/grids/ManagementFundEditOverviewDefaultPackagesGrid'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditOverviewTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='overview'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementFundEditOverviewProfileCard initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditOverviewMetadataCard initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementFundEditOverviewStatisticsCard />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditOverviewCreateDefaultPackageStack initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditOverviewDefaultPackagesGrid initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundEditOverviewTabPanel
