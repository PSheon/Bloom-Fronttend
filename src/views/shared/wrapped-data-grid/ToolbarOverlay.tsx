// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import { GridToolbarExport, useGridApiContext, useGridSelector, gridRowSelectionStateSelector } from '@mui/x-data-grid'

const ToolbarOverlay = () => {
  // ** Hooks
  const apiRef = useGridApiContext()
  const selectedRows = useGridSelector(apiRef, gridRowSelectionStateSelector)

  return (
    <Collapse in={selectedRows.length > 0} mountOnEnter unmountOnExit>
      <Stack
        spacing={6}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ p: theme => theme.spacing(2, 5) }}
      >
        <Typography variant='subtitle2'>{`${selectedRows.length} row${selectedRows.length > 1 ? 's' : ''} selected`}</Typography>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </Stack>
    </Collapse>
  )
}

export default ToolbarOverlay
