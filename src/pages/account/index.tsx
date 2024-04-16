// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindMeOneQuery } from 'src/store/api/management/user'

// ** Custom Component Imports
import AccountLoadingSkeleton from 'src/views/account/LoadingSkeleton'
import AccountSection from 'src/views/account'

const AccountPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: MeUserEntity,
    isError: isFindMeUserEntityError,
    isLoading: isFindMeUserEntityLoading
  } = useFindMeOneQuery(null)

  if (isFindMeUserEntityError) {
    router.push('/')
  } else if (isFindMeUserEntityLoading) {
    return <AccountLoadingSkeleton />
  } else {
    return <AccountSection initMeUserEntity={MeUserEntity!} />
  }
}

AccountPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default AccountPage
