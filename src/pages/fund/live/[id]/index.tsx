// ** Next Imports
import { useRouter } from 'next/router'

const PublicFundLivePage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/fund/list')
}

PublicFundLivePage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PublicFundLivePage
