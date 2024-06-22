// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Custom Component Imports
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/pointRecord'

// ** Type Imports
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { PointRecordType } from 'src/types/pointRecordTypes'

const MeEarningRecordListCard = () => {
  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })

  // ** Hooks
  const { data: pointRecordsData, isLoading: isPointRecordsLoading } = useFindMeQuery({
    filters: {},
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  // ** Vars
  const pointRecords = pointRecordsData?.data || []
  const totalRows = pointRecordsData?.meta.pagination.total || 0

  const columns: GridColDef[] = [
    {
      field: 'id',
      display: 'flex',
      minWidth: 80,
      headerName: 'ID',
      renderCell: ({ row }: GridRenderCellParams<PointRecordType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {`# ${row.id}`}
        </Typography>
      )
    },
    {
      field: 'type',
      display: 'flex',
      minWidth: 180,
      headerName: 'Type',
      renderCell: ({ row }: GridRenderCellParams<PointRecordType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {row.type}
        </Typography>
      )
    },
    {
      field: 'earningExp',
      display: 'flex',
      minWidth: 180,
      headerName: 'Earning Experience',
      renderCell: ({ row }: GridRenderCellParams<PointRecordType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {row.earningExp}
        </Typography>
      )
    },
    {
      field: 'earningPoints',
      display: 'flex',
      minWidth: 180,
      headerName: 'Earning Points',
      renderCell: ({ row }: GridRenderCellParams<PointRecordType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {row.earningPoints}
        </Typography>
      )
    },
    {
      field: 'createdAt',
      display: 'flex',
      minWidth: 280,
      headerName: 'Date',
      renderCell: ({ row }: GridRenderCellParams<PointRecordType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.createdAt), 'PPpp')}
        </Typography>
      ),
      valueGetter: (data: PointRecordType['createdAt']) => format(new Date(data), 'PPpp')
    }
  ]

  return (
    <Card>
      <CardHeader title='Earning Record List' />
      <DataGrid
        autoHeight
        loading={isPointRecordsLoading}
        rows={pointRecords}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[6]}
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={totalRows}
      />
    </Card>
  )
}

export default MeEarningRecordListCard
