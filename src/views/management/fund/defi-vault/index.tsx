// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementFundEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementFundDefiVaultEditProfileHeaderCard from 'src/views/management/fund/defi-vault/cards/ManagementFundDefiVaultEditProfileHeaderCard'
import ManagementFundDefiVaultEditOverviewProfileCard from 'src/views/management/fund/defi-vault/cards/ManagementFundDefiVaultEditOverviewProfileCard'
import ManagementFundDefiVaultEditOverviewMetadataCard from 'src/views/management/fund/defi-vault/cards/ManagementFundDefiVaultEditOverviewMetadataCard'
import ManagementFundDefiVaultEditOverviewStatisticsCard from 'src/views/management/fund/defi-vault/cards/ManagementFundDefiVaultEditOverviewStatisticsCard'
import ManagementFundDefiVaultEditOverviewVaultManipulationStack from 'src/views/management/fund/defi-vault/stacks/ManagementFundDefiVaultEditOverviewVaultManipulationStack'
import ManagementFundDefiVaultEditOverviewVaultAssetManagementCard from 'src/views/management/fund/defi-vault/cards/ManagementFundDefiVaultEditOverviewVaultAssetManagementCard'
import ManagementFundDefiVaultEditOverviewVaultPermissionCard from 'src/views/management/fund/defi-vault/cards/ManagementFundDefiVaultEditOverviewVaultPermissionCard'
import ManagementFundDefiVaultEditOverviewCreateDefaultPackageStack from 'src/views/management/fund/defi-vault/stacks/ManagementFundDefiVaultEditOverviewCreateDefaultPackageStack'
import ManagementFundDefiVaultEditOverviewDefaultPackageGrid from 'src/views/management/fund/defi-vault/grids/ManagementFundDefiVaultEditOverviewDefaultPackageGrid'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const ManagementFundDefiVaultEditSection = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementFundEditBreadcrumbs
          pageLevels={[
            { title: 'PageBreadcrumb.Management.Funds.PageTitle', href: '/management/fund/list' },
            { title: 'PageBreadcrumb.Management.Funds.Edit.PageTitle' }
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <ManagementFundDefiVaultEditProfileHeaderCard initDVFundEntity={initDVFundEntity} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ManagementFundDefiVaultEditOverviewProfileCard initDVFundEntity={initDVFundEntity} />
              </Grid>
              <Grid item xs={12}>
                <ManagementFundDefiVaultEditOverviewMetadataCard initDVFundEntity={initDVFundEntity} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <ManagementFundDefiVaultEditOverviewStatisticsCard initDVFundEntity={initDVFundEntity} />
              </Grid>
              <Grid item xs={12}>
                <ManagementFundDefiVaultEditOverviewVaultManipulationStack />
              </Grid>
              <Grid item xs={12}>
                <ManagementFundDefiVaultEditOverviewVaultAssetManagementCard initDVFundEntity={initDVFundEntity} />
              </Grid>
              <Grid item xs={12}>
                <ManagementFundDefiVaultEditOverviewVaultPermissionCard initDVFundEntity={initDVFundEntity} />
              </Grid>
              <Grid item xs={12}>
                <ManagementFundDefiVaultEditOverviewCreateDefaultPackageStack />
              </Grid>
              <Grid item xs={12}>
                <ManagementFundDefiVaultEditOverviewDefaultPackageGrid initDVFundEntity={initDVFundEntity} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ManagementFundDefiVaultEditSection
