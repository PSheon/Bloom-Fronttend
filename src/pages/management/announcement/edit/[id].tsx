// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/announcement'

// ** Custom Component Imports
import AnnouncementEditLoadingSkeleton from 'src/views/management/announcement/edit/LoadingSkeleton'
import AnnouncementEditSection from 'src/views/management/announcement/edit'

const AnnouncementEditPage = () => {
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
    return <AnnouncementEditLoadingSkeleton />
  } else {
    return <AnnouncementEditSection initAnnouncementEntity={announcementEntity!} />
  }
}

AnnouncementEditPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default AnnouncementEditPage
