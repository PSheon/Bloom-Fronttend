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
import ManagementNotificationListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementNotificationListHeaderCardContent from 'src/views/management/notification/list/ManagementNotificationListHeaderCardContent'
import DataGrid from 'src/views/shared/wrapped-data-grid'

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
import type { ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { NotificationType } from 'src/types/notificationTypes'

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

const ManagementNotificationListPage = () => {
  // ** States
  const [filteredNotificationTitle, setFilteredNotificationTitle] = useState<string>('')
  const [filteredIsSeen, setFilteredIsSeen] = useState<string>('all')
  const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredNotificationTitle = useDebounce(filteredNotificationTitle, 300)

  // ** Hooks
  const {
    data: notificationsData,
    isLoading: isNotificationListLoading,
    refetch: refetchNotificationList,
    isFetching: isNotificationListFetching
  } = useFindQuery({
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
      field: 'id',
      minWidth: 60,
      headerName: '# ID',
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => (
        <LinkStyled href={`/management/notification/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      field: 'title',
      minWidth: 350,
      headerName: '標題',
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => (
        <LinkStyled
          href={`/management/notification/edit/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.title}
        </LinkStyled>
      )
    },
    {
      field: 'notifier',
      display: 'flex',
      minWidth: 250,
      headerName: '通知者',
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => {
        const { username, email } = row.notifier?.data?.attributes || {}

        return (
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            {row.notifier.data?.attributes?.avatar ? (
              <CustomAvatar
                variant='rounded'
                src={getPublicMediaAssetUrl(row.notifier.data.attributes.avatar.data?.attributes.url)}
                sx={{ width: 34, height: 34 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                color='primary'
                variant='rounded'
                sx={{ fontSize: '1rem', width: 34, height: 34 }}
              >
                {getInitials(row.notifier.data?.attributes.username || 'John Doe')}
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
      valueGetter: (data: NotificationType['notifier']) => data?.data?.attributes.username
    },
    {
      field: 'createdAt',
      display: 'flex',
      minWidth: 125,
      headerName: '通知日期',
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
      minWidth: 100,
      headerName: '閱讀狀態',
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => {
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
      valueGetter: (data: NotificationType['isSeen']) => (data ? '已閱讀' : '未閱讀')
    },
    {
      field: 'actions',
      display: 'flex',
      minWidth: 130,
      headerName: 'Actions',
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: GridRenderCellParams<NotificationType>) => {
        const { id, isHighlighted } = row

        return (
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <Tooltip title='Edit'>
              <IconButton size='small' component={Link} href={`/management/notification/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? 'Starred' : 'Star'}>
              <IconButton
                size='small'
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightNotification(id, !isHighlighted)}
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

  const handleRefetchNotificationList = () => {
    refetchNotificationList()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementNotificationListBreadcrumbs pageLevels={[{ title: '通知管理' }]} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <ManagementNotificationListHeaderCardContent
            filteredNotificationTitle={filteredNotificationTitle}
            handleFilterNotificationTitle={handleFilterNotificationTitle}
            filteredIsSeen={filteredIsSeen}
            handleFilterIsSeenChange={handleFilterIsSeenChange}
            filteredIsHighlighted={filteredIsHighlighted}
            handleIsHighlightedChange={handleIsHighlightedChange}
            handleRefetchNotificationList={handleRefetchNotificationList}
          />
          <DataGrid
            autoHeight
            rows={notifications}
            loading={isNotificationListLoading || isNotificationListFetching}
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

ManagementNotificationListPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementNotificationListPage
