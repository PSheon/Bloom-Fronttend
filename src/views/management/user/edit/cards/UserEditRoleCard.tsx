// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

// ** API Imports
import { useFindQuery } from 'src/store/api/roleAndPermission'
import { useUpdateOneMutation } from 'src/store/api/management/user'

// ** Util Imports
import { getUserRoleAttributes } from 'src/utils'

// ** Config Imports
import { Permissions } from 'src/configs/acl'

// ** Type Imports
import { UserDataType } from 'src/context/types'

interface Props {
  initUserEntity: UserDataType
}

const UserEditRoleCard = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [selectedRoleId, setSelectedRoleId] = useState<number>(initUserEntity.role!.id)

  // ** Hooks
  const auth = useAuth()
  const { data: roles = [], isLoading: isFindRolesLoading } = useFindQuery(null)
  const [updateUser, { data: updatedUser = initUserEntity, isLoading: isUpdateUserLoading }] = useUpdateOneMutation()

  // ** Vars
  const userRoleAttributes = getUserRoleAttributes(updatedUser.role!.name)
  const userPermissions = Permissions.filter(permission =>
    permission.assignedTo.includes(roles.find(role => role.id === selectedRoleId)!.name)
  )

  // ** Logics
  const handleEditOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  const handleRoleSelected = async (event: SelectChangeEvent) => {
    setSelectedRoleId(() => Number(event.target.value))
  }
  const handleRoleChange = async () => {
    await updateUser({
      id: initUserEntity.id,
      data: {
        role: selectedRoleId
      }
    })
    handleEditClose()
  }

  return (
    <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
      <CardContent>
        <Grid container spacing={2.7}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>角色權限</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              sx={{
                color: `${userRoleAttributes.color}.main`
              }}
            >
              {userRoleAttributes.displayName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                mb: 2.5,
                alignItems: 'center',
                '& svg': { mr: 2, color: 'text.secondary' }
              }}
            >
              <Icon icon='mdi:circle' fontSize='0.625rem' />
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                {userRoleAttributes.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant='contained'
              disabled={auth.user!.id === initUserEntity.id}
              onClick={handleEditOpen}
            >
              變更權限
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-role'
        aria-describedby='user-view-role-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle
          id='user-view-role'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          變更使用者角色
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText variant='body2' id='user-view-role-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
            不同角色有不同的權限，請根據使用者的需求選擇適合的角色
          </DialogContentText>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                {isFindRolesLoading ? (
                  <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
                ) : (
                  <Select
                    fullWidth
                    disabled={auth.user!.id === initUserEntity.id}
                    value={selectedRoleId.toString(10)}
                    onChange={handleRoleSelected}
                  >
                    {roles!.map(role => (
                      <MenuItem key={`role-${role.id}`} value={role.id}>
                        {getUserRoleAttributes(role.name).displayName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1' sx={{ fontSize: '0.875rem' }}>
                包含以下權限：
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {userPermissions.map((permission, index) => (
                <Box
                  key={`permission-${permission.id}`}
                  sx={{
                    display: 'flex',
                    mb: 2.5,
                    alignItems: 'center',
                    '& svg': { mr: 2, color: 'text.secondary' },
                    ...(index > 0 && { mt: 2.5 })
                  }}
                >
                  <Icon icon='mdi:circle' fontSize='0.625rem' />
                  <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                    {permission.displayName}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            取消
          </Button>
          <LoadingButton
            loading={isUpdateUserLoading}
            disabled={updatedUser.role!.id === selectedRoleId}
            variant='contained'
            onClick={handleRoleChange}
            endIcon={<Icon icon='mdi:content-save-outline' />}
          >
            儲存
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default UserEditRoleCard
