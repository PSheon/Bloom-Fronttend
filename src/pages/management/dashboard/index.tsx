// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Custom Component Imports
import ManagementDashboardBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementDashboardCongratulationsCard from 'src/views/management/dashboard/cards/ManagementDashboardCongratulationsCard'
import ManagementDashboardSessionsCard from 'src/views/management/dashboard/cards/ManagementDashboardSessionsCard'
import ManagementDashboardTotalTransactionsCard from 'src/views/management/dashboard/cards/ManagementDashboardTotalTransactionsCard'
import ManagementDashboardPerformanceCard from 'src/views/management/dashboard/cards/ManagementDashboardPerformanceCard'
import ManagementDashboardProjectStatisticsCard from 'src/views/management/dashboard/cards/ManagementDashboardProjectStatisticsCard'
import ManagementDashboardTotalRevenueCard from 'src/views/management/dashboard/cards/ManagementDashboardTotalRevenueCard'
import ManagementDashboardOverviewCard from 'src/views/management/dashboard/cards/ManagementDashboardOverviewCard'
import ManagementDashboardSalesCountryCard from 'src/views/management/dashboard/cards/ManagementDashboardSalesCountryCard'
import ManagementDashboardTopReferralSourcesCard from 'src/views/management/dashboard/cards/ManagementDashboardTopReferralSourcesCard'
import ManagementDashboardWeeklySalesCard from 'src/views/management/dashboard/cards/ManagementDashboardWeeklySalesCard'
import ManagementDashboardVisitsByDayCard from 'src/views/management/dashboard/cards/ManagementDashboardVisitsByDayCard'
import ManagementDashboardActivityTimelineCard from 'src/views/management/dashboard/cards/ManagementDashboardActivityTimelineCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ManagementDashboardPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <ManagementDashboardBreadcrumbs pageLevels={[{ title: '分析報表' }]} />
          </Grid>

          <Grid item xs={12} md={8}>
            <ManagementDashboardCongratulationsCard />
          </Grid>
          <Grid item xs={6} md={2}>
            <CardStatisticsVertical
              stats='155k'
              color='primary'
              trendNumber='+22%'
              title='Total Orders'
              chipText='Last 4 Month'
              icon={<Icon icon='mdi:cart-plus' />}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <ManagementDashboardSessionsCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <ManagementDashboardTotalTransactionsCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ManagementDashboardPerformanceCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ManagementDashboardProjectStatisticsCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <ManagementDashboardTotalRevenueCard />
              </Grid>
              <Grid item xs={6}>
                <CardStatisticsVertical
                  stats='$13.4k'
                  color='success'
                  trendNumber='+38%'
                  title='Total Sales'
                  chipText='Last Six Month'
                  icon={<Icon icon='mdi:currency-usd' />}
                />
              </Grid>
              <Grid item xs={6}>
                <CardStatisticsVertical
                  color='info'
                  stats='142.8k'
                  trendNumber='+62%'
                  chipText='Last One Year'
                  title='Total Impressions'
                  icon={<Icon icon='mdi:link' />}
                />
              </Grid>
              <Grid item xs={6}>
                <ManagementDashboardOverviewCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ManagementDashboardSalesCountryCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <ManagementDashboardTopReferralSourcesCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ManagementDashboardWeeklySalesCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ManagementDashboardVisitsByDayCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <ManagementDashboardActivityTimelineCard />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

ManagementDashboardPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementDashboardPage
