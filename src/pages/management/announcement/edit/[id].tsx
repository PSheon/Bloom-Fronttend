// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/announcement'

// ** Custom Component Imports
import ManagementAnnouncementEditLoadingSkeleton from 'src/views/management/announcement/edit/ManagementAnnouncementEditLoadingSkeleton'
import ManagementAnnouncementEditSection from 'src/views/management/announcement/edit'

const ManagementAnnouncementEditPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: announcementEntity,
    isError: isFindOneAnnouncementEntityError,
    isLoading: isFindOneAnnouncementEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneAnnouncementEntityError) {
    router.push('/management/announcement/list')
  } else if (isFindOneAnnouncementEntityLoading) {
    return <ManagementAnnouncementEditLoadingSkeleton />
  } else {
    return <ManagementAnnouncementEditSection initAnnouncementEntity={announcementEntity!} />
  }
}

ManagementAnnouncementEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementAnnouncementEditPage
