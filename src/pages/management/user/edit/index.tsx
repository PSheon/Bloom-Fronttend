// ** Next Imports
import { useRouter } from 'next/router'

const ManagementUserEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/user/list')
}

ManagementUserEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementUserEditPage
