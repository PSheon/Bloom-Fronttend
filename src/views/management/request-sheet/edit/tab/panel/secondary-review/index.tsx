// ** MUI Imports
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

// ** Custom Component Imports
import RequestSheetEditSecondaryReviewCard from 'src/views/management/request-sheet/edit/cards/review/secondary'
import RequestSheetEditSecondaryReviewEditCard from 'src/views/management/request-sheet/edit/cards/review/secondary/edit'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
  isEditMode: boolean
}

const SecondaryReviewTabPanel = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity, isEditMode } = props

  return (
    <Grid item xs={12}>
      <Fade in>
        <Grid container spacing={6}>
          {isEditMode ? (
            <Grid item xs={12}>
              <RequestSheetEditSecondaryReviewEditCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <RequestSheetEditSecondaryReviewCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
        </Grid>
      </Fade>
    </Grid>
  )
}

export default SecondaryReviewTabPanel
