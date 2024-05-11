// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ManagementAnnouncementListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementAnnouncementListHeaderCardContent from 'src/views/management/announcement/list/ManagementAnnouncementListHeaderCardContent'
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery, useUpdateOneMutation } from 'src/store/api/management/announcement'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl, getAnnouncementStatusProperties } from 'src/utils'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { AnnouncementType } from 'src/types/api/announcementTypes'

// ** Styled components
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

const ManagementAnnouncementListPage = () => {
  // ** States
  const [filteredAnnouncementDisplayname, setFilteredAnnouncementDisplayname] = useState<string>('')
  const [filteredIsPublished, setFilteredIsPublished] = useState<string>('all')
  const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredAnnouncementDisplayname = useDebounce(filteredAnnouncementDisplayname, 300)

  // ** Hooks
  const {
    data: announcementsData,
    isLoading: isAnnouncementListLoading,
    refetch: refetchAnnouncementList,
    isFetching: isAnnouncementListFetching
  } = useFindQuery({
    filters: {
      ...(debouncedFilteredAnnouncementDisplayname !== '' && {
        $or: [{ displayName: { $containsi: debouncedFilteredAnnouncementDisplayname } }]
      }),
      ...(filteredIsPublished !== 'all' && { isPublished: filteredIsPublished === 'isPublished' }),
      ...(filteredIsHighlighted !== 'all' && { isHighlighted: filteredIsHighlighted === 'isHighlighted' })
    },
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  const [updateAnnouncement] = useUpdateOneMutation()

  // ** Vars
  const announcements = announcementsData?.data || []
  const totalRows = announcementsData?.meta.pagination.total || 0

  const columns: GridColDef[] = [
    {
      field: 'id',
      minWidth: 60,
      headerName: '# ID',
      renderCell: ({ row }: GridRenderCellParams<AnnouncementType>) => (
        <LinkStyled href={`/management/announcement/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      field: 'displayName',
      minWidth: 450,
      headerName: '標題',
      renderCell: ({ row }: GridRenderCellParams<AnnouncementType>) => (
        <LinkStyled
          href={`/management/announcement/edit/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.displayName}
        </LinkStyled>
      )
    },
    {
      field: 'category',
      display: 'flex',
      minWidth: 150,
      headerName: '分類',
      renderCell: ({ row }: GridRenderCellParams<AnnouncementType>) => (
        <Typography
          noWrap
          variant='body2'
          color='text.primary'
          sx={{ fontWeight: 600, lineHeight: '22px', letterSpacing: '.1px' }}
        >
          {row.category}
        </Typography>
      )
    },
    {
      field: 'author',
      display: 'flex',
      minWidth: 250,
      headerName: '作者',
      renderCell: ({ row }: GridRenderCellParams<AnnouncementType>) => {
        const { username, email } = row.author?.data?.attributes || {}

        return (
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            {row.author.data?.attributes?.avatar ? (
              <CustomAvatar
                variant='rounded'
                src={getPublicMediaAssetUrl(row.author.data.attributes.avatar.data?.attributes.url)}
                sx={{ width: 34, height: 34 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                color='primary'
                variant='rounded'
                sx={{ fontSize: '1rem', width: 34, height: 34 }}
              >
                {getInitials(row.author.data?.attributes.username || 'John Doe')}
              </CustomAvatar>
            )}
            <Stack alignItems='flex-start' justifyContent='center'>
              <Typography
                noWrap
                variant='body2'
                color='text.secondary'
                sx={{ fontWeight: 600, lineHeight: '22px', letterSpacing: '.1px' }}
              >
                {username}
              </Typography>
              <Typography noWrap variant='caption'>
                {email}
              </Typography>
            </Stack>
          </Stack>
        )
      },
      valueGetter: (data: AnnouncementType) => data.author?.data?.attributes.username
    },
    {
      field: 'status',
      display: 'flex',
      minWidth: 100,
      headerName: '發布狀態',
      renderCell: ({ row }: GridRenderCellParams<AnnouncementType>) => {
        const announcementStatusProperties = getAnnouncementStatusProperties(row.status)

        return (
          <CustomChip
            skin='light'
            size='small'
            rounded
            label={announcementStatusProperties.displayName}
            color={announcementStatusProperties.color}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      field: 'createdAt',
      display: 'flex',
      minWidth: 100,
      headerName: '公告日期',
      renderCell: ({ row }: GridRenderCellParams<AnnouncementType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.createdAt), 'MM/dd/yyyy')}
        </Typography>
      ),
      valueGetter: (data: AnnouncementType['createdAt']) => format(new Date(data), 'MM/dd/yyyy')
    },
    {
      field: 'actions',
      display: 'flex',
      minWidth: 100,
      sortable: false,
      headerName: '操作',
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: GridRenderCellParams<AnnouncementType>) => {
        const { id, isHighlighted } = row

        return (
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <Tooltip title='Edit'>
              <IconButton size='small' component={Link} href={`/management/announcement/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? 'Starred' : 'Star'}>
              <IconButton
                size='small'
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightAnnouncement(id, !isHighlighted)}
              >
                <Icon icon={isHighlighted ? 'mdi:star' : 'mdi:star-outline'} />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
    }
  ]

  // ** Logics
  const handleFilterAnnouncementDisplayname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredAnnouncementDisplayname(e.target.value)
  }, [])

  const handleFilterIsPublishedChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsPublished(e.target.value)
  }, [])

  const handleIsHighlightedChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsHighlighted(e.target.value)
  }, [])

  const handleHighlightAnnouncement = async (id: number, isHighlighted: boolean) => {
    await updateAnnouncement({ id, data: { isHighlighted } })
  }

  const handleRefetchAnnouncementList = () => {
    refetchAnnouncementList()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementAnnouncementListBreadcrumbs pageLevels={[{ title: '公告管理' }]} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <ManagementAnnouncementListHeaderCardContent
            filteredAnnouncementDisplayname={filteredAnnouncementDisplayname}
            handleFilterAnnouncementDisplayname={handleFilterAnnouncementDisplayname}
            filteredIsPublished={filteredIsPublished}
            handleFilterIsPublishedChange={handleFilterIsPublishedChange}
            filteredIsHighlighted={filteredIsHighlighted}
            handleIsHighlightedChange={handleIsHighlightedChange}
            handleRefetchAnnouncementList={handleRefetchAnnouncementList}
          />
          <DataGrid
            autoHeight
            rows={announcements}
            loading={isAnnouncementListLoading || isAnnouncementListFetching}
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

ManagementAnnouncementListPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementAnnouncementListPage
