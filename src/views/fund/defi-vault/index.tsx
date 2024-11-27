// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Component Imports
import PublicFundLiveBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import PublicFundDefiVaultProfileHeaderCard from 'src/views/fund/defi-vault/cards/PublicFundDefiVaultProfileHeaderCard'

// import PublicFundDefiVaultStatisticsCard from 'src/views/fund/defi-vault/cards/PublicFundDefiVaultStatisticsCard'
import PublicFundDefiVaultDetailCard from 'src/views/fund/defi-vault/cards/PublicFundDefiVaultDetailCard'
import PublicFundDefiVaultSpecificationCard from 'src/views/fund/defi-vault/cards/PublicFundDefiVaultSpecificationCard'
import PublicFundDefiVaultWalletCheckGrid from 'src/views/fund/defi-vault/grids/PublicFundDefiVaultWalletCheckGrid'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultSection = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <PublicFundLiveBreadcrumbs
            pageLevels={[
              { title: 'PageBreadcrumb.Public.Funds & Strategies.PageTitle', href: '/fund/list' },
              { title: 'PageBreadcrumb.Public.Funds & Strategies.Live.PageTitle' }
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <PublicFundDefiVaultProfileHeaderCard initDVFundEntity={initDVFundEntity} />
        </Grid>
        {/* <Grid item xs={12}>
          <PublicFundDefiVaultStatisticsCard initDVFundEntity={initDVFundEntity} />
        </Grid> */}
        <Grid item xs={12}>
          <PublicFundDefiVaultWalletCheckGrid initDVFundEntity={initDVFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <PublicFundDefiVaultDetailCard initDVFundEntity={initDVFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <PublicFundDefiVaultSpecificationCard initDVFundEntity={initDVFundEntity} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default PublicFundDefiVaultSection
