// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundEditDetailEditorCard from 'src/views/management/fund/edit/cards/ManagementFundEditDetailEditorCard'

// ** Type Imports
import type { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditDetailTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='detail'>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ManagementFundEditDetailEditorCard initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundEditDetailTabPanel
