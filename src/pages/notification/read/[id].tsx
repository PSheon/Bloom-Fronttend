// ** Next Import
import { useRouter } from 'next/router'

// ** Api Imports
import { useFindMeOneQuery } from 'src/store/api/management/notification'

// ** Styled Component
import NotificationReadLoadingSkeleton from 'src/views/notification/read/LoadingSkeleton'
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
