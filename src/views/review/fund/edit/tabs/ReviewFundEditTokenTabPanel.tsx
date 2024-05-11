// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Type Imports
import type { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundEditTokenTabPanel = (props: Props) => {
  // ** Props
  const {
    /* initFundEntity */
  } = props

  return (
    <TabPanel sx={{ p: 0 }} value='token'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              add
            </Grid>
            <Grid item xs={12}>
              ReviewFundEditDefault
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              default package list
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ReviewFundEditTokenTabPanel
