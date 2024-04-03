// ** MUI Imports
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

// ** Styled Component
import RequestSheetEditSecondaryReviewCard from 'src/views/request-sheet/edit/cards/review/secondary'
import RequestSheetEditSecondaryReviewEditCard from 'src/views/request-sheet/edit/cards/review/secondary/edit'

// ** Utils Import
import { getRequestSheetProcessStatusAttributes } from 'src/utils'

// ** Types
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
          {views.applicant.secondaryReview === 'view' && (
            <Grid item xs={12}>
              <RequestSheetEditSecondaryReviewCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
          {views.applicant.secondaryReview === 'edit' && (
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
