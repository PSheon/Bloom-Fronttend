// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Config Import
import { userRoleAttributes } from 'src/configs/acl'

// ** Utils Import
import { format } from 'date-fns'

interface CellType {
  row: {
    id: number
    displayName: string
    assignedTo: string[]
    createdAt: string
  }
}

const PermissionsList = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** vars
  const permissions = [
    {
      id: 1,
      displayName: '查看系統監控面板',
      assignedTo: ['Admin'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 2,
      displayName: '查看角色權限頁面',
      assignedTo: ['Admin'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 3,
      displayName: '查看分析面板',
      assignedTo: ['Admin', 'Manager'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 4,
      displayName: '查看使用者管理列表',
      assignedTo: ['Admin', 'Manager'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 5,
      displayName: '查看文件管理列表',
      assignedTo: ['Admin', 'Manager'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 6,
      displayName: '查看公告管理列表',
      assignedTo: ['Admin', 'Manager'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 7,
      displayName: '查看通知管理列表',
      assignedTo: ['Admin', 'Manager'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 8,
      displayName: '查看審核儀表板',
      assignedTo: ['Admin', 'Manager', 'Reviewer'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 9,
      displayName: '查看申請審核列表',
      assignedTo: ['Admin', 'Manager', 'Reviewer'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 10,
      displayName: '查看個人首頁',
      assignedTo: ['Admin', 'Manager', 'Reviewer', 'User'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 11,
      displayName: '查看個人申請列表',
      assignedTo: ['Admin', 'Manager', 'Reviewer', 'User'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 12,
      displayName: '查看個人帳號頁面',
      assignedTo: ['Admin', 'Manager', 'Reviewer', 'User'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 13,
      displayName: '查看個人通知頁面',
      assignedTo: ['Admin', 'Manager', 'Reviewer', 'User'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 14,
      displayName: '查看設定頁面',
      assignedTo: ['Admin', 'Manager', 'Reviewer', 'User'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 15,
      displayName: '登入',
      assignedTo: ['Public'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 16,
      displayName: '註冊',
      assignedTo: ['Public'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 17,
      displayName: '忘記密碼',
      assignedTo: ['Public'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 18,
      displayName: '重設密碼',
      assignedTo: ['Public'],
      createdAt: '2023-03-25T14:00:00+08:00'
    },
    {
      id: 19,
      displayName: '變更密碼',
      assignedTo: ['Admin', 'Manager', 'Reviewer', 'User'],
      createdAt: '2023-03-25T14:00:00+08:00'
    }
  ]
  const columns: GridColDef[] = [
    {
      flex: 2,
      field: 'displayName',
      minWidth: 240,
      headerName: '權限名稱',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
          {row.displayName}
        </Typography>
      )
    },
    {
      flex: 4,
      minWidth: 280,
      field: 'assignedTo',
      headerName: '賦予角色',
      renderCell: ({ row }: CellType) => {
        return row.assignedTo.map((assignee: string, index: number) => (
          <CustomChip
            avatar={
              <CustomAvatar skin='light' color={userRoleAttributes[assignee].color}>
                <Typography>
                  <Icon icon={userRoleAttributes[assignee].icon} fontSize={12} />
                </Typography>
              </CustomAvatar>
            }
            size='small'
            key={index}
            skin='light'
            rounded
            color={userRoleAttributes[assignee].color}
            label={assignee}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, '&:not(:last-of-type)': { mr: 3 } }}
          />
        ))
      }
    },
    {
      flex: 2,
      minWidth: 215,
      field: 'createdAt',
      headerName: '建立日期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{format(new Date(row.createdAt), 'yyyy/MM/dd HH:mm')}</Typography>
      )
    }
  ]

  return (
    <Card>
      <DataGrid
        autoHeight
        rows={permissions}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      />
    </Card>
  )
}

export default PermissionsList
