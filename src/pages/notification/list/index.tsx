// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import DataGrid from 'src/views/shared/wrapped-data-grid'
import NotificationListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import NotificationListHeaderCardContent from 'src/views/notification/list/HeaderCardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/notification'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { NotificationType } from 'src/types/notificationTypes'
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'

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
      field: 'id',
      maxWidth: 60,
      headerName: '#',
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => (
        <LinkStyled href={`/notification/read/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      field: 'title',
      minWidth: 550,
      headerName: 'Title',
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => (
        <LinkStyled
          href={`/notification/read/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.title}
        </LinkStyled>
      )
    },
    {
      field: 'createdAt',
      display: 'flex',
      minWidth: 125,
      headerName: 'Date',
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.createdAt), 'MM/dd/yyyy')}
        </Typography>
      ),
      valueGetter: (data: NotificationType['createdAt']) => format(new Date(data), 'MM/dd/yyyy')
    },
    {
      field: 'isSeen',
      display: 'flex',
      minWidth: 120,
      headerName: 'Status',
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => (
        <CustomChip
          skin='light'
          size='small'
          rounded
          label={row.isSeen ? 'Seen' : 'Not seen'}
          color={row.isSeen ? 'success' : 'warning'}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      ),
      valueGetter: (data: NotificationType['isSeen']) => (data ? 'Seen' : 'Not Seen')
    },
    {
      field: 'actions',
      display: 'flex',
      minWidth: 130,
      headerName: 'Actions',
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => (
        <Stack direction='row' spacing={0.5} alignItems='center'>
          <Tooltip title='Edit'>
            <IconButton size='small' component={Link} href={`/notification/read/${row.id}`}>
              <Icon icon='mdi:eye-outline' />
            </IconButton>
          </Tooltip>
        </Stack>
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
        <NotificationListBreadcrumbs pageLevels={[{ title: 'PageBreadcrumb.General.Notifications.PageTitle' }]} />
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
