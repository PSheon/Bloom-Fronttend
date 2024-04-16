// ** React Imports
import { useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import MediaAssetSelectorListTableHeader from 'src/views/shared/media-asset-selector/list/TableHeader'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/mediaAsset'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getMediaAssetFileAttributes, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { MediaAssetType } from 'src/types/api/mediaAssetTypes'

interface CellType {
  row: MediaAssetType
}
interface Props {
  handleSelect: (newSelectedMediaAssetId: number) => void
}

const MediaAssetSelectorList = (props: Props) => {
  // ** Props
  const { handleSelect } = props

  // ** States
  const [filteredMediaAssetName, setFilteredMediaAssetName] = useState<string>('')
  const [filteredExtension, setFilteredExtension] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredMediaAssetName = useDebounce(filteredMediaAssetName, 300)

  // ** Hooks
  const { data: mediaAssetsData, isLoading: isMediaAssetListLoading } = useFindQuery({
    filters: {
      ...(debouncedFilteredMediaAssetName !== '' && {
        $or: [{ name: { $containsi: debouncedFilteredMediaAssetName } }]
      }),
      ...(filteredExtension !== 'all' && { ext: filteredExtension })
    },
    sort: ['createdAt:DESC'],
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  // ** Vars
  const mediaAssets = mediaAssetsData?.data || []
  const totalRows = mediaAssetsData?.meta.pagination.total || 0
  const columns: GridColDef[] = [
    {
      flex: 1,
      field: 'id',
      headerName: '編號',
      renderCell: ({ row }: CellType) => <Typography noWrap>{`#${row.id}`}</Typography>
    },

    {
      flex: 1,
      minWidth: 80,
      field: 'preview',
      headerName: '預覽',
      renderCell: ({ row }: CellType) => renderPreview(row)
    },
    {
      flex: 6,
      minWidth: 280,
      field: 'name',
      headerName: '檔案名稱',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'ext',
      minWidth: 80,
      headerName: '類型',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {row.ext}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'size',
      headerName: '大小',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {getMediaAssetFileAttributes(row).formattedSize}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 200,
      field: 'createdAt',
      headerName: '建立日期',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.createdAt), 'PPpp')}
        </Typography>
      )
    }
  ]

  // ** renders preview column
  const renderPreview = (row: MediaAssetType) => {
    const isImage = getMediaAssetFileAttributes(row).isImage
    if (isImage) {
      return (
        <CustomAvatar src={getPublicMediaAssetUrl(row.formats?.thumbnail?.url)} sx={{ mr: 3, width: 34, height: 34 }} />
      )
    } else {
      return (
        <CustomAvatar skin='light' color='primary' sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
          {getInitials(row.ext)}
        </CustomAvatar>
      )
    }
  }

  // ** Logics
  const handleFilterMediaAssetName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredMediaAssetName(e.target.value)
  }, [])
  const handleFilterExtensionChange = useCallback((e: SelectChangeEvent) => {
    setFilteredExtension(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MediaAssetSelectorListTableHeader
          filteredMediaAssetName={filteredMediaAssetName}
          handleFilterMediaAssetName={handleFilterMediaAssetName}
          filteredExtension={filteredExtension}
          handleFilterExtensionChange={handleFilterExtensionChange}
        />
      </Grid>

      <Grid item xs={12}>
        <DataGrid
          autoHeight
          loading={isMediaAssetListLoading}
          rows={mediaAssets}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={params => {
            if (params.length > 1) {
              params.shift()
            }
            handleSelect(params[0] as number)
          }}
          pageSizeOptions={[10]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={totalRows}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      </Grid>
    </Grid>
  )
}

export default MediaAssetSelectorList
