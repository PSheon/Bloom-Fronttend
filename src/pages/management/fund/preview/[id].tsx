// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import ManagementFundPreviewLoadingSkeleton from 'src/views/management/fund/preview/ManagementFundPreviewLoadingSkeleton'
import ManagementFundPreviewSection from 'src/views/management/fund/preview'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/fund'

const ManagementFundPreviewPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: fundEntity,
    isError: isFindOneFundEntityError,
    isLoading: isFindOneFundEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneFundEntityError) {
    router.push('/management/fund/list')
  } else if (isFindOneFundEntityLoading) {
    return <ManagementFundPreviewLoadingSkeleton />
  } else {
    return <ManagementFundPreviewSection initFundEntity={fundEntity!} />
  }
}

ManagementFundPreviewPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ManagementFundPreviewPage
