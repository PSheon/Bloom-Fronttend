// ** React Imports
import { useState, useCallback, ChangeEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ManagementBlogListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementBlogListHeaderCardContent from 'src/views/management/blog/list/ManagementBlogListHeaderCardContent'
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

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
import { BlogType } from 'src/types/api/blogTypes'

interface CellType {
  row: BlogType
}

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
      flex: 1,
      minWidth: 60,
      field: 'id',
      headerName: '編號',
      renderCell: ({ row }: CellType) => (
        <LinkStyled href={`/management/blog/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      flex: 5,
      minWidth: 150,
      field: 'displayName',
      headerName: '標題',
      renderCell: ({ row }: CellType) => (
        <LinkStyled
          href={`/management/blog/edit/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.displayName}
        </LinkStyled>
      )
    },
    {
      flex: 2,
      minWidth: 150,
      field: 'category',
      headerName: '分類',
      renderCell: ({ row }: CellType) => (
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
      headerName: '建立日期',
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
      field: 'status',
      headerName: '發布狀態',
      renderCell: ({ row }: CellType) => {
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
              <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/management/blog/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? '已加星號' : '未加星號'}>
              <IconButton
                size='small'
                sx={{ mr: 0.5 }}
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightBlog(id, !isHighlighted)}
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
