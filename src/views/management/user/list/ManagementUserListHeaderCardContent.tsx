// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindQuery as useFindRolesQuery } from 'src/store/api/roleAndPermission'

interface Props {
  filteredUsernameOrEmail: string
  handleFilterUsernameOrEmail: (e: ChangeEvent<HTMLInputElement>) => void
  filteredRole: string
  handleFilterRoleChange: (e: SelectChangeEvent) => void
  filteredBlockStatus: string
  handleBlockStatusChange: (e: SelectChangeEvent) => void
  filteredIsHighlighted: string
  handleIsHighlightedChange: (e: SelectChangeEvent) => void
  handleRefetchUserList: () => void
}

const ManagementUserListHeaderCardContent = (props: Props) => {
  // ** Props
  const {
    filteredUsernameOrEmail,
    handleFilterUsernameOrEmail,
    filteredRole,
    handleFilterRoleChange,
    filteredBlockStatus,
    handleBlockStatusChange,
    filteredIsHighlighted,
    handleIsHighlightedChange,
    handleRefetchUserList
  } = props

  // ** States
  const [isShowFilters, serIsShowFilters] = useState<boolean>(false)

  // ** Hooks
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const { data: roles = [], isLoading: isFindRolesLoading } = useFindRolesQuery(null)

  // ** Logics
  const handleFiltersClick = () => {
    serIsShowFilters(currentIsShowFilters => !currentIsShowFilters)
  }

  return (
    <CardContent>
      <Stack spacing={6}>
        <Stack spacing={6} direction='row'>
          <Stack spacing={6} direction='row' sx={{ flex: '1' }}>
            <TextField
              size='small'
              fullWidth
              value={filteredUsernameOrEmail}
              placeholder='尋找名稱或信箱'
              onChange={handleFilterUsernameOrEmail}
              InputProps={{
                startAdornment: <InputAdornment position='start'>{<Icon icon='mdi:magnify' />}</InputAdornment>,
                endAdornment: (
                  <IconButton onClick={handleRefetchUserList}>
                    <Icon icon='mdi:reload' fontSize={20} />
                  </IconButton>
                )
              }}
            />
          </Stack>
          <Stack spacing={6} direction='row' sx={{ flex: '0' }}>
            {isDesktopView ? (
              <Button
                color={isShowFilters ? 'primary' : 'secondary'}
                variant={isShowFilters ? 'contained' : 'outlined'}
                startIcon={<Icon icon='mdi:filter-outline' fontSize={20} />}
                onClick={handleFiltersClick}
              >
                <Typography whiteSpace='nowrap' color='inherit'>
                  篩選
                </Typography>
              </Button>
            ) : (
              <Button
                color={isShowFilters ? 'primary' : 'secondary'}
                variant={isShowFilters ? 'contained' : 'outlined'}
                onClick={handleFiltersClick}
              >
                <Icon icon='mdi:filter-outline' fontSize={20} />
              </Button>
            )}
          </Stack>
        </Stack>
        <Collapse in={isShowFilters} timeout='auto' unmountOnExit>
          <Stack spacing={6} direction='row'>
            <FormControl fullWidth size='small'>
              <InputLabel id='select-role-label'>篩選角色</InputLabel>
              <Select
                fullWidth
                disabled={isFindRolesLoading}
                value={filteredRole}
                id='select-role'
                label='篩選角色'
                labelId='select-role-label'
                onChange={handleFilterRoleChange}
                inputProps={{ placeholder: '篩選角色' }}
              >
                <MenuItem value='all'>全部角色</MenuItem>
                {roles.map(role => (
                  <MenuItem key={`role-${role.id}`} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size='small'>
              <InputLabel id='select-block-status-label'>篩選狀態</InputLabel>
              <Select
                fullWidth
                value={filteredBlockStatus}
                id='select-block-status'
                label='篩選開通狀態'
                labelId='select-block-status-label'
                onChange={handleBlockStatusChange}
                inputProps={{ placeholder: '篩選狀態' }}
              >
                <MenuItem value='all'>全部狀態</MenuItem>
                <MenuItem value='notBlocked'>已開通</MenuItem>
                <MenuItem value='blocked'>已封鎖</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size='small'>
              <InputLabel id='select-is-highlighted-label'>篩選星號</InputLabel>
              <Select
                fullWidth
                value={filteredIsHighlighted}
                id='select-is-highlighted'
                label='篩選開通狀態'
                labelId='select-is-highlighted-label'
                onChange={handleIsHighlightedChange}
                inputProps={{ placeholder: '篩選星號' }}
              >
                <MenuItem value='all'>全部星號</MenuItem>
                <MenuItem value='isHighlighted'>已加星號</MenuItem>
                <MenuItem value='isNotHighlighted'>未加星號</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Collapse>
      </Stack>
    </CardContent>
  )
}

export default ManagementUserListHeaderCardContent
