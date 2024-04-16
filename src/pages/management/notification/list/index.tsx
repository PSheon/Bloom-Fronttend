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

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import NotificationListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import NotificationListHeaderCardContent from 'src/views/management/notification/list/HeaderCardContent'
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery, useUpdateOneMutation } from 'src/store/api/management/notification'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { NotificationType } from 'src/types/api/notificationTypes'

interface CellType {
  row: NotificationType
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

const NotificationListPage = () => {
  // ** States
  const [filteredNotificationTitle, setFilteredNotificationTitle] = useState<string>('')
  const [filteredIsSeen, setFilteredIsSeen] = useState<string>('all')
  const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredNotificationTitle = useDebounce(filteredNotificationTitle, 300)

  // ** Hooks
  const { data: notificationsData, isLoading: isNotificationListLoading } = useFindQuery({
    filters: {
      ...(debouncedFilteredNotificationTitle !== '' && {
        $or: [{ title: { $containsi: debouncedFilteredNotificationTitle } }]
      }),
      ...(filteredIsSeen !== 'all' && { isSeen: filteredIsSeen === 'isSeen' }),
      ...(filteredIsHighlighted !== 'all' && { isHighlighted: filteredIsHighlighted === 'isHighlighted' })
    },
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })
  const [updateNotification] = useUpdateOneMutation()

  // ** Vars
  const notifications = notificationsData?.data || []
  const totalRows = notificationsData?.meta.pagination.total || 0
  const columns: GridColDef[] = [
    {
      flex: 1,
      minWidth: 60,
      field: 'id',
      headerName: '編號',
      renderCell: ({ row }: CellType) => (
        <LinkStyled href={`/management/notification/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      flex: 5,
      minWidth: 150,
      field: 'title',
      headerName: '標題',
      renderCell: ({ row }: CellType) => (
        <LinkStyled
          href={`/management/notification/edit/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.title}
        </LinkStyled>
      )
    },
    {
      flex: 2,
      field: 'notifier',
      minWidth: 250,
      headerName: '通知者',
      renderCell: ({ row }: CellType) => {
        const { username, email } = row.notifier?.data?.attributes || {}

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {row.notifier.data?.attributes?.avatar ? (
              <CustomAvatar
                variant='rounded'
                src={getPublicMediaAssetUrl(row.notifier.data.attributes.avatar.data?.attributes.url)}
                sx={{ mr: 3, width: 34, height: 34 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                color='primary'
                variant='rounded'
                sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
              >
                {getInitials(row.notifier.data?.attributes.username || 'John Doe')}
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
      valueGetter: ({ row }: CellType) => row.notifier?.data?.attributes.username
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
      minWidth: 100,
      field: 'isSeen',
      headerName: '閱讀狀態',
      renderCell: ({ row }: CellType) => {
        const { isSeen } = row

        return (
          <CustomChip
            skin='light'
            size='small'
            rounded
            label={isSeen ? '已閱讀' : '未閱讀'}
            color={isSeen ? 'success' : 'warning'}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      },
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
      renderCell: ({ row }: CellType) => {
        const { id, isHighlighted } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='查看'>
              <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/management/notification/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? '已加星號' : '未加星號'}>
              <IconButton
                size='small'
                sx={{ mr: 0.5 }}
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightNotification(id, !isHighlighted)}
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
  const handleFilterNotificationTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredNotificationTitle(e.target.value)
  }, [])
  const handleFilterIsSeenChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsSeen(e.target.value)
  }, [])
  const handleIsHighlightedChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsHighlighted(e.target.value)
  }, [])
  const handleHighlightNotification = async (id: number, isHighlighted: boolean) => {
    await updateNotification({ id, data: { isHighlighted } })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <NotificationListBreadcrumbs pageLevels={[{ title: '通知管理' }]} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <NotificationListHeaderCardContent
            filteredNotificationTitle={filteredNotificationTitle}
            handleFilterNotificationTitle={handleFilterNotificationTitle}
            filteredIsSeen={filteredIsSeen}
            handleFilterIsSeenChange={handleFilterIsSeenChange}
            filteredIsHighlighted={filteredIsHighlighted}
            handleIsHighlightedChange={handleIsHighlightedChange}
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
  subject: 'manager-page'
}

export default NotificationListPage
