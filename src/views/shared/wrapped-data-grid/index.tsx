// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Component Imports
import ToolbarOverlay from 'src/views/shared/wrapped-data-grid/ToolbarOverlay'
import NoRowsOverlay from 'src/views/shared/wrapped-data-grid/NoRowsOverlay'
import NoResultsOverlay from 'src/views/shared/wrapped-data-grid/NoResultsOverlay'

// ** Type Imports
import type {
  DataGridProps,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridSlots,
  GridRenderCellParams
} from '@mui/x-data-grid'

const WrappedDataGrid = (props: DataGridProps) => {
  // ** Props
  const { sx, ...restProps } = props

  return (
    <DataGrid
      keepNonExistentRowsSelected
      slots={{
        toolbar: ToolbarOverlay,
        loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
        noRowsOverlay: NoRowsOverlay,
        noResultsOverlay: NoResultsOverlay
      }}
      sx={{
        '--DataGrid-overlayHeight': '300px',
        '& .MuiDataGrid-container--top [role=row]': {
          backgroundColor: theme => theme.palette.customColors.tableHeaderBg
        },
        '& .MuiDataGrid-virtualScroller': { borderRadius: '0 !important' },
        '& .MuiDataGrid-columnHeaderTitle': { textTransform: 'inherit' },
        ...sx
      }}
      {...restProps}
    />
  )
}

export type { GridColDef, GridRenderCellParams, GridRowId, GridRowParams }
export default WrappedDataGrid
