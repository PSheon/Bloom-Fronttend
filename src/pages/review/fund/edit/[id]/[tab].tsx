// ** Next Import
import { useRouter } from 'next/router'

// ** Api Imports
import { useFindOneQuery } from 'src/store/api/management/fund'

// ** Utils
import { getValidTabIndex } from 'src/utils'

// ** Styled Component
// import RequestSheetEditLoadingSkeleton from 'src/views/review/request-sheet/edit/LoadingSkeleton'
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
  const tab = getValidTabIndex(router.query.tab)

  if (router.query.id === undefined || tab === undefined || isFindOneFundEntityError) {
    // router.push('/review/fund/list')
  } else if (isFindOneFundEntityLoading) {
    // return <FundEditLoadingSkeleton />
    return <>FundEditLoadingSkeleton</>
  } else {
    return <ReviewFundEditSection initFundEntity={fundEntity!} tab={tab} />
  }
}

ReviewFundEditPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ReviewFundEditPage
