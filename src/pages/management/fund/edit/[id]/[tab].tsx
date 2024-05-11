// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import ManagementFundEditLoadingSkeleton from 'src/views/management/fund/edit/ManagementFundEditLoadingSkeleton'
import ManagementFundEditSection from 'src/views/management/fund/edit'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/fund'

// ** Util Imports
import { getValidEditTabIndex } from 'src/utils'

const ManagementFundEditPage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: fundEntity,
    isError: isFindOneFundEntityError,
    isLoading: isFindOneFundEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  // ** Vars
  const tab = getValidEditTabIndex(router.query.tab)

  if (router.query.id === undefined || tab === undefined || isFindOneFundEntityError) {
    router.push('/management/fund/list')
  } else if (isFindOneFundEntityLoading) {
    return <ManagementFundEditLoadingSkeleton />
  } else {
    return <ManagementFundEditSection initFundEntity={fundEntity!} tab={tab} />
  }
}

ManagementFundEditPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ManagementFundEditPage
