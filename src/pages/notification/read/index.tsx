// ** Next Imports
import { useRouter } from 'next/router'

const NotificationReadPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/notification/list')
}

NotificationReadPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default NotificationReadPage
