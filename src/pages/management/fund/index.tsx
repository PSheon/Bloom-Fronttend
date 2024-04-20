// ** Next Imports
import { useRouter } from 'next/router'

const ManagementFundPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/dashboard')
}

ManagementFundPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementFundPage
