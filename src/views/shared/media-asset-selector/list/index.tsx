// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

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
import type { ChangeEvent } from 'react'
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { MediaAssetType } from 'src/types/api/mediaAssetTypes'

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
      field: 'id',
      display: 'flex',
      minWidth: 60,
      headerName: '# ID',
      renderCell: ({ row }: GridRenderCellParams<MediaAssetType>) => <Typography noWrap>{`#${row.id}`}</Typography>
    },

    {
      field: 'preview',
      display: 'flex',
      minWidth: 80,
      headerName: '預覽',
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: GridRenderCellParams<MediaAssetType>) => renderPreview(row)
    },
    {
      field: 'name',
      display: 'flex',
      minWidth: 350,
      headerName: '檔案名稱',
      renderCell: ({ row }: GridRenderCellParams<MediaAssetType>) => (
        <Typography noWrap variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
          {row.name}
        </Typography>
      )
    },
    {
      field: 'ext',
      display: 'flex',
      minWidth: 80,
      headerName: '類型',
      renderCell: ({ row }: GridRenderCellParams<MediaAssetType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {row.ext}
        </Typography>
      )
    },
    {
      field: 'size',
      display: 'flex',
      minWidth: 120,
      headerName: '大小',
      renderCell: ({ row }: GridRenderCellParams<MediaAssetType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {getMediaAssetFileAttributes(row).formattedSize}
        </Typography>
      )
    },
    {
      field: 'createdAt',
      display: 'flex',
      minWidth: 280,
      headerName: '建立日期',
      renderCell: ({ row }: GridRenderCellParams<MediaAssetType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
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
        <CustomAvatar
          variant='rounded'
          src={getPublicMediaAssetUrl(row.formats?.thumbnail?.url)}
          sx={{ width: 34, height: 34 }}
        />
      )
    } else {
      return (
        <CustomAvatar variant='rounded' skin='light' color='primary' sx={{ width: 34, height: 34, fontSize: '1rem' }}>
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
        />
      </Grid>
    </Grid>
  )
}

export default MediaAssetSelectorList
