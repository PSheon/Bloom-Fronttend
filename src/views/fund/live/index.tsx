// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import PublicFundLiveBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import PublicFundLiveProfileHeaderCard from 'src/views/fund/live/cards/PublicFundLiveProfileHeaderCard'
import PublicFundLivePerformanceChartCard from 'src/views/fund/live/cards/PublicFundLivePerformanceChartCard'
import PublicFundLiveRiskAnalyticsCard from 'src/views/fund/live/cards/PublicFundLiveRiskAnalyticsCard'
import PublicFundLiveDetailCard from 'src/views/fund/live/cards/PublicFundLiveDetailCard'
import PublicFundLiveSpecificationCard from 'src/views/fund/live/cards/PublicFundLiveSpecificationCard'
import PublicFundLiveDefaultPackageGrid from 'src/views/fund/live/grids/PublicFundLiveDefaultPackageGrid'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveSection = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <PublicFundLiveBreadcrumbs
            pageLevels={[{ title: '公開資金列表', href: '/fund/list' }, { title: `資金 #${initFundEntity.id}` }]}
          />
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveProfileHeaderCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12} md={8}>
          <PublicFundLivePerformanceChartCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PublicFundLiveRiskAnalyticsCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveDetailCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveSpecificationCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>資金方案</Typography>
            <Typography variant='body2'>您可以從以下方案了解資金的運作方式，鑄造後將擁有相對應的資金權利</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveDefaultPackageGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default PublicFundLiveSection
