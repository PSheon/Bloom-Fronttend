// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ReviewFundPreviewBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ReviewFundPreviewProfileHeaderCard from 'src/views/review/fund/preview/cards/ReviewFundPreviewProfileHeaderCard'
import ReviewFundPreviewPerformanceChartCard from 'src/views/review/fund/preview/cards/ReviewFundPreviewPerformanceChartCard'
import ReviewFundPreviewMyPositionCard from 'src/views/review/fund/preview/cards/ReviewFundPreviewMyPositionCard'
import ReviewFundPreviewDetailCard from 'src/views/review/fund/preview/cards/ReviewFundPreviewDetailCard'
import ReviewFundPreviewSpecificationCard from 'src/views/review/fund/preview/cards/ReviewFundPreviewSpecificationCard'
import ReviewFundPreviewDefaultPackageGrid from 'src/views/review/fund/preview/grids/ReviewFundPreviewDefaultPackageGrid'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundPreviewSection = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ReviewFundPreviewBreadcrumbs
            pageLevels={[{ title: '資金審核', href: '/review/dashboard' }, { title: '預覽資金' }]}
          />
        </Grid>
        <Grid item xs={12}>
          <ReviewFundPreviewProfileHeaderCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReviewFundPreviewPerformanceChartCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ReviewFundPreviewMyPositionCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ReviewFundPreviewDetailCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ReviewFundPreviewSpecificationCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>資金方案</Typography>
            <Typography variant='body2'>您可以從以下方案了解資金的運作方式，鑄造後將擁有相對應的資金權利</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ReviewFundPreviewDefaultPackageGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default ReviewFundPreviewSection
