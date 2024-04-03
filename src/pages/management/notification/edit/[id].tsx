// ** Next Import
import { useRouter } from 'next/router'

// ** Api Imports
import { useFindOneQuery } from 'src/store/api/management/notification'

// ** Styled Component
import NotificationEditLoadingSkeleton from 'src/views/management/notification/edit/LoadingSkeleton'
import NotificationEditSection from 'src/views/management/notification/edit'

const NotificationEditPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: notificationEntity,
    isError: isFindOneNotificationEntityError,
    isLoading: isFindOneNotificationEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneNotificationEntityError) {
    router.push('/management/notification/list')
  } else if (isFindOneNotificationEntityLoading) {
    return <NotificationEditLoadingSkeleton />
  } else {
    return <NotificationEditSection initNotificationEntity={notificationEntity!} />
  }
}

NotificationEditPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default NotificationEditPage
