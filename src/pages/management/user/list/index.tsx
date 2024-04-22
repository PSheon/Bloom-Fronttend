// ** React Imports
import { useState, useCallback, ChangeEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import ManagementUserListBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementUserListHeaderCardContent from 'src/views/management/user/list/ManagementUserListHeaderCardContent'
import DataGrid, { GridColDef } from 'src/views/shared/wrapped-data-grid'

// ** Hook Imports
import useDebounce from 'src/hooks/useDebounce'

// ** API Imports
import { useFindQuery, useUpdateOneMutation } from 'src/store/api/management/user'

// ** Util Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { getPublicMediaAssetUrl, getUserRoleAttributes } from 'src/utils'

// ** Type Imports
import { UserDataType } from 'src/types/api/authTypes'

interface CellType {
  row: UserDataType
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
  const { data: usersData, isLoading: isUserListLoading } = useFindQuery({
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
      flex: 1,
      minWidth: 60,
      field: 'id',
      headerName: '編號',
      renderCell: ({ row }: CellType) => (
        <LinkStyled href={`/management/user/edit/${row.id}`}>{`#${row.id}`}</LinkStyled>
      )
    },
    {
      flex: 2,
      minWidth: 150,
      field: 'username',
      headerName: '使用者',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row?.avatar ? (
            <CustomAvatar
              variant='rounded'
              src={getPublicMediaAssetUrl(row.avatar.url)}
              sx={{ mr: 3, width: 34, height: 34 }}
            />
          ) : (
            <CustomAvatar
              skin='light'
              color='primary'
              variant='rounded'
              sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
            >
              {getInitials(row.username ? row.username : 'John Doe')}
            </CustomAvatar>
          )}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href={`/management/user/edit/${row.id}`} sx={{ fontWeight: 600, color: 'text.primary' }}>
              {row.username}
            </LinkStyled>
            <Typography noWrap variant='caption'>
              {`#${row.title || '未提供'}`}
            </Typography>
          </Box>
        </Box>
      ),
      valueGetter: ({ row }: CellType) => row.username
    },
    {
      flex: 2,
      minWidth: 280,
      field: 'email',
      headerName: '信箱',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip title={row.confirmed ? '已驗證' : '未驗證'}>
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
        </Box>
      )
    },
    {
      flex: 2,
      minWidth: 140,
      field: 'phone',
      headerName: '電話',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {row.phone || '未提供'}
        </Typography>
      ),
      valueGetter: ({ row }: CellType) => row.phone || '未提供'
    },
    {
      flex: 2,
      field: 'role',
      minWidth: 120,
      headerName: '角色權限',
      renderCell: ({ row }: CellType) => {
        const userRoleAttributes = getUserRoleAttributes(row.role!.name)

        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 3, color: `${userRoleAttributes.color}.main` }
            }}
          >
            <Icon icon={userRoleAttributes.icon} fontSize={20} />
            <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {userRoleAttributes.displayName}
            </Typography>
          </Box>
        )
      },
      valueGetter: ({ row }: CellType) => row.role!.name
    },
    {
      flex: 1,
      minWidth: 110,
      field: 'blocked',
      headerName: '狀態',
      renderCell: ({ row }: CellType) => (
        <CustomChip
          skin='light'
          size='small'
          rounded
          label={row.blocked ? '已封鎖' : '已開通'}
          color={row.blocked ? 'error' : 'success'}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      ),
      valueGetter: ({ row }: CellType) => (row.blocked ? '已封鎖' : '已開通')
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
              <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/management/user/edit/${id}`}>
                <Icon icon='mdi:eye-outline' />
              </IconButton>
            </Tooltip>
            <Tooltip title={isHighlighted ? '已加星號' : '未加星號'}>
              <IconButton
                size='small'
                sx={{ mr: 0.5 }}
                color={isHighlighted ? 'primary' : 'inherit'}
                onClick={() => handleHighlightUser(id, !isHighlighted)}
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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementUserListBreadcrumbs pageLevels={[{ title: '使用者管理' }]} />
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
          />
          <DataGrid
            autoHeight
            loading={isUserListLoading}
            rows={users}
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
      </Grid>
    </Grid>
  )
}

ManagementUserListPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementUserListPage
