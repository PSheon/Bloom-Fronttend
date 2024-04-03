// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

// ** Utils Import
import { format } from 'date-fns'

// ** Api Imports
import { useFindMeQuery } from 'src/store/api/management/activityLog'

// ** Types Imports
import { ActivityLogType } from 'src/types/api/activityLogTypes'

interface CellType {
  row: ActivityLogType
}

const MeAccountActivityLogListCard = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { data: activitiesData, isLoading: isActivityLogsLoading } = useFindMeQuery({
    filters: {},
    sort: ['date:desc'],
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  // ** Vars
  const activityLogs = activitiesData?.data || []
  const totalRows = activitiesData?.meta.pagination.total || 0
  const columns: GridColDef[] = [
    {
      flex: 1,
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
      flex: 2,
      minWidth: 120,
      field: 'action',
      headerName: '操作',
      renderCell: ({ row }: CellType) => renderActivityActionText(row.action),
      valueGetter: ({ row }: CellType) => row.action
    },
    {
      flex: 4,
      minWidth: 280,
      field: 'contentType',
      headerName: 'Content Type',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {row.contentType}
        </Typography>
      )
    },
    {
      flex: 3,
      minWidth: 140,
      field: 'refId',
      headerName: 'Ref Id',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {row.refId}
        </Typography>
      )
    },
    {
      flex: 3,
      minWidth: 220,
      field: 'date',
      headerName: '日期',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.date), 'yyyy/MM/dd HH:mm:ss')}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) => format(new Date(row.date), 'yyyy/MM/dd HH:mm:ss')
    }
  ]

  // ** Renders
  const renderActivityActionText = (action: ActivityLogType['action']) => {
    let actionInfo = '@ 建立'
    switch (action) {
      case 'Update':
        actionInfo = '@ 更新'
        break
      case 'Delete':
        actionInfo = '@ 刪除'
        break
      default:
        actionInfo = '@ 建立'
        break
    }

    return (
      <Typography noWrap sx={{ fontWeight: 600 }}>
        {actionInfo}
      </Typography>
    )
  }

  return (
    <Card>
      <CardHeader title='操作記錄' />
      <DataGrid
        autoHeight
        loading={isActivityLogsLoading}
        rows={activityLogs}
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

export default MeAccountActivityLogListCard
