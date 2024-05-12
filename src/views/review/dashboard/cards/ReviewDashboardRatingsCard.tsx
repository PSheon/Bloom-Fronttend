// ** Custom Component Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

const ReviewDashboardRatingsCard = () => {
  return (
    <CardStatisticsCharacter
      data={{
        stats: '8.14k',
        title: 'Ratings',
        chipColor: 'primary',
        trendNumber: '+15.6%',
        chipText: 'Year of 2022',
        src: '/images/cards/card-stats-img-1.png'
      }}
    />
  )
}

export default ReviewDashboardRatingsCard
