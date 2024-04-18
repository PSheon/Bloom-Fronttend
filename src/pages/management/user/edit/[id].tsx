// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/user'

// ** Custom Component Imports
import ManagementUserEditLoadingSkeleton from 'src/views/management/user/edit/ManagementUserEditLoadingSkeleton'
import ManagementUserEditSection from 'src/views/management/user/edit'

const ManagementUserEditPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: UserEntity,
    isError: isFindOneUserEntityError,
    isLoading: isFindOneUserEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneUserEntityError) {
    router.push('/management/user/list')
  } else if (isFindOneUserEntityLoading) {
    return <ManagementUserEditLoadingSkeleton />
  } else {
    return <ManagementUserEditSection initUserEntity={UserEntity!} />
  }
}

ManagementUserEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementUserEditPage
