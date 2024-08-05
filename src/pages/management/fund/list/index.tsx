// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
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
import ManagementFundListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementFundListHeaderCardContent from 'src/views/management/fund/list/cards/ManagementFundListHeaderCardContent'
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
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { FundType } from 'src/types/fundTypes'

// ** Styled components
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

const ManagementFundListPage = () => {
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
      field: 'id',
      minWidth: 60,
      headerName: '# ID',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => (
        <LinkStyled href={`/management/fund/edit/${row.id}/overview`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      field: 'displayName',
      minWidth: 350,
      headerName: '標題',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => (
        <LinkStyled
          href={`/management/fund/edit/${row.id}/overview`}
          sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {row.displayName}
        </LinkStyled>
      )
    },
    {
      field: 'chain',
      display: 'flex',
      minWidth: 150,
      headerName: '網路',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {row.chain}
        </Typography>
      )
    },
    {
      field: 'baseCurrency',
      display: 'flex',
      minWidth: 150,
      headerName: '使用貨幣',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => {
        const baseCurrencyProperties = getFundCurrencyProperties(row.baseCurrency)

        return (
          <AvatarGroup className='pull-up'>
            <Tooltip title={baseCurrencyProperties.displayName}>
              <CustomAvatar
                src={baseCurrencyProperties.imageUrl}
                alt={baseCurrencyProperties.displayName}
                sx={{
                  height: 28,
                  width: 28,
                  borderWidth: '5px !important',
                  backgroundColor: theme => theme.palette.background.default
                }}
              />
            </Tooltip>
            <Tooltip title='RWA'>
              <CustomAvatar
                src='/images/funds/rwa.png'
                alt='rwa'
                sx={{
                  height: 28,
                  width: 28,
                  borderWidth: '5px !important',
                  backgroundColor: theme => theme.palette.background.default
                }}
              />
            </Tooltip>
          </AvatarGroup>
        )
      }
    },
    {
      field: 'category',
      display: 'flex',
      minWidth: 150,
      headerName: '類別',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => {
        const categoryProperties = getFundCategoryProperties(row.category)

        return (
          <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
            {categoryProperties.displayName}
          </Typography>
        )
      }
    },
    {
      field: 'performanceFeePercentage',
      display: 'flex',
      minWidth: 100,
      headerName: '績效手續費',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {`${row.performanceFeePercentage} %`}
        </Typography>
      )
    },
    {
      field: 'genesisDate',
      display: 'flex',
      minWidth: 200,
      headerName: '創始日期',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.genesisDate), 'PPpp')}
        </Typography>
      )
    },
    {
      field: 'saleStartTime',
      display: 'flex',
      minWidth: 200,
      headerName: '開始銷售日期',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.saleStartTime), 'PPpp')}
        </Typography>
      )
    },
    {
      field: 'maturityDate',
      display: 'flex',
      minWidth: 200,
      headerName: '結束日期',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {format(new Date(row.maturityDate), 'PPpp')}
        </Typography>
      )
    },
    {
      field: 'redemptionFrequencyInDays',
      display: 'flex',
      minWidth: 150,
      headerName: '兌換週期',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => (
        <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {`${row.redemptionFrequencyInDays} Days`}
        </Typography>
      )
    },
    {
      field: 'status',
      display: 'flex',
      minWidth: 100,
      headerName: '發布狀態',
      renderCell: ({ row }: GridRenderCellParams<FundType>) => {
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
      valueGetter: (data: FundType['status']) => getFundStatusProperties(data).displayName
    },
    {
      field: 'actions',
      display: 'flex',
      minWidth: 100,
      headerName: '操作',
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: GridRenderCellParams<FundType>) => {
        const { id, isHighlighted } = row

        return (
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <Tooltip title='Edit'>
              <IconButton size='small' component={Link} href={`/management/fund/edit/${id}/overview`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? 'Starred' : 'Star'}>
              <IconButton
                size='small'
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightFund(id, !isHighlighted)}
              >
                <Icon icon={isHighlighted ? 'mdi:star' : 'mdi:star-outline'} />
              </IconButton>
            </Tooltip>
          </Stack>
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
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <ManagementFundListBreadcrumbs pageLevels={[{ title: 'PageBreadcrumb.Management.Funds.PageTitle' }]} />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <ManagementFundListHeaderCardContent
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
      </Grid>
    </Grid>
  )
}

ManagementFundListPage.acl = {
  action: 'read',
  subject: 'planner-page'
}
export default ManagementFundListPage
