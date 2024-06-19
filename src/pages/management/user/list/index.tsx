// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ManagementUserListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementUserListHeaderCardContent from 'src/views/management/user/list/ManagementUserListHeaderCardContent'
import DataGrid from 'src/views/shared/wrapped-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery, useUpdateOneMutation } from 'src/store/api/management/user'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl, getUserRoleAttributes } from 'src/utils'

// ** Type Imports
import type { ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import type { GridColDef, GridRenderCellParams } from 'src/views/shared/wrapped-data-grid'
import type { UserDataType } from 'src/types/authTypes'

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

const ConfirmedStatusStyledBox = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  margin: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  cursor: 'pointer'
}))

const ManagementUserListPage = () => {
  // ** States
  const [filteredUsernameOrEmail, setFilteredUsernameOrEmail] = useState<string>('')
  const [filteredRole, setFilteredRole] = useState<string>('all')
  const [filteredBlockStatus, setFilteredBlockStatus] = useState<string>('all')
  const [filteredIsHighlighted, setFilteredIsHighlighted] = useState<string>('all')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const debouncedFilteredUsernameOrEmail = useDebounce(filteredUsernameOrEmail, 300)

  // ** Hooks
  const {
    data: usersData,
    isLoading: isUserListLoading,
    refetch: refetchUserList,
    isFetching: isUserListFetching
  } = useFindQuery({
    filters: {
      ...(debouncedFilteredUsernameOrEmail !== '' && {
        $or: [
          { username: { $containsi: debouncedFilteredUsernameOrEmail } },
          { email: { $containsi: debouncedFilteredUsernameOrEmail } }
        ]
      }),
      ...(filteredRole !== 'all' && {
        role: parseInt(filteredRole, 10)
      }),
      ...(filteredBlockStatus !== 'all' && { blocked: filteredBlockStatus === 'blocked' }),
      ...(filteredIsHighlighted !== 'all' && { isHighlighted: filteredIsHighlighted === 'isHighlighted' })
    },
    pagination: {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize
    }
  })

  const [updateUser] = useUpdateOneMutation()

  // ** Vars
  const users = usersData?.data || []
  const totalRows = usersData?.meta.pagination.total || 0

  const columns: GridColDef[] = [
    {
      field: 'id',
      minWidth: 60,
      headerName: '# ID',
      renderCell: ({ row }: GridRenderCellParams<UserDataType>) => (
        <LinkStyled href={`/management/user/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      field: 'username',
      display: 'flex',
      minWidth: 200,
      headerName: 'User',
      renderCell: ({ row }: GridRenderCellParams<UserDataType>) => (
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
          {row?.avatar ? (
            <CustomAvatar
              variant='rounded'
              src={getPublicMediaAssetUrl(row.avatar.url)}
              sx={{ width: 34, height: 34 }}
            />
          ) : (
            <CustomAvatar
              skin='light'
              color='primary'
              variant='rounded'
              sx={{ width: 34, height: 34, fontSize: '1rem' }}
            >
              {getInitials(row.username ? row.username : 'John Doe')}
            </CustomAvatar>
          )}
          <Stack alignItems='flex-start' justifyContent='center'>
            <LinkStyled href={`/management/user/edit/${row.id}`} sx={{ fontWeight: 600, color: 'text.primary' }}>
              {row.username}
            </LinkStyled>
            <Typography noWrap variant='caption'>
              {`#${row.title || 'unfilled'}`}
            </Typography>
          </Stack>
        </Stack>
      )
    },
    {
      field: 'email',
      display: 'flex',
      minWidth: 280,
      headerName: 'Email',
      renderCell: ({ row }: GridRenderCellParams<UserDataType>) => (
        <Stack direction='row' spacing={2} alignItems='center'>
          <Tooltip title={row.confirmed ? 'verified' : 'unverified'}>
            <ConfirmedStatusStyledBox
              sx={{
                backgroundColor: theme => (row.confirmed ? theme.palette.success.main : theme.palette.warning.main),
                boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`
              }}
            />
          </Tooltip>
          <Typography noWrap variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {row.email}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'phone',
      display: 'flex',
      minWidth: 140,
      headerName: 'Phone',
      renderCell: ({ row }: GridRenderCellParams<UserDataType>) => (
        <Typography noWrap variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
          {row?.phone || 'Unfilled'}
        </Typography>
      ),
      valueGetter: (data: UserDataType) => data?.phone || 'Unfilled'
    },
    {
      field: 'role',
      display: 'flex',
      minWidth: 180,
      headerName: 'Role',
      renderCell: ({ row }: GridRenderCellParams<UserDataType>) => {
        const userRoleAttributes = getUserRoleAttributes(row.role!.name)

        return (
          <Stack
            direction='row'
            spacing={3}
            alignItems='center'
            sx={{
              '& svg': { color: `${userRoleAttributes.color}.main` }
            }}
          >
            <Icon icon={userRoleAttributes.icon} fontSize={20} />
            <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {userRoleAttributes.displayName}
            </Typography>
          </Stack>
        )
      },
      valueGetter: (data: UserDataType['role']) => data?.name || 'Unknown Role'
    },
    {
      field: 'blocked',
      display: 'flex',
      minWidth: 110,
      headerName: 'Status',
      renderCell: ({ row }: GridRenderCellParams<UserDataType>) => (
        <CustomChip
          skin='light'
          size='small'
          rounded
          label={row.blocked ? 'Blocked' : 'Enabled'}
          color={row.blocked ? 'error' : 'success'}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      ),
      valueGetter: (data: UserDataType) => (data.blocked ? 'Blocked' : 'Enabled')
    },
    {
      field: 'actions',
      display: 'flex',
      minWidth: 130,
      headerName: 'Actions',
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: ({ row }: GridRenderCellParams<UserDataType>) => {
        const { id, isHighlighted } = row

        return (
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <Tooltip title='Edit'>
              <IconButton size='small' component={Link} href={`/management/user/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? 'Starred' : 'Star'}>
              <IconButton
                size='small'
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightUser(id, !isHighlighted)}
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
  const handleFilterUsernameOrEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilteredUsernameOrEmail(e.target.value)
  }, [])

  const handleFilterRoleChange = useCallback((e: SelectChangeEvent) => {
    setFilteredRole(e.target.value)
  }, [])

  const handleBlockStatusChange = useCallback((e: SelectChangeEvent) => {
    setFilteredBlockStatus(e.target.value)
  }, [])

  const handleIsHighlightedChange = useCallback((e: SelectChangeEvent) => {
    setFilteredIsHighlighted(e.target.value)
  }, [])

  const handleHighlightUser = async (id: number, isHighlighted: boolean) => {
    await updateUser({ id, data: { isHighlighted } })
  }

  const handleRefetchUserList = () => {
    refetchUserList()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementUserListBreadcrumbs pageLevels={[{ title: 'User Management' }]} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <ManagementUserListHeaderCardContent
            filteredUsernameOrEmail={filteredUsernameOrEmail}
            handleFilterUsernameOrEmail={handleFilterUsernameOrEmail}
            filteredRole={filteredRole}
            handleFilterRoleChange={handleFilterRoleChange}
            filteredBlockStatus={filteredBlockStatus}
            handleBlockStatusChange={handleBlockStatusChange}
            filteredIsHighlighted={filteredIsHighlighted}
            handleIsHighlightedChange={handleIsHighlightedChange}
            handleRefetchUserList={handleRefetchUserList}
          />
          <DataGrid
            autoHeight
            loading={isUserListLoading || isUserListFetching}
            rows={users}
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

ManagementUserListPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementUserListPage
