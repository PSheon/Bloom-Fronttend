// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/fund'

// ** Custom Component Imports
// import RequestSheetEditLoadingSkeleton from 'src/views/review/request-sheet/edit/LoadingSkeleton'
import ReviewFundPreviewSection from 'src/views/review/fund/preview'

const ReviewFundPreviewPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: fundEntity,
    isError: isFindOneFundEntityError,
    isLoading: isFindOneFundEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneFundEntityError) {
    // router.push('/review/fund/list')
  } else if (isFindOneFundEntityLoading) {
    // return <FundEditLoadingSkeleton />
    return <>FundEditLoadingSkeleton</>
  } else {
    return <ReviewFundPreviewSection initFundEntity={fundEntity!} />
  }
}

ReviewFundPreviewPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ReviewFundPreviewPage
