// ** Next Imports
import { useRouter } from 'next/router'

const PublicFundPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/fund/list')
}

PublicFundPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PublicFundPage
