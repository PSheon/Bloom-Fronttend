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
import ManagementBlogListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementBlogListHeaderCardContent from 'src/views/management/blog/list/ManagementBlogListHeaderCardContent'
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery, useUpdateOneMutation } from 'src/store/api/management/blog'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl, getBlogStatusProperties } from 'src/utils'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { BlogType } from 'src/types/blogTypes'

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

const ManagementBlogListPage = () => {
  // ** States
  const [filteredBlogDisplayname, setFilteredBlogDisplayname] = useState<string>('')
  const [filteredIsPublished, setFilteredIsPublished] = useState<string>('all')
  const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredBlogDisplayname = useDebounce(filteredBlogDisplayname, 300)

  // ** Hooks
  const {
    data: blogsData,
    isLoading: isBlogListLoading,
    refetch: refetchBlogList,
    isFetching: isBlogListFetching
  } = useFindQuery({
    filters: {
      ...(debouncedFilteredBlogDisplayname !== '' && {
        $or: [{ displayName: { $containsi: debouncedFilteredBlogDisplayname } }]
      }),
      ...(filteredIsPublished !== 'all' && { isPublished: filteredIsPublished === 'isPublished' }),
      ...(filteredIsHighlighted !== 'all' && { isHighlighted: filteredIsHighlighted === 'isHighlighted' })
    },
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  const [updateBlog] = useUpdateOneMutation()

  // ** Vars
  const blogs = blogsData?.data || []
  const totalRows = blogsData?.meta.pagination.total || 0

  const columns: GridColDef[] = [
    {
      field: 'id',
      minWidth: 60,
      headerName: '# ID',
      renderCell: ({ row }: GridRenderCellParams<BlogType>) => (
        <LinkStyled href={`/management/blog/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      field: 'displayName',
      minWidth: 450,
      headerName: '標題',
      renderCell: ({ row }: GridRenderCellParams<BlogType>) => (
        <LinkStyled
          href={`/management/blog/edit/${row.id}`}
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
      renderCell: ({ row }: GridRenderCellParams<BlogType>) => (
        <Typography
          noWrap
          variant='body2'
          sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '22px', letterSpacing: '.1px' }}
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
      renderCell: ({ row }: GridRenderCellParams<BlogType>) => {
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
                sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '22px', letterSpacing: '.1px' }}
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
      valueGetter: (data: BlogType) => data.author?.data?.attributes.username
    },
    {
      field: 'status',
      display: 'flex',
      minWidth: 100,
      headerName: '發布狀態',
      renderCell: ({ row }: GridRenderCellParams<BlogType>) => {
        const blogStatusProperties = getBlogStatusProperties(row.status)

        return (
          <CustomChip
            skin='light'
            size='small'
            rounded
            label={blogStatusProperties.displayName}
            color={blogStatusProperties.color}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      field: 'createdAt',
      display: 'flex',
      minWidth: 100,
      headerName: '建立日期',
      renderCell: ({ row }: GridRenderCellParams<BlogType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.createdAt), 'MM/dd/yyyy')}
        </Typography>
      ),
      valueGetter: (data: BlogType['createdAt']) => format(new Date(data), 'MM/dd/yyyy')
    },
    {
      field: 'actions',
      display: 'flex',
      minWidth: 100,
      sortable: false,
      headerName: '操作',
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: GridRenderCellParams<BlogType>) => {
        const { id, isHighlighted } = row

        return (
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <Tooltip title='Edit'>
              <IconButton size='small' component={Link} href={`/management/blog/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? 'Starred' : 'Star'}>
              <IconButton
                size='small'
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightBlog(id, !isHighlighted)}
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
  const handleFilterBlogDisplayname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredBlogDisplayname(e.target.value)
  }, [])

  const handleFilterIsPublishedChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsPublished(e.target.value)
  }, [])

  const handleIsHighlightedChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsHighlighted(e.target.value)
  }, [])

  const handleHighlightBlog = async (id: number, isHighlighted: boolean) => {
    await updateBlog({ id, data: { isHighlighted } })
  }

  const handleRefetchBlogList = () => {
    refetchBlogList()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementBlogListBreadcrumbs pageLevels={[{ title: '文章管理' }]} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <ManagementBlogListHeaderCardContent
            filteredBlogDisplayname={filteredBlogDisplayname}
            handleFilterBlogDisplayname={handleFilterBlogDisplayname}
            filteredIsPublished={filteredIsPublished}
            handleFilterIsPublishedChange={handleFilterIsPublishedChange}
            filteredIsHighlighted={filteredIsHighlighted}
            handleIsHighlightedChange={handleIsHighlightedChange}
            handleRefetchBlogList={handleRefetchBlogList}
          />
          <DataGrid
            autoHeight
            rows={blogs}
            loading={isBlogListLoading || isBlogListFetching}
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

ManagementBlogListPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementBlogListPage
