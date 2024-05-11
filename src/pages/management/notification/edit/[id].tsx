// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import ManagementNotificationEditLoadingSkeleton from 'src/views/management/notification/edit/ManagementNotificationEditLoadingSkeleton'
import ManagementNotificationEditSection from 'src/views/management/notification/edit'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/notification'

const ManagementNotificationEditPage = () => {
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
    return <ManagementNotificationEditLoadingSkeleton />
  } else {
    return <ManagementNotificationEditSection initNotificationEntity={notificationEntity!} />
  }
}

ManagementNotificationEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementNotificationEditPage
