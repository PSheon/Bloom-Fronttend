// ** Next Imports
import { useRouter } from 'next/router'

const ManagementNotificationPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/notification/list')
}

ManagementNotificationPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementNotificationPage
