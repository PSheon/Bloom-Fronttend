// ** MUI Imports
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

// ** Custom Component Imports
import RequestSheetEditSecondaryReviewCard from 'src/views/review/request-sheet/edit/cards/review/secondary'
import RequestSheetEditSecondaryReviewEditCard from 'src/views/review/request-sheet/edit/cards/review/secondary/edit'

// ** Util Imports
import { getRequestSheetProcessStatusAttributes } from 'src/utils'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const SecondaryReviewTabPanel = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Hooks
  const { views } = getRequestSheetProcessStatusAttributes(initRequestSheetEntity.processStatus)

  return (
    <Grid item xs={12}>
      <Fade in>
        <Grid container spacing={6}>
          {views.reviewer.secondaryReview === 'view' && (
            <Grid item xs={12}>
              <RequestSheetEditSecondaryReviewCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
          {views.reviewer.secondaryReview === 'edit' && (
            <Grid item xs={12}>
              <RequestSheetEditSecondaryReviewEditCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
        </Grid>
      </Fade>
    </Grid>
  )
}

export default SecondaryReviewTabPanel
