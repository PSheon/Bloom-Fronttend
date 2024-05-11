// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/accessLog'

// ** Type Imports
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { AccessLogType } from 'src/types/accessLogTypes'
import type { ThemeColor } from 'src/@core/layouts/types'
import type { UserDataType } from 'src/types/authTypes'

interface Props {
  initUserEntity: UserDataType
}

const ManagementUserEditAccessLogListCard = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { data: accessesData, isLoading: isAccessLogsLoading } = useFindQuery({
    filters: { user: initUserEntity.id },
    sort: ['date:desc'],
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  // ** Vars
  const accessLogs = accessesData?.data || []
  const totalRows = accessesData?.meta.pagination.total || 0

  const columns: GridColDef[] = [
    {
      field: 'status',
      display: 'flex',
      minWidth: 110,
      headerName: '狀態',
      renderCell: ({ row }: GridRenderCellParams<AccessLogType>) => (
        <CustomChip
          skin='light'
          size='small'
          rounded
          label={row.status ? '成功' : '失敗'}
          color={row.status ? 'success' : 'error'}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      ),
      valueGetter: (data: AccessLogType['status']) => (data ? '成功' : '失敗')
    },
    {
      field: 'action',
      display: 'flex',
      minWidth: 120,
      headerName: '操作',
      renderCell: ({ row }: GridRenderCellParams<AccessLogType>) => renderAccessActionText(row.action)
    },
    {
      field: 'ip',
      display: 'flex',
      minWidth: 140,
      headerName: '來源IP',
      renderCell: ({ row }: GridRenderCellParams<AccessLogType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {row.ip}
        </Typography>
      )
    },
    {
      field: 'os',
      display: 'flex',
      minWidth: 280,
      headerName: '來源設備',
      renderCell: ({ row }: GridRenderCellParams<AccessLogType>) => (
        <Stack direction='row' spacing={2} alignItems='center'>
          {renderOSIcon(row.os)}
          <Typography
            noWrap
            color='text.secondary'
            sx={{ fontWeight: 600 }}
          >{`${row.browser} on ${row.os}`}</Typography>
        </Stack>
      )
    },
    {
      field: 'date',
      display: 'flex',
      minWidth: 280,
      headerName: '日期',
      renderCell: ({ row }: GridRenderCellParams<AccessLogType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.date), 'PPpp')}
        </Typography>
      ),
      valueGetter: (data: AccessLogType['date']) => format(new Date(data), 'PPpp')
    }
  ]

  // ** Renders
  const renderAccessActionText = (action: AccessLogType['action']) => {
    let actionInfo = '@ 登入'

    switch (action) {
      case 'ForgotPassword':
        actionInfo = '@ 忘記密碼'
        break
      case 'ResetPassword':
        actionInfo = '@ 重設密碼'
        break
      case 'ChangePassword':
        actionInfo = '@ 變更密碼'
        break
      case 'VerifyEmail':
        actionInfo = '@ 驗證信箱'
        break
      default:
        actionInfo = '@ 登入'
        break
    }

    return (
      <Typography noWrap sx={{ fontWeight: 600 }}>
        {actionInfo}
      </Typography>
    )
  }

  const renderOSIcon = (os: string) => {
    const osName = os.toLowerCase()
    let icon = 'mdi:crosshairs-unknown'
    let color: ThemeColor = 'error'

    if (osName.includes('windows')) {
      icon = 'mdi:microsoft-windows'
      color = 'primary'
    }

    if (osName.includes('mac')) {
      icon = 'mdi:apple-keyboard-command'
      color = 'warning'
    }

    if (osName.includes('android')) {
      icon = 'mdi:microsoft-windows'
      color = 'success'
    }

    if (osName.includes('ios')) {
      icon = 'mdi:apple-ios'
      color = 'info'
    }

    return (
      <Stack alignItems='center' component='span' sx={{ '& svg': { color: `${color}.main` } }}>
        <Icon icon={icon} fontSize={20} />
      </Stack>
    )
  }

  return (
    <Card>
      <CardHeader title='安全記錄' />
      <DataGrid
        autoHeight
        loading={isAccessLogsLoading}
        rows={accessLogs}
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
  )
}

export default ManagementUserEditAccessLogListCard
