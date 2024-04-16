// ** MUI Imports
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

// ** Custom Component Imports
import RequestSheetEditDetailsCard from 'src/views/management/request-sheet/edit/cards/details'
import RequestSheetEditDetailsEditCard from 'src/views/management/request-sheet/edit/cards/details/edit'
import RequestSheetEditProposalFileCard from 'src/views/management/request-sheet/edit/cards/proposal-file'
import RequestSheetEditProposalFileEditCard from 'src/views/management/request-sheet/edit/cards/proposal-file/edit'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
  isEditMode: boolean
}

const DetailsTabPanel = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity, isEditMode } = props

  return (
    <Grid item xs={12}>
      <Fade in>
        <Grid container spacing={6}>
          {isEditMode ? (
            <Grid item xs={12}>
              <RequestSheetEditDetailsEditCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <RequestSheetEditDetailsCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
          {isEditMode ? (
            <Grid item xs={12}>
              <RequestSheetEditProposalFileEditCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <RequestSheetEditProposalFileCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
        </Grid>
      </Fade>
    </Grid>
  )
}

export default DetailsTabPanel
