// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import PublicFundLiveLoadingSkeleton from 'src/views/fund/live/PublicFundLiveLoadingSkeleton'
import PublicFundLiveSection from 'src/views/fund/live'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/fund'

const PublicFundLivePage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: fundEntity,
    isError: isFindOneFundEntityError,
    isLoading: isFindOneFundEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneFundEntityError) {
    router.push('/fund/list')
  } else if (isFindOneFundEntityLoading) {
    return <PublicFundLiveLoadingSkeleton />
  } else {
    return <PublicFundLiveSection initFundEntity={fundEntity!} />
  }
}

PublicFundLivePage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PublicFundLivePage
