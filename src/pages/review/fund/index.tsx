// ** Next Imports
import { useRouter } from 'next/router'

const ReviewFundPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/review/dashboard')
}

ReviewFundPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ReviewFundPage
