// ** Next Import
import { useRouter } from 'next/router'

const RequestSheetPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/request-sheet/list')
}

RequestSheetPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default RequestSheetPage
