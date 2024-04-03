// ** React Imports
import { useState, useCallback, ChangeEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Hooks Import
import useDebounce from 'src/hooks/useDebounce'

// ** Api Imports
import { useFindQuery, useUpdateOneMutation } from 'src/store/api/management/announcement'

// ** Types Imports
import { AnnouncementType } from 'src/types/api/announcementTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Styled Components
import AnnouncementListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import AnnouncementListHeaderCardContent from 'src/views/management/announcement/list/HeaderCardContent'
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

interface CellType {
  row: AnnouncementType
}

// ** Styled component for the link in the dataTable
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

const AnnouncementListPage = () => {
  // ** State
  const [filteredAnnouncementDisplayname, setFilteredAnnouncementDisplayname] = useState<string>('')
  const [filteredIsPublished, setFilteredIsPublished] = useState<string>('all')
  const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredAnnouncementDisplayname = useDebounce(filteredAnnouncementDisplayname, 300)

  // ** Hooks
  const { data: announcementsData, isLoading: isAnnouncementListLoading } = useFindQuery({
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
      flex: 1,
      minWidth: 60,
      field: 'id',
      headerName: '編號',
      renderCell: ({ row }: CellType) => (
        <LinkStyled href={`/management/announcement/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      flex: 5,
      minWidth: 150,
      field: 'displayName',
      headerName: '標題',
      renderCell: ({ row }: CellType) => (
        <LinkStyled
          href={`/management/announcement/edit/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.displayName}
        </LinkStyled>
      )
    },
    {
      flex: 2,
      field: 'author',
      minWidth: 250,
      headerName: '作者',
      renderCell: ({ row }: CellType) => {
        const { username, email } = row.author?.data?.attributes || {}

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {row.author.data?.attributes?.avatar ? (
              <CustomAvatar
                variant='rounded'
                src={getPublicMediaAssetUrl(row.author.data.attributes.avatar.data?.attributes.url)}
                sx={{ mr: 3, width: 34, height: 34 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                color='primary'
                variant='rounded'
                sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
              >
                {getInitials(row.author.data?.attributes.username || 'John Doe')}
              </CustomAvatar>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='body2'
                sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '22px', letterSpacing: '.1px' }}
              >
                {username}
              </Typography>
              <Typography noWrap variant='caption'>
                {email}
              </Typography>
            </Box>
          </Box>
        )
      },
      valueGetter: ({ row }: CellType) => row.author?.data?.attributes.username
    },
    {
      flex: 1,
      minWidth: 100,
      field: 'createdAt',
      headerName: '公告日期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.createdAt), 'MM/dd/yyyy')}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) => format(new Date(row.createdAt), 'MM/dd/yyyy')
    },
    {
      flex: 1,
      minWidth: 100,
      field: 'isPublished',
      headerName: '發布狀態',
      renderCell: ({ row }: CellType) => {
        const { isPublished } = row

        return (
          <CustomChip
            skin='light'
            size='small'
            rounded
            label={isPublished ? '已發布' : '未發布'}
            color={isPublished ? 'success' : 'info'}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      },
      valueGetter: ({ row }: CellType) => (row.isPublished ? '已發布' : '未發布')
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: '操作',
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: CellType) => {
        const { id, isHighlighted } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='查看'>
              <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/management/announcement/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? '已加星號' : '未加星號'}>
              <IconButton
                size='small'
                sx={{ mr: 0.5 }}
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightAnnouncement(id, !isHighlighted)}
              >
                <Icon icon={isHighlighted ? 'mdi:star' : 'mdi:star-outline'} />
              </IconButton>
            </Tooltip>
          </Box>
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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AnnouncementListBreadcrumbs pageLevels={[{ title: '公告管理' }]} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <AnnouncementListHeaderCardContent
            filteredAnnouncementDisplayname={filteredAnnouncementDisplayname}
            handleFilterAnnouncementDisplayname={handleFilterAnnouncementDisplayname}
            filteredIsPublished={filteredIsPublished}
            handleFilterIsPublishedChange={handleFilterIsPublishedChange}
            filteredIsHighlighted={filteredIsHighlighted}
            handleIsHighlightedChange={handleIsHighlightedChange}
          />
          <DataGrid
            autoHeight
            rows={announcements}
            loading={isAnnouncementListLoading}
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

AnnouncementListPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default AnnouncementListPage
