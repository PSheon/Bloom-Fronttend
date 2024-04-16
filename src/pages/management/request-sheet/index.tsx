// ** Next Imports
import { useRouter } from 'next/router'

const RequestSheetManagementPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/request-sheet/list')
}

RequestSheetManagementPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default RequestSheetManagementPage
