// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Component Imports
import SystemDashboardSocketProvider from 'src/views/system/dashboard/providers/SystemDashboardSocketProvider'
import SystemDashboardBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import SystemDashboardCardOSInfoStatistics from 'src/views/system/dashboard/cards/SystemDashboardOSInfoStatisticsCard'
import SystemDashboardCardDBInfoStatistics from 'src/views/system/dashboard/cards/SystemDashboardDBInfoStatisticsCard'
import SystemDashboardCardCpuUsageStatisticsLineChart from 'src/views/system/dashboard/cards/SystemDashboardCpuUsageStatisticsLineChartCard'
import SystemDashboardCardMemUsageStatisticsLineChart from 'src/views/system/dashboard/cards/SystemDashboardMemUsageStatisticsLineChartCard'
import SystemDashboardCardProcUsageStatisticsLineChart from 'src/views/system/dashboard/cards/SystemDashboardProcUsageStatisticsLineChartCard'
import SystemDashboardCardDriveUsageRadialBarChart from 'src/views/system/dashboard/cards/SystemDashboardDriveUsageRadialBarChartCard'
import SystemDashboardCardSystemLogSnippet from 'src/views/system/dashboard/cards/SystemDashboardSystemLogSnippetCard'

const SystemDashboardPage = () => {
  return (
    <SystemDashboardSocketProvider>
      <ApexChartWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <SystemDashboardBreadcrumbs pageLevels={[{ title: 'PageBreadcrumb.System.Dashboard.PageTitle' }]} />
          </Grid>

          <Grid item xs={12} md={9}>
            <SystemDashboardCardOSInfoStatistics />
          </Grid>
          <Grid item xs={12} md={3}>
            <SystemDashboardCardDBInfoStatistics />
          </Grid>

          <Grid item xs={12} md={3} sm={6}>
            <SystemDashboardCardCpuUsageStatisticsLineChart />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <SystemDashboardCardMemUsageStatisticsLineChart />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <SystemDashboardCardProcUsageStatisticsLineChart />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <SystemDashboardCardDriveUsageRadialBarChart />
          </Grid>

          <Grid item xs={12}>
            <SystemDashboardCardSystemLogSnippet />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </SystemDashboardSocketProvider>
  )
}

SystemDashboardPage.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default SystemDashboardPage
