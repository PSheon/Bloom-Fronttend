// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/fund'

// ** Util Imports
import { getValidEditTabIndex } from 'src/utils'

// ** Custom Component Imports
import ReviewFundEditLoadingSkeleton from 'src/views/review/fund/edit/ReviewFundEditLoadingSkeleton'
import ReviewFundEditSection from 'src/views/review/fund/edit'

const ReviewFundEditPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: fundEntity,
    isError: isFindOneFundEntityError,
    isLoading: isFindOneFundEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  // ** Vars
  const tab = getValidEditTabIndex(router.query.tab)

  if (router.query.id === undefined || tab === undefined || isFindOneFundEntityError) {
    router.push('/review/dashboard')
  } else if (isFindOneFundEntityLoading) {
    return <ReviewFundEditLoadingSkeleton />
  } else {
    return <ReviewFundEditSection initFundEntity={fundEntity!} tab={tab} />
  }
}

ReviewFundEditPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ReviewFundEditPage
