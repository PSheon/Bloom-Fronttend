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

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/pointRecord'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { PointRecordType } from 'src/types/pointRecordTypes'
import type { FundType } from 'src/types/fundTypes'

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

/* TODO: update here */
const ManagementFundEditVaultPointsRecordListCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  console.log(
    '🚀 ~ src/views/management/fund/edit/cards/ManagementFundEditVaultPointsRecordListCard.tsx:54 > initFundEntity',
    initFundEntity
  )

  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { data: pointRecordsData, isLoading: isPointRecordsLoading } = useFindQuery({
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
      field: 'user',
      display: 'flex',
      minWidth: 200,
      headerName: '使用者',
      renderCell: ({ row }: GridRenderCellParams<PointRecordType>) => {
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
      minWidth: 110,
      headerName: 'Experience',
      renderCell: ({ row }: GridRenderCellParams<PointRecordType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {row.earningExp}
        </Typography>
      )
    },
    {
      field: 'earningPoints',
      display: 'flex',
      minWidth: 120,
      headerName: 'Points',
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
      <CardHeader title='Point Record List' />
      <DataGrid
        autoHeight
        loading={isPointRecordsLoading}
        rows={pointRecords}
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

export default ManagementFundEditVaultPointsRecordListCard
