// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundEditVaultProtocolCard from 'src/views/management/fund/edit/cards/ManagementFundEditVaultProtocolCard'
import ManagementFundEditVaultPermissionsCard from 'src/views/management/fund/edit/cards/vault-permissions'
import ManagementFundEditVaultStatisticsCard from 'src/views/management/fund/edit/cards/ManagementFundEditVaultStatisticsCard'
import ManagementFundEditVaultPointsRecordListCard from 'src/views/management/fund/edit/cards/ManagementFundEditVaultPointsRecordListCard'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditVaultTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementFundEditVaultProtocolCard initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditVaultPermissionsCard initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementFundEditVaultStatisticsCard initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditVaultPointsRecordListCard initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundEditVaultTabPanel
