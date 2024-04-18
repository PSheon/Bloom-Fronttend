// ** Next Imports
import { useRouter } from 'next/router'

const ManagementAnnouncementEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/announcement/list')
}

ManagementAnnouncementEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementAnnouncementEditPage
