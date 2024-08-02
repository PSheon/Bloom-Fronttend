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
import { useFindMeQuery } from 'src/store/api/management/accessLog'

// ** Type Imports
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { AccessLogType } from 'src/types/accessLogTypes'
import type { ThemeColor } from 'src/@core/layouts/types'

const MeAccountSecurityAccessLogListCard = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { data: accessesData, isLoading: isAccessLogsLoading } = useFindMeQuery({
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
      headerName: 'Status',
      renderCell: ({ row }: GridRenderCellParams<AccessLogType>) => (
        <CustomChip
          skin='light'
          size='small'
          rounded
          label={row.status ? 'Succeed' : 'Failed'}
          color={row.status ? 'success' : 'error'}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      ),
      valueGetter: (data: AccessLogType['status']) => (data ? 'Succeed' : 'Failed')
    },
    {
      field: 'action',
      display: 'flex',
      minWidth: 120,
      headerName: 'Action',
      renderCell: ({ row }: GridRenderCellParams<AccessLogType>) => renderAccessActionText(row.action)
    },
    {
      field: 'ip',
      display: 'flex',
      minWidth: 140,
      headerName: 'IP',
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
      headerName: 'Device',
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
      headerName: 'Date',
      renderCell: ({ row }: GridRenderCellParams<AccessLogType>) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.date), 'PPpp')}
        </Typography>
      ),
      valueGetter: (data: AccessLogType['date']) => format(new Date(data), 'PPpp')
    }
  ]

  // ** Renders
  const renderAccessActionText = (action: AccessLogType['action']) => {
    let actionInfo = '@ Login'

    switch (action) {
      case 'ForgotPassword':
        actionInfo = '@ Forgot Password'
        break
      case 'ResetPassword':
        actionInfo = '@ Reset Password'
        break
      case 'ChangePassword':
        actionInfo = '@ Change Password'
        break
      case 'VerifyEmail':
        actionInfo = '@ Verify Email'
        break
      default:
        actionInfo = '@ Login'
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
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        component='span'
        sx={{ '& svg': { color: `${color}.main` } }}
      >
        <Icon icon={icon} fontSize={20} />
      </Stack>
    )
  }

  return (
    <Card>
      <CardHeader title='Access Log' />
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

export default MeAccountSecurityAccessLogListCard
