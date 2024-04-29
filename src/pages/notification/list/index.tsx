// ** React Imports
import { useState, useCallback, ChangeEvent } from 'react'

// ** Next Imports
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

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/notification'

// ** Type Imports
import { NotificationType } from 'src/types/api/notificationTypes'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'
import NotificationListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import NotificationListHeaderCardContent from 'src/views/notification/list/HeaderCardContent'

interface CellType {
  row: NotificationType
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

const NotificationListPage = () => {
  // ** States
  const [filteredNotificationTitle, setFilteredNotificationTitle] = useState<string>('')
  const [filteredIsSeen, setFilteredIsSeen] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredNotificationTitle = useDebounce(filteredNotificationTitle, 300)

  // ** Hooks
  const { data: notificationsData, isLoading: isNotificationListLoading } = useFindMeQuery({
    filters: {
      ...(debouncedFilteredNotificationTitle !== '' && {
        $or: [{ title: { $containsi: debouncedFilteredNotificationTitle } }]
      }),
      ...(filteredIsSeen !== 'all' && { isSeen: filteredIsSeen === 'isSeen' })
    },
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  // ** Vars
  const notifications = notificationsData?.data || []
  const totalRows = notificationsData?.meta.pagination.total || 0
  const columns: GridColDef[] = [
    {
      flex: 1,
      maxWidth: 90,
      field: 'id',
      headerName: '編號',
      renderCell: ({ row }: CellType) => <LinkStyled href={`/notification/read/${row.id}`}>{`#${row.id}`}</LinkStyled>
    },
    {
      flex: 2,
      minWidth: 150,
      field: 'title',
      headerName: '標題',
      renderCell: ({ row }: CellType) => (
        <LinkStyled
          href={`/notification/read/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.title}
        </LinkStyled>
      )
    },
    {
      flex: 1,
      minWidth: 125,
      field: 'createdAt',
      headerName: '通知日期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.createdAt), 'MM/dd/yyyy')}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) => format(new Date(row.createdAt), 'MM/dd/yyyy')
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'isSeen',
      headerName: '閱讀狀態',
      renderCell: ({ row }: CellType) => (
        <CustomChip
          skin='light'
          size='small'
          rounded
          label={row.isSeen ? '已閱讀' : '未閱讀'}
          color={row.isSeen ? 'success' : 'warning'}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      ),
      valueGetter: ({ row }: CellType) => (row.isSeen ? '已閱讀' : '未閱讀')
    },
    {
      flex: 1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: '操作',
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='查看'>
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/notification/read/${row.id}`}>
              <Icon icon='mdi:eye-outline' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  // ** Logics
  const handleFilterNotificationTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredNotificationTitle(e.target.value)
  }, [])
  const handleFilterIsSeenChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsSeen(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <NotificationListBreadcrumbs pageLevels={[{ title: '我的通知' }]} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <NotificationListHeaderCardContent
            filteredNotificationTitle={filteredNotificationTitle}
            handleFilterNotificationTitle={handleFilterNotificationTitle}
            filteredIsSeen={filteredIsSeen}
            handleFilterIsSeenChange={handleFilterIsSeenChange}
          />
          <DataGrid
            autoHeight
            rows={notifications}
            loading={isNotificationListLoading}
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

NotificationListPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default NotificationListPage
