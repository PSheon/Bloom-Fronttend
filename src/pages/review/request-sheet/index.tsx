// ** Next Import
import { useRouter } from 'next/router'

const RequestSheetReviewPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/review/request-sheet/list')
}

RequestSheetReviewPage.acl = {
  action: 'read',
  subject: 'reviewer-page'
}

export default RequestSheetReviewPage
