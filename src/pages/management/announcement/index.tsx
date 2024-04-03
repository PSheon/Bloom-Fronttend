// ** Next Import
import { useRouter } from 'next/router'

const AnnouncementManagementPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/announcement/list')
}

AnnouncementManagementPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default AnnouncementManagementPage
