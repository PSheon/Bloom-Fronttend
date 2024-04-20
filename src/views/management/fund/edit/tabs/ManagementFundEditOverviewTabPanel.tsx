// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundEditProfileCard from 'src/views/management/fund/edit/cards/ManagementFundEditProfileCard'
import ManagementFundEditMetadataCard from 'src/views/management/fund/edit/cards/ManagementFundEditMetadataCard'
import ManagementFundEditStatisticsCard from 'src/views/management/fund/edit/cards/ManagementFundEditStatisticsCard'
import ManagementFundEditCreateDefaultPackageStack from 'src/views/management/fund/edit/stacks/ManagementFundEditCreateDefaultPackageStack'
import ManagementFundEditDefaultPackagesGrid from 'src/views/management/fund/edit/grids/ManagementFundEditDefaultPackagesGrid'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

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
              <ManagementFundEditProfileCard initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditMetadataCard initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementFundEditStatisticsCard />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditCreateDefaultPackageStack initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditDefaultPackagesGrid initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundEditOverviewTabPanel
