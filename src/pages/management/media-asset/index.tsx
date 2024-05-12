// ** Next Imports
import { useRouter } from 'next/router'

const ManagementMediaAssetPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/media-asset/list')
}

ManagementMediaAssetPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementMediaAssetPage
