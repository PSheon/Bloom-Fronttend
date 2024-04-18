// ** Next Imports
import { useRouter } from 'next/router'

const RequestSheetManagementPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/request-sheet/list')
}

RequestSheetManagementPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default RequestSheetManagementPage
