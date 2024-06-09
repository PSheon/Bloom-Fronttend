// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { ExactNumber as N } from 'exactnumber'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/token'

// ** Util Imports
import {
  getFundCurrencyProperties,
  getFormattedPriceUnit,
  getFormattedEthereumAddress,
  getTokenStatusProperties
} from 'src/utils'

// ** Type Imports
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { TokenType } from 'src/types/tokenTypes'

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

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditTokenListCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const { data: tokensData, isLoading: isTokensLoading } = useFindQuery({
    filters: {
      contractAddress: {
        $eqi: initFundEntity.sft.contractAddress
      }
    },
    sort: ['createdAt:desc'],
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  // ** Vars
  const theme = useTheme()
  const tokens = tokensData?.data || []
  const totalRows = tokensData?.meta.pagination.total || 0
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const columns: GridColDef[] = [
    {
      field: 'tokenId',
      display: 'flex',
      minWidth: 80,
      headerName: '編號',
      renderCell: ({ row }: GridRenderCellParams<TokenType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {`# ${Number(row.tokenId)}`}
        </Typography>
      )
    },
    {
      field: 'package',
      display: 'flex',
      minWidth: 280,
      headerName: '方案',
      renderCell: ({ row }: GridRenderCellParams<TokenType>) => (
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
          <CustomAvatar skin='light' color='primary' variant='rounded' sx={{ width: 34, height: 34, fontSize: '1rem' }}>
            <Image
              width={18}
              height={25}
              draggable={false}
              alt={row.package?.data?.attributes.displayName || 'sft slot'}
              src={`/images/funds/packages/card-skin/${row.package?.data?.attributes.skin.toLowerCase()}-${
                theme.palette.mode
              }.webp`}
            />
          </CustomAvatar>
          <Stack alignItems='flex-start' justifyContent='center'>
            <LinkStyled href={`/fund/live/${initFundEntity.id}/overview`} color='text.primary' sx={{ fontWeight: 600 }}>
              {row.package?.data?.attributes.displayName}
            </LinkStyled>
            <Typography noWrap variant='caption'>
              {row.package?.data?.attributes.description || 'unfilled'}
            </Typography>
          </Stack>
        </Stack>
      )
    },
    {
      field: 'tokenValue',
      display: 'flex',
      minWidth: 160,
      headerName: '額度',
      renderCell: ({ row }: GridRenderCellParams<TokenType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(N(row.tokenValue).div(N(10).pow(18)).toNumber())}`}
        </Typography>
      )
    },
    {
      field: 'owner',
      display: 'flex',
      minWidth: 200,
      headerName: '持有位址',
      renderCell: ({ row }: GridRenderCellParams<TokenType>) => (
        <Typography noWrap color='text.secondary' sx={{ fontWeight: 600 }}>
          {getFormattedEthereumAddress(row.owner)}
        </Typography>
      )
    },
    {
      field: 'status',
      display: 'flex',
      minWidth: 110,
      headerName: '狀態',
      renderCell: ({ row }: GridRenderCellParams<TokenType>) => {
        const { color, displayName } = getTokenStatusProperties(row.status)

        return (
          <CustomChip
            skin='light'
            size='small'
            rounded
            label={displayName}
            color={color}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader title='Token List' />
      <DataGrid
        autoHeight
        loading={isTokensLoading}
        rows={tokens}
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

export default ManagementFundEditTokenListCard
