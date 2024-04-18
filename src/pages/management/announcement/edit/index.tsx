// ** Next Imports
import { useRouter } from 'next/router'

const AnnouncementEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/announcement/list')
}

AnnouncementEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default AnnouncementEditPage
