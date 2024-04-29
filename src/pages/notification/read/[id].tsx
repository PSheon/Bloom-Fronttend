// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindMeOneQuery } from 'src/store/api/management/notification'

// ** Custom Component Imports
import NotificationReadLoadingSkeleton from 'src/views/notification/read/NotificationReadLoadingSkeleton'
import NotificationReadSection from 'src/views/notification/read'

const NotificationReadPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: notificationEntity,
    isError: isFindOneNotificationEntityError,
    isLoading: isFindOneNotificationEntityLoading
  } = useFindMeOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneNotificationEntityError) {
    router.push('/notification/list')
  } else if (isFindOneNotificationEntityLoading) {
    return <NotificationReadLoadingSkeleton />
  } else {
    return <NotificationReadSection initNotificationEntity={notificationEntity!} />
  }
}

NotificationReadPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default NotificationReadPage
