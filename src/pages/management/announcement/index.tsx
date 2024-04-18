// ** Next Imports
import { useRouter } from 'next/router'

const ManagementAnnouncementPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/announcement/list')
}

ManagementAnnouncementPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementAnnouncementPage
