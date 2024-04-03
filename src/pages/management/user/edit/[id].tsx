// ** Next Import
import { useRouter } from 'next/router'

// ** Api Imports
import { useFindOneQuery } from 'src/store/api/management/user'

// ** Styled Component
import UserEditLoadingSkeleton from 'src/views/management/user/edit/LoadingSkeleton'
import UserEditSection from 'src/views/management/user/edit'

const UserEditPage = () => {
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
    return <UserEditLoadingSkeleton />
  } else {
    return <UserEditSection initUserEntity={UserEntity!} />
  }
}

UserEditPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default UserEditPage
