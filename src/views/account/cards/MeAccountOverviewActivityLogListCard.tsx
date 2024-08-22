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

// ** Custom Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/activityLog'

// ** Util Imports
import { getActivityLogStatusProperties, getActivityLogActionProperties, getActivityLogRefContentLink } from 'src/utils'

// ** Type Imports
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { ActivityLogType } from 'src/types/activityLogTypes'

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

const MeAccountOverviewActivityLogListCard = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { data: activitiesData, isLoading: isActivityLogsLoading } = useFindMeQuery({
    filters: {},
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
      headerName: 'Status',
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
      minWidth: 160,
      headerName: 'Action',
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
      minWidth: 280,
      headerName: 'Content Type',
      renderCell: ({ row }: GridRenderCellParams<ActivityLogType>) => {
        const link = getActivityLogRefContentLink(row)

        return <LinkStyled href={link}>{`${row.refContentType}#${row.refId}`}</LinkStyled>
      }
    },
    {
      field: 'createdAt',
      display: 'flex',
      minWidth: 250,
      headerName: 'Date',
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
      <CardHeader title='Activity Log' />
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

export default MeAccountOverviewActivityLogListCard
