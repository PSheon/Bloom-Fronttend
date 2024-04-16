// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

// ** Custom Component Imports
import DashboardHomeBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementDashboardUserOverviewCard from 'src/views/management/dashboard/cards/UserOverviewCard'
import ManagementDashboardRequestSheetOverviewCard from 'src/views/management/dashboard/cards/RequestSheetOverviewCard'

const ManagementDashboardPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <DashboardHomeBreadcrumbs pageLevels={[{ title: '分析報表' }]} />
          </Grid>

          <Grid item xs={12}>
            <ManagementDashboardUserOverviewCard />
          </Grid>
          <Grid item xs={12}>
            <ManagementDashboardRequestSheetOverviewCard />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

ManagementDashboardPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default ManagementDashboardPage
