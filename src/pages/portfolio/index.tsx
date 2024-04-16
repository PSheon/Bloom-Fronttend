// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import PortfolioBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import PortfolioBannerCard from 'src/views/portfolio/cards/PortfolioBannerCard'
import PortfolioStatisticsOverviewCard from 'src/views/portfolio/cards/PortfolioStatisticsOverviewCard'
import PortfolioMeNotificationCard from 'src/views/portfolio/cards/me-notification'
import PortfolioProjectsGrid from 'src/views/portfolio/grids/PortfolioProjectsGrid'

const PortfolioPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <PortfolioBreadcrumbs pageLevels={[{ title: '主頁' }]} />
          </Grid>
          <Grid item xs={12}>
            <PortfolioBannerCard />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <PortfolioStatisticsOverviewCard />
              </Grid>
              <Grid item xs={12}>
                <PortfolioMeNotificationCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <PortfolioProjectsGrid />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

PortfolioPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PortfolioPage
