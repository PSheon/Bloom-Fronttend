// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Component Imports
import PortfolioBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import PortfolioBannerCard from 'src/views/portfolio/cards/PortfolioBannerCard'
import PortfolioPointsRecordChartCard from 'src/views/portfolio/cards/me-points-record-chart'
import PortfolioPointsRecordListCard from 'src/views/portfolio/cards/me-points-record-list'
import PortfolioPositionsGrid from 'src/views/portfolio/grids/PortfolioPositionsGrid'

const PortfolioPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <PortfolioBreadcrumbs pageLevels={[{ title: 'Portfolio' }]} />
        </Grid>
        <Grid item xs={12}>
          <PortfolioBannerCard />
        </Grid>

        <Grid item xs={12} md={5}>
          <PortfolioPointsRecordChartCard />
        </Grid>
        <Grid item xs={12} md={7}>
          <PortfolioPointsRecordListCard />
        </Grid>

        <Grid item xs={12}>
          <PortfolioPositionsGrid />
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
