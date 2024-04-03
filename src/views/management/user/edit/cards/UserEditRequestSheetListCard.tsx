// ** React Imports
import { useState, useCallback, ChangeEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Hooks Import
import useDebounce from 'src/hooks/useDebounce'

// ** Api Imports
import { useFindQuery, useUpdateOneMutation } from 'src/store/api/management/requestSheet'

// ** Types Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'
import { UserDataType } from 'src/context/types'

// ** Utils Import
import {
  getRequestSheetTypeAttributes,
  getRequestSheetOperationalMethodAttributes,
  getRequestSheetCooperationIndustriesAttributes,
  getRequestSheetProcessStatusAttributes
} from 'src/utils'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled Components
import RequestSheetListHeaderCardContent from 'src/views/management/request-sheet/list/HeaderCardContent'
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

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

interface Props {
  initUserEntity: UserDataType
}
interface CellType {
  row: RequestSheetType
}

const UserEditRequestSheetListCard = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  // ** State
  const [filteredRequestSheetTitle, setFilteredRequestSheetTitle] = useState<string>('')
  const [filteredProcessStatus, setFilteredProcessStatus] = useState<string>('all')
  const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredRequestSheetTitle = useDebounce(filteredRequestSheetTitle, 300)

  // ** Hooks
  const { data: requestSheetsData, isLoading: isRequestSheetListLoading } = useFindQuery({
    filters: {
      ...(debouncedFilteredRequestSheetTitle !== '' && {
        $or: [{ title: { $containsi: debouncedFilteredRequestSheetTitle } }]
      }),
      ...(filteredProcessStatus !== 'all' && { processStatus: filteredProcessStatus }),
      ...(filteredIsHighlighted !== 'all' && { isHighlighted: filteredIsHighlighted === 'isHighlighted' }),
      applicant: initUserEntity.id
    },
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })
  const [updateRequestSheet] = useUpdateOneMutation()

  // ** Vars
  const requestSheets = requestSheetsData?.data || []
  const totalRows = requestSheetsData?.meta.pagination.total || 0
  const columns: GridColDef[] = [
    {
      flex: 1,
      minWidth: 60,
      field: 'id',
      headerName: '編號',
      renderCell: ({ row }: CellType) => (
        <LinkStyled href={`/management/request-sheet/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      flex: 3,
      minWidth: 250,
      field: 'title',
      headerName: '計畫名稱',
      renderCell: ({ row }: CellType) => (
        <LinkStyled
          href={`/management/request-sheet/edit/${row.id}`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.title}
        </LinkStyled>
      )
    },
    {
      flex: 1,
      minWidth: 80,
      field: 'type',
      headerName: '計畫種類',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
          {getRequestSheetTypeAttributes(row.type).displayName}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) => getRequestSheetTypeAttributes(row.type).displayName
    },
    {
      flex: 1,
      minWidth: 120,
      field: 'operationalMethod',
      headerName: '運作方式',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
          {getRequestSheetOperationalMethodAttributes(row.operationalMethod).displayName}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) => getRequestSheetOperationalMethodAttributes(row.operationalMethod).displayName
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'cooperationIndustries',
      headerName: '合作產業',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
          {getRequestSheetCooperationIndustriesAttributes(row.cooperationIndustries).displayName}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) =>
        getRequestSheetCooperationIndustriesAttributes(row.cooperationIndustries).displayName
    },
    {
      flex: 3,
      minWidth: 200,
      field: 'processStatus',
      headerName: '申請進度',
      renderCell: ({ row }: CellType) => {
        const { processStatus } = row
        const { displayName, color, processPercentage } = getRequestSheetProcessStatusAttributes(processStatus)

        return (
          <Grid container spacing={2} flexDirection='column' justifyContent='center'>
            <Grid item xs={12}>
              <CustomChip
                skin='light'
                size='small'
                rounded
                label={displayName}
                color={color}
                sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                color='primary'
                value={processPercentage}
                variant='determinate'
                sx={{
                  height: 6,
                  width: '100%',
                  borderRadius: 8,
                  backgroundColor: 'background.default',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 8
                  }
                }}
              />
            </Grid>
          </Grid>
        )
      },
      valueGetter: ({ row }: CellType) =>
        `${getRequestSheetProcessStatusAttributes(row.processStatus).processPercentage}%`
    },
    {
      flex: 1,
      minWidth: 125,
      field: 'createdAt',
      headerName: '申請日期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.createdAt), 'MM/dd/yyyy')}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) => format(new Date(row.createdAt), 'MM/dd/yyyy')
    },
    {
      flex: 1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: '操作',
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: CellType) => {
        const { id, isHighlighted } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='查看'>
              <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/request-sheet/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? '已加星號' : '未加星號'}>
              <IconButton
                size='small'
                sx={{ mr: 0.5 }}
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightRequestSheet(id, !isHighlighted)}
              >
                <Icon icon={isHighlighted ? 'mdi:star' : 'mdi:star-outline'} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  // ** Logics
  const handleFilterRequestSheetTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredRequestSheetTitle(e.target.value)
  }, [])
  const handleProcessStatusChange = useCallback((e: SelectChangeEvent) => {
    setFilteredProcessStatus(e.target.value)
  }, [])
  const handleIsHighlightedChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsHighlighted(e.target.value)
  }, [])
  const handleHighlightRequestSheet = async (id: number, isHighlighted: boolean) => {
    await updateRequestSheet({ id, data: { isHighlighted } })
  }

  return (
    <Card>
      <CardHeader title='申請記錄' />
      <RequestSheetListHeaderCardContent
        filteredRequestSheetTitle={filteredRequestSheetTitle}
        handleFilterRequestSheetTitle={handleFilterRequestSheetTitle}
        filteredProcessStatus={filteredProcessStatus}
        handleProcessStatusChange={handleProcessStatusChange}
        filteredIsHighlighted={filteredIsHighlighted}
        handleIsHighlightedChange={handleIsHighlightedChange}
      />
      <DataGrid
        autoHeight
        rows={requestSheets}
        loading={isRequestSheetListLoading}
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

export default UserEditRequestSheetListCard
