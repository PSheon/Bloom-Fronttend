// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getUserRoleAttributes } from 'src/utils'

// ** Config Imports
import { Permissions } from 'src/configs/acl'

// ** Type Imports
import { Role } from 'src/context/types'

interface CellType {
  row: {
    id: string
    displayName: string
    assignedTo: Role[]
    createdAt: string
  }
}

const PermissionsList = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** vars
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
        return row.assignedTo.map((assignee: Role, index: number) => {
          const userRoleAttributes = getUserRoleAttributes(assignee)

          return (
            <CustomChip
              avatar={
                <CustomAvatar skin='light' color={userRoleAttributes.color}>
                  <Typography>
                    <Icon icon={userRoleAttributes.icon} fontSize={12} />
                  </Typography>
                </CustomAvatar>
              }
              size='small'
              key={index}
              skin='light'
              rounded
              color={userRoleAttributes.color}
              label={userRoleAttributes.displayName}
              sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, '&:not(:last-of-type)': { mr: 3 } }}
            />
          )
        })
      }
    },
    {
      flex: 2,
      minWidth: 215,
      field: 'createdAt',
      headerName: '建立日期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{format(new Date(row.createdAt), 'PPpp')}</Typography>
      )
    }
  ]

  return (
    <Card>
      <DataGrid
        autoHeight
        rows={Permissions}
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
