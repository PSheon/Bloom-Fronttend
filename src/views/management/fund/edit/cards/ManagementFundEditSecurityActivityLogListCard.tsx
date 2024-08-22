// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/activityLog'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl, getActivityLogStatusProperties, getActivityLogActionProperties } from 'src/utils'

// ** Type Imports
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { FundType } from 'src/types/fundTypes'
import type { ActivityLogType } from 'src/types/activityLogTypes'

interface Props {
  initFundEntity: FundType
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
    sort: ['createdAt:desc'],
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
      field: 'status',
      display: 'flex',
      minWidth: 110,
      headerName: '狀態',
      renderCell: ({ row }: GridRenderCellParams<ActivityLogType>) => {
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
      field: 'action',
      display: 'flex',
      minWidth: 120,
      headerName: '操作',
      renderCell: ({ row }: GridRenderCellParams<ActivityLogType>) => {
        const { color, title } = getActivityLogActionProperties(row.action)

        return (
          <Typography noWrap sx={{ fontWeight: 600, color }}>
            {`@${title}`}
          </Typography>
        )
      }
    },
    {
      field: 'user',
      display: 'flex',
      minWidth: 200,
      headerName: '操作人員',
      renderCell: ({ row }: GridRenderCellParams<ActivityLogType>) => {
        const user = {
          id: row.user.data?.id,
          ...row.user.data?.attributes
        }

        return (
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            {user?.avatar ? (
              <CustomAvatar
                variant='rounded'
                src={getPublicMediaAssetUrl(user.avatar?.data?.attributes.url)}
                sx={{ width: 34, height: 34 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                color='primary'
                variant='rounded'
                sx={{ width: 34, height: 34, fontSize: '1rem' }}
              >
                {getInitials(user.username ? user.username : 'User')}
              </CustomAvatar>
            )}
            <Stack alignItems='flex-start'>
              <LinkStyled href={`/management/user/edit/${user.id}`} sx={{ fontWeight: 600, color: 'text.primary' }}>
                {user.username}
              </LinkStyled>
              <Typography noWrap variant='caption'>
                {`#${user.nationality || 'unfilled'}`}
              </Typography>
            </Stack>
          </Stack>
        )
      }
    },
    {
      field: 'createdAt',
      display: 'flex',
      minWidth: 280,
      headerName: '日期',
      renderCell: ({ row }: GridRenderCellParams<ActivityLogType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.createdAt), 'PPpp')}
        </Typography>
      ),
      valueGetter: (data: ActivityLogType['createdAt']) => format(new Date(data), 'PPpp')
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
      />
    </Card>
  )
}

export default ManagementFundEditSecurityActivityLogListCard
