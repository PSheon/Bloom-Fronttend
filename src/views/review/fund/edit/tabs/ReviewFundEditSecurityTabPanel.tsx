// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ReviewFundEditManagersCard from 'src/views/review/fund/edit/cards/ReviewFundEditManagersCard'
import ReviewFundEditDangerZoneCard from 'src/views/review/fund/edit/cards/ReviewFundEditDangerZoneCard'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundEditSecurityTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='security'>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ReviewFundEditManagersCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ReviewFundEditDangerZoneCard initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ReviewFundEditSecurityTabPanel
