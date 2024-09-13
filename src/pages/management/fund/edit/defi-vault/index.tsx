// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import ManagementFundDefiVaultEditLoadingSkeleton from 'src/views/management/fund/defi-vault/ManagementFundDefiVaultEditLoadingSkeleton'
import ManagementFundDefiVaultEditSection from 'src/views/management/fund/defi-vault'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/dvFund'

const ManagementFundDefiVaultEditPage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: dvFundEntity,
    isError: isFindOneDVFundEntityError,
    isLoading: isFindOneDVFundEntityLoading
  } = useFindOneQuery(null)

  if (isFindOneDVFundEntityError) {
    router.push('/management/fund/list')
  } else if (isFindOneDVFundEntityLoading) {
    return <ManagementFundDefiVaultEditLoadingSkeleton />
  } else {
    return <ManagementFundDefiVaultEditSection initDVFundEntity={dvFundEntity!} />
  }
}

ManagementFundDefiVaultEditPage.acl = {
  action: 'read',
  subject: 'asset-manager-page'
}

export default ManagementFundDefiVaultEditPage
