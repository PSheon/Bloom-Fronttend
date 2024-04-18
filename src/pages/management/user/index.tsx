// ** Next Imports
import { useRouter } from 'next/router'

const UserManagementPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/user/list')
}

UserManagementPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default UserManagementPage
