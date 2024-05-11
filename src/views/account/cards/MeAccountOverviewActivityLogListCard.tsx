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
import type { GridColDef } from 'src/views/shared/wrapped-data-grid'
import type { ActivityLogType } from 'src/types/api/activityLogTypes'

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

const MeAccountOverviewActivityLogListCard = () => {
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
      field: 'refContentType',
      headerName: '執行個體',
      renderCell: ({ row }: CellType) => {
        const link = getActivityLogRefContentLink(row)

        return <LinkStyled href={link}>{`${row.refContentType}#${row.id}`}</LinkStyled>
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

export default MeAccountOverviewActivityLogListCard
