// ** Next Imports
import { useRouter } from 'next/router'

const ManagementBlogPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/blog/list')
}

ManagementBlogPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementBlogPage
