// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ReviewDashboardBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ReviewDashboardStatisticsOverviewCard from 'src/views/review/dashboard/cards/ReviewDashboardStatisticsOverviewCard'
import ReviewDashboardRatingsCard from 'src/views/review/dashboard/cards/ReviewDashboardRatingsCard'
import ReviewDashboardSessionsCard from 'src/views/review/dashboard/cards/ReviewDashboardSessionsCard'
import ReviewDashboardFundListCard from 'src/views/review/dashboard/cards/ReviewDashboardFundListCard'
import ReviewDashboardCreateProjectCard from 'src/views/review/dashboard/cards/ReviewDashboardCreateProjectCard'
import ReviewDashboardTotalVisitsCard from 'src/views/review/dashboard/cards/ReviewDashboardTotalVisitsCard'
import ReviewDashboardSalesThisMonthCard from 'src/views/review/dashboard/cards/ReviewDashboardSalesThisMonthCard'
import ReviewDashboardProjectsGrid from 'src/views/review/dashboard/grids/ReviewDashboardProjectsGrid'

const ReviewDashboardPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <ReviewDashboardBreadcrumbs pageLevels={[{ title: '審核資金儀表板' }]} />
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
            <ReviewDashboardFundListCard />
          </Grid>

          {/* <Grid item xs={12} md={5} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ReviewDashboardCreateProjectCard />
              </Grid>
              <Grid item xs={12}>
                <ReviewDashboardTotalVisitsCard />
              </Grid>
              <Grid item xs={12}>
                <ReviewDashboardSalesThisMonthCard />
              </Grid>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={12} md={7} lg={8}>
            <ReviewDashboardProjectsGrid />
          </Grid> */}
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
