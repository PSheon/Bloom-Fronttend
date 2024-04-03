// ** Next Import
import { useRouter } from 'next/router'

const NotificationPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/notification/list')
}

NotificationPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default NotificationPage
