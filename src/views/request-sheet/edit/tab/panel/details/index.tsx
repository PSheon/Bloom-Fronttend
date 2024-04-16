// ** MUI Imports
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

// ** Custom Component Imports
import RequestSheetEditDetailsCard from 'src/views/request-sheet/edit/cards/details'
import RequestSheetEditDetailsEditCard from 'src/views/request-sheet/edit/cards/details/edit'
import RequestSheetEditProposalFileCard from 'src/views/request-sheet/edit/cards/proposal-file'
import RequestSheetEditProposalFileEditCard from 'src/views/request-sheet/edit/cards/proposal-file/edit'

// ** Util Imports
import { getRequestSheetProcessStatusAttributes } from 'src/utils'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const DetailsTabPanel = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Hooks
  const { views } = getRequestSheetProcessStatusAttributes(initRequestSheetEntity.processStatus)

  return (
    <Grid item xs={12}>
      <Fade in>
        <Grid container spacing={6}>
          {views.applicant.details === 'view' && (
            <Grid item xs={12}>
              <RequestSheetEditDetailsCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
          {views.applicant.details === 'edit' && (
            <Grid item xs={12}>
              <RequestSheetEditDetailsEditCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
          {views.applicant.details === 'view' && (
            <Grid item xs={12}>
              <RequestSheetEditProposalFileCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
          {views.applicant.details === 'edit' && (
            <Grid item xs={12}>
              <RequestSheetEditProposalFileEditCard initRequestSheetEntity={initRequestSheetEntity} />
            </Grid>
          )}
        </Grid>
      </Fade>
    </Grid>
  )
}

export default DetailsTabPanel
