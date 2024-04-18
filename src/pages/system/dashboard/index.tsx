// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Component Imports
import SystemDashboardBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import SystemDashboardCardOSInfoStatistics from 'src/views/system/dashboard/cards/SystemDashboardOSInfoStatisticsCard'
import SystemDashboardCardDBInfoStatistics from 'src/views/system/dashboard/cards/SystemDashboardDBInfoStatisticsCard'
import SystemDashboardCardCpuUsageStatisticsLineChart from 'src/views/system/dashboard/cards/SystemDashboardCpuUsageStatisticsLineChartCard'
import SystemDashboardCardMemUsageStatisticsLineChart from 'src/views/system/dashboard/cards/SystemDashboardMemUsageStatisticsLineChartCard'
import SystemDashboardCardProcUsageStatisticsLineChart from 'src/views/system/dashboard/cards/SystemDashboardProcUsageStatisticsLineChartCard'
import SystemDashboardCardDriveUsageRadialBarChart from 'src/views/system/dashboard/cards/SystemDashboardDriveUsageRadialBarChartCard'
import SystemDashboardCardSystemLogSnippet from 'src/views/system/dashboard/cards/SystemDashboardSystemLogSnippetCard'
import SystemDashboardSocketProvider from 'src/views/system/dashboard/providers/SystemDashboardSocketProvider'

const SystemDashboardPage = () => {
  return (
    <SystemDashboardSocketProvider>
      <ApexChartWrapper>
        <KeenSliderWrapper>
          <Grid container spacing={6} className='match-height'>
            <Grid item xs={12}>
              <SystemDashboardBreadcrumbs pageLevels={[{ title: '系統監控' }]} />
            </Grid>

            <Grid item xs={12} md={9}>
              <SystemDashboardCardOSInfoStatistics />
            </Grid>
            <Grid item xs={12} md={3}>
              <SystemDashboardCardDBInfoStatistics />
            </Grid>

            <Grid item xs={12} md={3} sm={6}>
              <SystemDashboardCardCpuUsageStatisticsLineChart keepElements={15} />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <SystemDashboardCardMemUsageStatisticsLineChart keepElements={15} />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <SystemDashboardCardProcUsageStatisticsLineChart keepElements={10} />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <SystemDashboardCardDriveUsageRadialBarChart />
            </Grid>

            <Grid item xs={12}>
              <SystemDashboardCardSystemLogSnippet />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
    </SystemDashboardSocketProvider>
  )
}

SystemDashboardPage.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default SystemDashboardPage
