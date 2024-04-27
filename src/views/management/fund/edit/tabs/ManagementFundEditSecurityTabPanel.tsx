// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundEditActivityLogListCard from 'src/views/management/fund/edit/cards/ManagementFundEditActivityLogListCard'
import ManagementFundEditDangerZoneCard from 'src/views/management/fund/edit/cards/ManagementFundEditDangerZoneCard'

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
          <ManagementFundEditActivityLogListCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundEditDangerZoneCard initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundEditSecurityTabPanel
