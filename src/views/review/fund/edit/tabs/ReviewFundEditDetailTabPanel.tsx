// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ReviewFundEditDetailEditorCard from 'src/views/review/fund/edit/cards/ReviewFundEditDetailEditorCard'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundEditDetailTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='detail'>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ReviewFundEditDetailEditorCard initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ReviewFundEditDetailTabPanel
