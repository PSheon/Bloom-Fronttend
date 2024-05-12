// ** Next Imports
import { useRouter } from 'next/router'

const ManagementArticleEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/article/list')
}

ManagementArticleEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementArticleEditPage
