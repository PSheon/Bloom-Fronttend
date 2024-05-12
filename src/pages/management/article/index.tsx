// ** Next Imports
import { useRouter } from 'next/router'

const ManagementArticlePage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/article/list')
}

ManagementArticlePage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementArticlePage
