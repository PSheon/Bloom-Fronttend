// ** Next Imports
import { useRouter } from 'next/router'

const NotificationManagementPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/notification/list')
}

NotificationManagementPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default NotificationManagementPage
