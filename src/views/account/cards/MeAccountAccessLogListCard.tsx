// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/accessLog'

// ** Type Imports
import { AccessLogType } from 'src/types/api/accessLogTypes'
import { ThemeColor } from 'src/@core/layouts/types'

interface CellType {
  row: AccessLogType
}

const MeAccountAccessLogListCard = () => {
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
      flex: 0.2,
      field: 'status',
      minWidth: 110,
      headerName: '狀態',
      renderCell: ({ row }: CellType) => (
        <CustomChip
          skin='light'
          size='small'
          rounded
          label={row.status ? '成功' : '失敗'}
          color={row.status ? 'success' : 'error'}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      ),
      valueGetter: ({ row }: CellType) => (row.status ? '成功' : '失敗')
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'action',
      headerName: '操作',
      renderCell: ({ row }: CellType) => renderAccessActionText(row.action),
      valueGetter: ({ row }: CellType) => row.action
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'ip',
      headerName: '來源IP',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {row.ip}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 280,
      field: 'os',
      headerName: '來源設備',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderOSIcon(row.os)}
          <Typography
            noWrap
            sx={{ fontWeight: 600, color: 'text.secondary' }}
          >{`${row.browser} on ${row.os}`}</Typography>
        </Box>
      ),
      valueGetter: ({ row }: CellType) => `${row.browser} on ${row.os}`
    },
    {
      flex: 0.2,
      minWidth: 220,
      field: 'date',
      headerName: '日期',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.date), 'PPpp')}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) => format(new Date(row.date), 'PPpp')
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
      <Box component='span' sx={{ mr: 4, display: 'flex', '& svg': { color: `${color}.main` } }}>
        <Icon icon={icon} fontSize={20} />
      </Box>
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
        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      />
    </Card>
  )
}

export default MeAccountAccessLogListCard
