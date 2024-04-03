// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import DashboardHomeBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import DashboardHomeBannerCard from 'src/views/dashboard/cards/DashboardHomeBannerCard'
import DashboardHomeStatisticsOverviewCard from 'src/views/dashboard/cards/DashboardHomeStatisticsOverviewCard'
import DashboardHomeMeNotificationCard from 'src/views/dashboard/cards/me-notification'
import DashboardHomeProjectsGrid from 'src/views/dashboard/grids/DashboardHomeProjectsGrid'

const HomeDashboardPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <DashboardHomeBreadcrumbs pageLevels={[{ title: '主頁' }]} />
          </Grid>
          <Grid item xs={12}>
            <DashboardHomeBannerCard />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <DashboardHomeStatisticsOverviewCard />
              </Grid>
              <Grid item xs={12}>
                <DashboardHomeMeNotificationCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <DashboardHomeProjectsGrid />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

HomeDashboardPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default HomeDashboardPage
