// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundEditSecurityActivityLogListCard from 'src/views/management/fund/edit/cards/ManagementFundEditSecurityActivityLogListCard'
import ManagementFundEditSecurityDangerZoneCard from 'src/views/management/fund/edit/cards/ManagementFundEditSecurityDangerZoneCard'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditSecurityTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='security'>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ManagementFundEditSecurityActivityLogListCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundEditSecurityDangerZoneCard initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundEditSecurityTabPanel
