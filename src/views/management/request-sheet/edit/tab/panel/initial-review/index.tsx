// ** MUI Imports
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

// ** Styled Component
import RequestSheetEditInitialReviewCard from 'src/views/management/request-sheet/edit/cards/review/initial'
import RequestSheetEditInitialReviewEditCard from 'src/views/management/request-sheet/edit/cards/review/initial/edit'

// ** Types
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
  isEditMode: boolean
}

const InitialReviewTabPanel = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity, isEditMode } = props

  return (
    <Grid item xs={12}>
      <Fade in>
        <Grid container spacing={6}>
          {isEditMode ? (
            <Grid item xs={12}>
              <RequestSheetEditInitialReviewEditCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <RequestSheetEditInitialReviewCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
        </Grid>
      </Fade>
    </Grid>
  )
}

export default InitialReviewTabPanel
