// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ManagementFundPreviewBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementFundPreviewProfileHeaderCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewProfileHeaderCard'
import ManagementFundPreviewPerformanceChartCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewPerformanceChartCard'
import ManagementFundPreviewMyPositionCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewMyPositionCard'
import ManagementFundPreviewDetailCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewDetailCard'
import ManagementFundPreviewSpecificationCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewSpecificationCard'
import ManagementFundPreviewDefaultPackageGrid from 'src/views/management/fund/preview/grids/ManagementFundPreviewDefaultPackageGrid'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundPreviewSection = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ManagementFundPreviewBreadcrumbs
            pageLevels={[{ title: '資金管理', href: '/management/fund/list' }, { title: '預覽資金' }]}
          />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewProfileHeaderCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ManagementFundPreviewPerformanceChartCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ManagementFundPreviewMyPositionCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewDetailCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewSpecificationCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>資金方案</Typography>
            <Typography variant='body2'>您可以從以下方案了解資金的運作方式，鑄造後將擁有相對應的資金權利</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewDefaultPackageGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default ManagementFundPreviewSection
