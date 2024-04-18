// ** Next Imports
import { useRouter } from 'next/router'

const ManagementMediaAssetEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/media-asset/list')
}

ManagementMediaAssetEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementMediaAssetEditPage
