// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Component Imports
import PortfolioBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import PortfolioBannerCard from 'src/views/portfolio/cards/PortfolioBannerCard'
import PortfolioMePositionsGrid from 'src/views/portfolio/grids/PortfolioMePositionsGrid'

const PortfolioPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <PortfolioBreadcrumbs pageLevels={[{ title: '主頁' }]} />
        </Grid>
        <Grid item xs={12}>
          <PortfolioBannerCard />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h5' component='p'>
            My Position
          </Typography>
          <Typography variant='body2' component='p'>
            Your RWA positions
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PortfolioMePositionsGrid />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h5' component='p'>
            My Activities
          </Typography>
          <Typography variant='body2' component='p'>
            Your recently activities on Ethereum
          </Typography>
        </Grid>
        <Grid item xs={12}>
          PortfolioMeActivitiesGrid
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

PortfolioPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PortfolioPage
