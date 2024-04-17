// ** MUI Imports
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

// ** Custom Component Imports
import RequestSheetEditInitialReviewCard from 'src/views/review/request-sheet/edit/cards/review/initial'
import RequestSheetEditInitialReviewEditCard from 'src/views/review/request-sheet/edit/cards/review/initial/edit'

// ** Util Imports
import { getRequestSheetProcessStatusAttributes } from 'src/utils'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const InitialReviewTabPanel = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Hooks
  const { views } = getRequestSheetProcessStatusAttributes(initRequestSheetEntity.processStatus)

  return (
    <Grid item xs={12}>
      <Fade in>
        <Grid container spacing={6}>
          {views.reviewer.initialReview === 'view' && (
            <Grid item xs={12}>
              <RequestSheetEditInitialReviewCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
          {views.reviewer.initialReview === 'edit' && (
            <Grid item xs={12}>
              <RequestSheetEditInitialReviewEditCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
        </Grid>
      </Fade>
    </Grid>
  )
}

export default InitialReviewTabPanel
