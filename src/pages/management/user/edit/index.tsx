// ** Next Imports
import { useRouter } from 'next/router'

const UserEditPage = () => {
  // ** Hooks
  const router = useRouter()

  router.push('/management/user/list')
}

UserEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default UserEditPage
