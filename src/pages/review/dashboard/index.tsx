// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ReviewDashboardBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ReviewDashboardStatisticsOverviewCard from 'src/views/review/dashboard/cards/ReviewDashboardStatisticsOverviewCard'
import ReviewDashboardRatingsCard from 'src/views/review/dashboard/cards/ReviewDashboardRatingsCard'
import ReviewDashboardSessionsCard from 'src/views/review/dashboard/cards/ReviewDashboardSessionsCard'
import ReviewDashboardFundDataGridCard from 'src/views/review/dashboard/cards/ReviewDashboardFundDataGridCard'

const ReviewDashboardPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <ReviewDashboardBreadcrumbs pageLevels={[{ title: 'Review Dashboard' }]} />
          </Grid>

          <Grid item xs={12} md={6}>
            <ReviewDashboardStatisticsOverviewCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ReviewDashboardRatingsCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ReviewDashboardSessionsCard />
          </Grid>

          <Grid item xs={12}>
            <ReviewDashboardFundDataGridCard />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

ReviewDashboardPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ReviewDashboardPage
