// ** Next Imports
import { useRouter } from 'next/router'

const RequestSheetEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/request-sheet/list')
}

RequestSheetEditPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default RequestSheetEditPage
