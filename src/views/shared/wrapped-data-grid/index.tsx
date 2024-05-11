// ** MUI Imports
import { DataGrid, zhTW } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Component Imports
import ExportToolbar from 'src/views/shared/wrapped-data-grid/ExportToolbar'

// ** Type Imports
import type { DataGridProps, GridColDef, GridRowId, GridRowParams } from '@mui/x-data-grid'

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
