// ** Next Imports
import { useRouter } from 'next/router'

const ReviewFundEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/review/dashboard')
}

ReviewFundEditPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ReviewFundEditPage
