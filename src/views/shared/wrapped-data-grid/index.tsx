// ** MUI Imports
import { DataGrid, DataGridProps, GridColDef, GridRowId, GridRowParams, zhTW } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components
import ExportToolbar from 'src/views/shared/wrapped-data-grid/ExportToolbar'

const WrappedDataGrid = (props: DataGridProps) => {
  return (
    <DataGrid
      keepNonExistentRowsSelected
      localeText={zhTW.components.MuiDataGrid.defaultProps.localeText}
      slots={{ toolbar: ExportToolbar, loadingOverlay: LinearProgress }}
      {...props}
    />
  )
}

export type { GridColDef, GridRowId, GridRowParams }
export default WrappedDataGrid
