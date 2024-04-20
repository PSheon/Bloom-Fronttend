// ** Next Imports
import { useRouter } from 'next/router'

const ManagementFundPreviewPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/fund/list')
}

ManagementFundPreviewPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ManagementFundPreviewPage
