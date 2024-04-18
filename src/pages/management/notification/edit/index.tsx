// ** Next Imports
import { useRouter } from 'next/router'

const ManagementNotificationEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/notification/list')
}

ManagementNotificationEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementNotificationEditPage
