// ** Next Imports
import { useRouter } from 'next/router'

const ManagementBlogEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/blog/list')
}

ManagementBlogEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementBlogEditPage
