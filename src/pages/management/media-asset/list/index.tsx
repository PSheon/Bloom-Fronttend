// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled, lighten } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import toast from 'react-hot-toast'
import copyToClipboard from 'clipboard-copy'
import { format } from 'date-fns'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ManagementMediaAssetListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementMediaAssetListHeaderCardContent from 'src/views/management/media-asset/list/ManagementMediaAssetListHeaderCardContent'
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/mediaAsset'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getMediaAssetFileAttributes, getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { MediaAssetType } from 'src/types/api/mediaAssetTypes'

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const ManagementMediaAssetListPage = () => {
  // ** States
  const [filteredMediaAssetName, setFilteredMediaAssetName] = useState<string>('')
  const [filteredExtension, setFilteredExtension] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredMediaAssetName = useDebounce(filteredMediaAssetName, 300)

  // ** Hooks
  const {
    data: mediaAssetsData,
    isLoading: isMediaAssetListLoading,
    refetch: refetchMediaAssetList,
    isFetching: isMediaAssetListFetching
  } = useFindQuery({
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
      minWidth: 60,
      headerName: '# ID',
      renderCell: ({ row }: GridRenderCellParams<MediaAssetType>) => (
        <LinkStyled href={`/management/media-asset/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
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
        <LinkStyled
          href={`/management/media-asset/edit/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.name}
        </LinkStyled>
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
      ),
      valueGetter: (data: MediaAssetType['createdAt']) => format(new Date(data), 'PPpp')
    },
    {
      field: 'actions',
      display: 'flex',
      minWidth: 130,
      headerName: '操作',
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: GridRenderCellParams<MediaAssetType>) => {
        const { id, url } = row

        return (
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <Tooltip title='Edit'>
              <IconButton size='small' component={Link} href={`/management/media-asset/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title='複製連結'>
              <IconButton size='small' onClick={() => handleCopyUrlClick(url)}>
                <Icon icon='mdi:content-copy' />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
    }
  ]

  // ** renders preview column
  const renderPreview = (row: MediaAssetType) => {
    const { width, height } = row
    const { isImage } = getMediaAssetFileAttributes(row)

    if (isImage && width && height) {
      const formattedWidth = 280
      const formattedHeight = (formattedWidth * height) / width

      return (
        <Tooltip
          disableFocusListener
          title={
            <img
              src={getPublicMediaAssetUrl(row.formats?.thumbnail?.url)}
              alt={getInitials(row.name)}
              width={formattedWidth}
              height={formattedHeight}
            />
          }
        >
          <CustomAvatar
            variant='rounded'
            src={getPublicMediaAssetUrl(row.formats?.thumbnail?.url)}
            sx={{
              width: 34,
              height: 34,
              border: theme => `2px solid ${lighten(theme.palette.background.paper, 0.1)}`,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          />
        </Tooltip>
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

  const handleCopyUrlClick = (mediaAssetUrl: string) => {
    copyToClipboard(getPublicMediaAssetUrl(mediaAssetUrl))
    toast.success('已複製檔案連結')
  }

  const handleRefetchMediaAssetList = () => {
    refetchMediaAssetList()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementMediaAssetListBreadcrumbs pageLevels={[{ title: '檔案管理' }]} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <ManagementMediaAssetListHeaderCardContent
            filteredMediaAssetName={filteredMediaAssetName}
            handleFilterMediaAssetName={handleFilterMediaAssetName}
            filteredExtension={filteredExtension}
            handleFilterExtensionChange={handleFilterExtensionChange}
            handleRefetchMediaAssetList={handleRefetchMediaAssetList}
          />
          <DataGrid
            autoHeight
            loading={isMediaAssetListLoading || isMediaAssetListFetching}
            rows={mediaAssets}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationMode='server'
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={totalRows}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

ManagementMediaAssetListPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementMediaAssetListPage
