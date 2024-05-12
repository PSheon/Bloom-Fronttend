// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundEditVaultTabPanel = (props: Props) => {
  // ** Props
  const {
    /* initFundEntity */
  } = props

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          456
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ReviewFundEditVaultTabPanel
