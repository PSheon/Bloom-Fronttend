// ** Next Import
import { useRouter } from 'next/router'

const RequestSheetEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/review/request-sheet/list')
}

RequestSheetEditPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default RequestSheetEditPage
