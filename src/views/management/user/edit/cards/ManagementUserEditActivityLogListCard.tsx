// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/activityLog'

// ** Util Imports
import { getActivityLogStatusProperties, getActivityLogActionProperties, getActivityLogRefContentLink } from 'src/utils'

// ** Type Imports
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { ActivityLogType } from 'src/types/activityLogTypes'
import type { UserDataType } from 'src/types/authTypes'

interface Props {
  initUserEntity: UserDataType
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

const ManagementUserEditActivityLogListCard = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { data: activitiesData, isLoading: isActivityLogsLoading } = useFindQuery({
    filters: {
      user: initUserEntity.id
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
      minWidth: 80,
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
      field: 'refContentType',
      minWidth: 200,
      headerName: '執行個體',
      renderCell: ({ row }: GridRenderCellParams<ActivityLogType>) => {
        const link = getActivityLogRefContentLink(row)

        return <LinkStyled href={link}>{`${row.refContentType}#${row.refId}`}</LinkStyled>
      }
    },
    {
      field: 'date',
      display: 'flex',
      minWidth: 250,
      headerName: '日期',
      renderCell: ({ row }: GridRenderCellParams<ActivityLogType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.date), 'PPpp')}
        </Typography>
      ),
      valueGetter: (data: ActivityLogType['date']) => format(new Date(data), 'PPpp')
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

export default ManagementUserEditActivityLogListCard
