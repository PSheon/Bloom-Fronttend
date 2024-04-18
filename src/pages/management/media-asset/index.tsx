// ** Next Imports
import { useRouter } from 'next/router'

const MediaAssetManagementPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/media-asset/list')
}

MediaAssetManagementPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default MediaAssetManagementPage
