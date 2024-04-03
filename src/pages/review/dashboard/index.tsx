// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import DashboardHomeBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ReviewDashboardRequestSheetOverviewCard from 'src/views/review/dashboard/cards/RequestSheetOverviewCard'

const ReviewDashboardPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <DashboardHomeBreadcrumbs pageLevels={[{ title: '審核儀表板' }]} />
          </Grid>

          <Grid item xs={12}>
            <ReviewDashboardRequestSheetOverviewCard />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

ReviewDashboardPage.acl = {
  action: 'read',
  subject: 'reviewer-page'
}

export default ReviewDashboardPage
