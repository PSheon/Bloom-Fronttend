// ** Core Component Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

const ReviewDashboardSessionsCard = () => {
  return (
    <CardStatisticsCharacter
      data={{
        stats: '12.2k',
        trend: 'negative',
        title: 'Sessions',
        chipColor: 'success',
        trendNumber: '-25.5%',
        chipText: 'Last Month',
        src: '/images/cards/card-stats-img-2.png'
      }}
    />
  )
}

export default ReviewDashboardSessionsCard
