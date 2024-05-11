// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ReviewDashboardFundListHeaderCardContent from 'src/views/review/dashboard/cards/ReviewDashboardFundListHeaderCardContent'
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery, useUpdateOneMutation } from 'src/store/api/management/fund'

// ** Util Imports
import { getFundCurrencyProperties, getFundStatusProperties, getFundCategoryProperties } from 'src/utils'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { GridColDef } from 'src/views/shared/wrapped-data-grid'
import type { FundType } from 'src/types/api/fundTypes'

interface CellType {
  row: FundType
}

// ** Styled component for the link in the dataTable
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

const ReviewDashboardFundDataGridCard = () => {
  // ** States
  const [filteredFundDisplayname, setFilteredFundDisplayname] = useState<string>('')
  const [filteredStatus, setFilteredStatus] = useState<string>('all')
  const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredFundDisplayname = useDebounce(filteredFundDisplayname, 300)

  // ** Hooks
  const {
    data: fundsData,
    isLoading: isFundListLoading,
    refetch: refetchFundList,
    isFetching: isFundListFetching
  } = useFindQuery({
    filters: {
      ...(debouncedFilteredFundDisplayname !== '' && {
        $or: [{ displayName: { $containsi: debouncedFilteredFundDisplayname } }]
      }),
      ...(filteredStatus !== 'all' && { status: filteredStatus }),
      ...(filteredIsHighlighted !== 'all' && { isHighlighted: filteredIsHighlighted === 'isHighlighted' })
    },
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  const [updateFund] = useUpdateOneMutation()

  // ** Vars
  const funds = fundsData?.data || []
  const totalRows = fundsData?.meta.pagination.total || 0

  const columns: GridColDef[] = [
    {
      minWidth: 60,
      field: 'id',
      headerName: '編號',
      renderCell: ({ row }: CellType) => (
        <LinkStyled href={`/review/fund/edit/${row.id}/overview`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      minWidth: 150,
      field: 'displayName',
      headerName: '標題',
      renderCell: ({ row }: CellType) => (
        <LinkStyled
          href={`/review/fund/edit/${row.id}/overview`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.displayName}
        </LinkStyled>
      )
    },
    {
      minWidth: 150,
      field: 'chain',
      headerName: '網路',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {row.chain}
        </Typography>
      )
    },
    {
      flex: 2,
      field: 'baseCurrency',
      minWidth: 150,
      headerName: '使用貨幣',
      renderCell: ({ row }: CellType) => {
        const baseCurrencyProperties = getFundCurrencyProperties(row.baseCurrency)

        return (
          <AvatarGroup className='pull-up'>
            <Tooltip title={baseCurrencyProperties.displayName}>
              <CustomAvatar
                src={baseCurrencyProperties.imageUrl}
                alt={baseCurrencyProperties.displayName}
                sx={{ height: 28, width: 28, borderWidth: '5px !important' }}
              />
            </Tooltip>
            <Tooltip title='RWA'>
              <CustomAvatar
                src='/images/funds/rwa.png'
                alt='rwa'
                sx={{ height: 28, width: 28, borderWidth: '5px !important' }}
              />
            </Tooltip>
          </AvatarGroup>
        )
      }
    },
    {
      minWidth: 150,
      field: 'category',
      headerName: '類別',
      renderCell: ({ row }: CellType) => {
        const categoryProperties = getFundCategoryProperties(row.category)

        return (
          <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {categoryProperties.displayName}
          </Typography>
        )
      }
    },
    {
      minWidth: 100,
      field: 'performanceFeePercentage',
      headerName: '績效手續費',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {`${row.performanceFeePercentage} %`}
        </Typography>
      )
    },
    {
      minWidth: 200,
      field: 'genesisDate',
      headerName: '創始日期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.genesisDate), 'PPpp')}
        </Typography>
      )
    },
    {
      minWidth: 200,
      field: 'saleStartTime',
      headerName: '開始銷售日期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.saleStartTime), 'PPpp')}
        </Typography>
      )
    },
    {
      minWidth: 200,
      field: 'maturityDate',
      headerName: '結束日期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {format(new Date(row.maturityDate), 'PPpp')}
        </Typography>
      )
    },
    {
      minWidth: 150,
      field: 'redemptionFrequencyInDays',
      headerName: '兌換週期',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {`${row.redemptionFrequencyInDays} 天`}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 100,
      field: 'isPublished',
      headerName: '發布狀態',
      renderCell: ({ row }: CellType) => {
        const fundStatusProperties = getFundStatusProperties(row.status)

        return (
          <CustomChip
            skin='light'
            size='small'
            rounded
            label={fundStatusProperties.displayName}
            color={fundStatusProperties.color}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      },
      valueGetter: ({ row }: CellType) => getFundStatusProperties(row.status).displayName
    },
    {
      flex: 1,
      minWidth: 100,
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
              <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/review/fund/edit/${id}/overview`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? '已加星號' : '未加星號'}>
              <IconButton
                size='small'
                sx={{ mr: 0.5 }}
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightFund(id, !isHighlighted)}
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
  const handleFilterFundDisplayname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredFundDisplayname(e.target.value)
  }, [])

  const handleFilterStatusChange = useCallback((e: SelectChangeEvent) => {
    setFilteredStatus(e.target.value)
  }, [])

  const handleIsHighlightedChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsHighlighted(e.target.value)
  }, [])

  const handleHighlightFund = async (id: number, isHighlighted: boolean) => {
    await updateFund({ id, data: { isHighlighted } })
  }

  const handleRefetchFundList = () => {
    refetchFundList()
  }

  return (
    <Card>
      <ReviewDashboardFundListHeaderCardContent
        filteredFundDisplayname={filteredFundDisplayname}
        handleFilterFundDisplayname={handleFilterFundDisplayname}
        filteredStatus={filteredStatus}
        handleFilterStatusChange={handleFilterStatusChange}
        filteredIsHighlighted={filteredIsHighlighted}
        handleIsHighlightedChange={handleIsHighlightedChange}
        handleRefetchFundList={handleRefetchFundList}
      />
      <DataGrid
        autoHeight
        rows={funds}
        loading={isFundListLoading || isFundListFetching}
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

export default ReviewDashboardFundDataGridCard
