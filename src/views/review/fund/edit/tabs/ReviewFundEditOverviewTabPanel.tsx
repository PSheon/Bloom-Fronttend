// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ReviewFundEditProfileCard from 'src/views/review/fund/edit/cards/ReviewFundEditProfileCard'
import ReviewFundEditMetadataCard from 'src/views/review/fund/edit/cards/ReviewFundEditMetadataCard'
import ReviewFundEditStatisticsCard from 'src/views/review/fund/edit/cards/ReviewFundEditStatisticsCard'
import ReviewFundEditCreateDefaultPackageStack from 'src/views/review/fund/edit/stacks/ReviewFundEditCreateDefaultPackageStack'
import ReviewFundEditDefaultPackagesGrid from 'src/views/review/fund/edit/grids/ReviewFundEditDefaultPackagesGrid'

// ** Type Imports
import type { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundEditOverviewTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='overview'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ReviewFundEditProfileCard initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ReviewFundEditMetadataCard initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ReviewFundEditStatisticsCard />
            </Grid>
            <Grid item xs={12}>
              <ReviewFundEditCreateDefaultPackageStack initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ReviewFundEditDefaultPackagesGrid initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ReviewFundEditOverviewTabPanel
