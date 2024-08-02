// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import PointsJoinSection from 'src/views/points/PointsJoinSection'
import PointsSection from 'src/views/points'
import PointsSectionLoadingSkeleton from 'src/views/points/LoadingSkeleton'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/referral'

const PointsPage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: meReferralsEntity,
    isError: isFindMeReferralsError,
    isLoading: isFindMeReferralsLoading
  } = useFindMeQuery({
    filters: {
      isActive: true
    },
    pagination: {
      page: 1,
      pageSize: 10
    }
  })

  // ** Vars
  const meReferrals = meReferralsEntity?.data || []

  if (isFindMeReferralsError) {
    router.push('/portfolio')
  } else if (isFindMeReferralsLoading) {
    return <PointsSectionLoadingSkeleton />
  } else if (meReferrals.length === 0) {
    return <PointsJoinSection />
  } else {
    return <PointsSection />
  }
}

PointsPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PointsPage
