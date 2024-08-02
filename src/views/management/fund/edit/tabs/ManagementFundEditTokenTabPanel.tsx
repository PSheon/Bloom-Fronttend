// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundEditTokenProtocolCard from 'src/views/management/fund/edit/cards/ManagementFundEditTokenProtocolCard'
import ManagementFundEditTokenPermissionsCard from 'src/views/management/fund/edit/cards/token-permissions'
import ManagementFundEditTokenStatisticsCard from 'src/views/management/fund/edit/cards/ManagementFundEditTokenStatisticsCard'
import ManagementFundEditTokenListCard from 'src/views/management/fund/edit/cards/ManagementFundEditTokenListCard'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditTokenTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='token'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementFundEditTokenProtocolCard initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditTokenPermissionsCard initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementFundEditTokenStatisticsCard initFundEntity={initFundEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementFundEditTokenListCard initFundEntity={initFundEntity} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundEditTokenTabPanel
