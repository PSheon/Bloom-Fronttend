// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Api Imports
import { useFindQuery } from 'src/store/api/roleAndPermission'

// ** Styled Component Import
import RolesAndPermissionsBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import RolesList from 'src/views/system/roles-and-permissions/roles-list'
import PermissionsList from 'src/views/system/roles-and-permissions/permissions-list'

const SystemRolesAndPermissionsPage = () => {
  // ** Hooks
  const { data: roles, isLoading: isRolesLoading } = useFindQuery(null)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <RolesAndPermissionsBreadcrumbs pageLevels={[{ title: '角色與權限' }]} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5'>角色列表</Typography>
        <Typography variant='body2'>
          角色提供對預定義選單和功能的訪問，以便管理員可以根據分配的角色訪問需要的內容
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RolesList roles={roles!} isRolesLoading={isRolesLoading} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5'>權限列表</Typography>
        <Typography variant='body2'>
          每個角色都有一組預定義的權限，以便管理員可以根據分配的角色訪問需要的內容
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PermissionsList />
      </Grid>
    </Grid>
  )
}

SystemRolesAndPermissionsPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default SystemRolesAndPermissionsPage
