// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/activityLog'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl, getActivityLogStatusProperties, getActivityLogActionProperties } from 'src/utils'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'
import { ActivityLogType } from 'src/types/api/activityLogTypes'

interface Props {
  initFundEntity: FundType
}

interface CellType {
  row: ActivityLogType
}

// ** Styled Components
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

const ManagementFundEditSecurityActivityLogListCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { data: activitiesData, isLoading: isActivityLogsLoading } = useFindQuery({
    filters: {
      refContentType: 'Fund',
      refId: initFundEntity.id
    },
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
      renderCell: ({ row }: CellType) => {
        const { color, title } = getActivityLogStatusProperties(row.status)

        return (
          <CustomChip
            skin='light'
            size='small'
            rounded
            label={title}
            color={color}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      flex: 2,
      minWidth: 80,
      field: 'action',
      headerName: '操作',
      renderCell: ({ row }: CellType) => {
        const { color, title } = getActivityLogActionProperties(row.action)

        return (
          <Typography noWrap sx={{ fontWeight: 600, color }}>
            {`@${title}`}
          </Typography>
        )
      }
    },
    {
      flex: 3,
      minWidth: 160,
      field: 'user',
      headerName: '操作人員',
      renderCell: ({ row }: CellType) => {
        const user = {
          id: row.user.data?.id,
          ...row.user.data?.attributes
        }

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user?.avatar ? (
              <CustomAvatar
                variant='rounded'
                src={getPublicMediaAssetUrl(user.avatar?.data?.attributes.url)}
                sx={{ mr: 3, width: 34, height: 34 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                color='primary'
                variant='rounded'
                sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
              >
                {getInitials(user.username ? user.username : 'John Doe')}
              </CustomAvatar>
            )}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <LinkStyled href={`/management/user/edit/${user.id}`} sx={{ fontWeight: 600, color: 'text.primary' }}>
                {user.username}
              </LinkStyled>
              <Typography noWrap variant='caption'>
                {`#${user.title || '未提供'}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 3,
      minWidth: 250,
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

export default ManagementFundEditSecurityActivityLogListCard
