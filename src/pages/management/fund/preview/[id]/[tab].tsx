// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import ManagementFundPreviewLoadingSkeleton from 'src/views/management/fund/preview/ManagementFundPreviewLoadingSkeleton'
import ManagementFundPreviewSection from 'src/views/management/fund/preview'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/fund'

// ** Util Imports
import { getValidPreviewTabIndex } from 'src/utils'

const ManagementFundPreviewPage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: fundEntity,
    isError: isFindOneFundEntityError,
    isLoading: isFindOneFundEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  // ** Vars
  const tab = getValidPreviewTabIndex(router.query.tab)

  if (router.query.id === undefined || tab === undefined || isFindOneFundEntityError) {
    router.push('/management/fund/list')
  } else if (isFindOneFundEntityLoading) {
    return <ManagementFundPreviewLoadingSkeleton />
  } else {
    return <ManagementFundPreviewSection initFundEntity={fundEntity!} tab={tab} />
  }
}

ManagementFundPreviewPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ManagementFundPreviewPage
