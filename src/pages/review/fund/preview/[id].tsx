// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import ReviewFundPreviewLoadingSkeleton from 'src/views/review/fund/preview/ReviewFundPreviewLoadingSkeleton'
import ReviewFundPreviewSection from 'src/views/review/fund/preview'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/fund'

const ReviewFundPreviewPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: fundEntity,
    isError: isFindOneFundEntityError,
    isLoading: isFindOneFundEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneFundEntityError) {
    router.push('/review/dashboard')
  } else if (isFindOneFundEntityLoading) {
    return <ReviewFundPreviewLoadingSkeleton />
  } else {
    return <ReviewFundPreviewSection initFundEntity={fundEntity!} />
  }
}

ReviewFundPreviewPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ReviewFundPreviewPage
