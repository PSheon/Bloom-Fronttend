// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import PointsBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import MePointsLevelCard from 'src/views/points/cards/me-points-level-card'
import MePointsInvitationCard from 'src/views/points/cards/MePointsInvitationCard'
import MePointsAccountPointsCard from 'src/views/points/cards/MePointsAccountPointsCard'
import MePointsStatisticsCard from 'src/views/points/cards/MePointsStatisticsCard'
import MePointsRoutineTaskCard from 'src/views/points/cards/MePointsRoutineTaskCard'
import MePointsRecordChartCard from 'src/views/points/cards/MePointsRecordChartCard'

// import MePointsTeamMembersCard from 'src/views/points/cards/MePointsTeamMembersCard'
import MeEarningRecordListCard from 'src/views/points/cards/MeEarningRecordListCard'

// TODO: Fill here later
const PointsSection = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PointsBreadcrumbs pageLevels={[{ title: 'PageBreadcrumb.Me.Points.PageTitle' }]} />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <MePointsLevelCard />
            </Grid>
            <Grid item xs={12}>
              <MePointsInvitationCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6} className='match-height'>
            <Grid item xs={12} md={5}>
              <MePointsAccountPointsCard />
            </Grid>
            <Grid item xs={12} md={7}>
              <MePointsStatisticsCard />
            </Grid>
            <Grid item xs={12}>
              <MePointsRoutineTaskCard />
            </Grid>
            <Grid item xs={12}>
              <MePointsRecordChartCard />
            </Grid>
            {/* <Grid item xs={12} md={5}>
              <MePointsTeamMembersCard />
            </Grid> */}
            <Grid item xs={12}>
              <MeEarningRecordListCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default PointsSection
