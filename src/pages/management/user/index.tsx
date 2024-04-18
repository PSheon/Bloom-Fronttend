// ** Next Imports
import { useRouter } from 'next/router'

const ManagementUserPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/user/list')
}

ManagementUserPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementUserPage
