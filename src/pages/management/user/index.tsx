// ** Next Imports
import { useRouter } from 'next/router'

const UserManagementPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/user/list')
}

UserManagementPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default UserManagementPage
