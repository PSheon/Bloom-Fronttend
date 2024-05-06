// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundEditVaultProtocolCard from 'src/views/management/fund/edit/cards/ManagementFundEditVaultProtocolCard'
import ManagementFundEditVaultStatementCard from 'src/views/management/fund/edit/cards/ManagementFundEditVaultStatementCard'
import ManagementFundEditVaultStatisticsCard from 'src/views/management/fund/edit/cards/ManagementFundEditVaultStatisticsCard'
import ManagementFundEditVaultStakeListCard from 'src/views/management/fund/edit/cards/ManagementFundEditVaultStakeListCard'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

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
              <ManagementFundEditVaultStatementCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementFundEditVaultStatisticsCard />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditVaultStakeListCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundEditVaultTabPanel
