// ** Next Imports
import { useRouter } from 'next/router'

const NotificationEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/notification/list')
}

NotificationEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default NotificationEditPage
