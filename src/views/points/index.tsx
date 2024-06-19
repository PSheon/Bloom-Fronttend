// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import PointsBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import MePointsProfileCard from 'src/views/points/cards/MePointsProfileCard'
import MePointsInvitationCard from 'src/views/points/cards/MePointsInvitationCard'
import MePointsDirectDownLineStatisticsCard from 'src/views/points/cards/MePointsDirectDownLineStatisticsCard'
import MePointsDirectDownLineTotalCard from 'src/views/points/cards/MePointsDirectDownLineTotalCard'
import MePointsTeamTotalCard from 'src/views/points/cards/MePointsTeamTotalCard'
import MePointsEarnHistoryCard from 'src/views/points/cards/MePointsEarnHistoryCard'
import MePointsDirectDownLineDetailsCard from 'src/views/points/cards/MePointsDirectDownLineDetailsCard'

const PointsSection = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PointsBreadcrumbs pageLevels={[{ title: 'My Points' }]} />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <MePointsProfileCard />
            </Grid>
            <Grid item xs={12}>
              <MePointsInvitationCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6} className='match-height'>
            <Grid item xs={12}>
              <MePointsDirectDownLineStatisticsCard />
            </Grid>
            <Grid item xs={12} md={5}>
              <Grid container spacing={6}>
                <Grid item xs={6} md={12}>
                  <MePointsDirectDownLineTotalCard />
                </Grid>
                <Grid item xs={6} md={12}>
                  <MePointsTeamTotalCard />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <MePointsEarnHistoryCard />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <MePointsDirectDownLineDetailsCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default PointsSection
