// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** API Imports
import { useFindQuery } from 'src/store/api/roleAndPermission'

// ** Custom Component Imports
import SystemDashboardRolesAndPermissionsBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import SystemDashboardRolesList from 'src/views/system/roles-and-permissions/roles-list'
import SystemDashboardPermissionsList from 'src/views/system/roles-and-permissions/permissions-list'

const SystemDashboardRolesAndPermissionsPage = () => {
  // ** Hooks
  const { data: roles, isLoading: isRolesLoading } = useFindQuery(null)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SystemDashboardRolesAndPermissionsBreadcrumbs
          pageLevels={[{ title: 'PageBreadcrumb.System.Roles & Permissions.PageTitle' }]}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5'>角色列表</Typography>
        <Typography variant='body2'>
          角色提供對預定義選單和功能的訪問，以便管理員可以根據分配的角色訪問需要的內容
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SystemDashboardRolesList roles={roles!} isRolesLoading={isRolesLoading} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5'>權限列表</Typography>
        <Typography variant='body2'>
          每個角色都有一組預定義的權限，以便管理員可以根據分配的角色訪問需要的內容
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SystemDashboardPermissionsList />
      </Grid>
    </Grid>
  )
}

SystemDashboardRolesAndPermissionsPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default SystemDashboardRolesAndPermissionsPage
