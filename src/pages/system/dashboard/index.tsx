// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Component Imports
import SystemDashboardBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import CardOSInfoStatistics from 'src/views/system/dashboard/cards/OSInfoStatisticsCard'
import CardDBInfoStatistics from 'src/views/system/dashboard/cards/DBInfoStatisticsCard'
import CardCpuUsageStatisticsLineChart from 'src/views/system/dashboard/cards/CpuUsageStatisticsLineChartCard'
import CardMemUsageStatisticsLineChart from 'src/views/system/dashboard/cards/MemUsageStatisticsLineChartCard'
import CardProcUsageStatisticsLineChart from 'src/views/system/dashboard/cards/ProcUsageStatisticsLineChartCard'
import CardDriveUsageRadialBarChart from 'src/views/system/dashboard/cards/DriveUsageRadialBarChartCard'
import CardSystemLogSnippet from 'src/views/system/dashboard/cards/SystemLogSnippetCard'
import SocketProvider from 'src/views/system/dashboard/provider/SocketProvider'

const SystemDashboardPage = () => {
  return (
    <SocketProvider>
      <ApexChartWrapper>
        <KeenSliderWrapper>
          <Grid container spacing={6} className='match-height'>
            <Grid item xs={12}>
              <SystemDashboardBreadcrumbs pageLevels={[{ title: '系統監控' }]} />
            </Grid>

            <Grid item xs={12} md={9}>
              <CardOSInfoStatistics />
            </Grid>
            <Grid item xs={12} md={3}>
              <CardDBInfoStatistics />
            </Grid>

            <Grid item xs={12} md={3} sm={6}>
              <CardCpuUsageStatisticsLineChart keepElements={15} />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <CardMemUsageStatisticsLineChart keepElements={15} />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <CardProcUsageStatisticsLineChart keepElements={10} />
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <CardDriveUsageRadialBarChart />
            </Grid>

            <Grid item xs={12}>
              <CardSystemLogSnippet />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
    </SocketProvider>
  )
}

SystemDashboardPage.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default SystemDashboardPage
