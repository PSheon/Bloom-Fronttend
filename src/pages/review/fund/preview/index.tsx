// ** Next Imports
import { useRouter } from 'next/router'

const ReviewFundPreviewPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/review/dashboard')
}

ReviewFundPreviewPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ReviewFundPreviewPage
