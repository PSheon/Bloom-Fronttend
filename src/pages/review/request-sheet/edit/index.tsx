// ** Next Import
import { useRouter } from 'next/router'

const RequestSheetEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/review/request-sheet/list')
}

RequestSheetEditPage.acl = {
  action: 'read',
  subject: 'reviewer-page'
}

export default RequestSheetEditPage
