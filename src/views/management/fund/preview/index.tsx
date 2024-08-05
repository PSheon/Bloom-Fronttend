// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ManagementFundPreviewBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementFundPreviewProfileHeaderCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewProfileHeaderCard'
import ManagementFunPreviewTabContext from 'src/views/management/fund/preview/tabs/ManagementFundPreviewTabContext'

// ** Type Imports
import type { FundType, PreviewTabIndex } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
  tab: PreviewTabIndex
}

const ManagementFundPreviewSection = (props: Props) => {
  // ** Props
  const { initFundEntity, tab } = props

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <ManagementFundPreviewBreadcrumbs
            pageLevels={[
              { title: 'PageBreadcrumb.Management.Funds.PageTitle', href: '/management/fund/list' },
              { title: 'PageBreadcrumb.Management.Funds.Preview.PageTitle' }
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewProfileHeaderCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFunPreviewTabContext initFundEntity={initFundEntity} tab={tab} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default ManagementFundPreviewSection
