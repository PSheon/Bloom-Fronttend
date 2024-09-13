// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import PublicFundDefiVaultLoadingSkeleton from 'src/views/fund/defi-vault/PublicFundDefiVaultLoadingSkeleton'
import PublicFundDefiVaultSection from 'src/views/fund/defi-vault'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/dvFund'

const PublicFundLiveDefiVaultPage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: dvFundEntity,
    isError: isFindOneDVFundEntityError,
    isLoading: isFindOneDVFundEntityLoading
  } = useFindOneQuery(null)

  if (isFindOneDVFundEntityError) {
    router.push('/fund/list')
  } else if (isFindOneDVFundEntityLoading) {
    return <PublicFundDefiVaultLoadingSkeleton />
  } else {
    return <PublicFundDefiVaultSection initDVFundEntity={dvFundEntity!} />
  }
}

PublicFundLiveDefiVaultPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PublicFundLiveDefiVaultPage
