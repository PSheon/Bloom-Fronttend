// ** Next Imports
import { useRouter } from 'next/router'

const ManagementFundEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/fund/list')
}

ManagementFundEditPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ManagementFundEditPage
