// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'

// ** Custom Component Imports
import ReviewListLoadingSkeleton from 'src/views/review/request-sheet/edit/cards/review/shared/LoadingSkeleton'
import ReviewListViewForm from 'src/views/review/request-sheet/edit/cards/review/shared/ViewForm'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/review'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const SecondaryReviewCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Hooks
  const auth = useAuth()
  const { data: reviewsData, isLoading: isReviewListLoading } = useFindQuery({
    filters: {
      requestSheet: initRequestSheetEntity.id,
      reviewer: auth.user?.id as number,
      processStatus: 'Secondary review'
    },
    pagination: {
      page: 1,
      pageSize: 25
    }
  })

  // ** Vars
  const reviews = reviewsData?.data || []

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            初審建議
          </Typography>
        }
        subheader={<Typography variant='subtitle2'>建議將匿名顯示</Typography>}
      />
      <CardContent>
        <Stack spacing={4}>
          {isReviewListLoading ? (
            <ReviewListLoadingSkeleton />
          ) : (
            <TransitionGroup>
              {reviews.map(review => (
                <Collapse key={`review-${review.id}`} sx={{ mb: 4 }}>
                  <ReviewListViewForm initReviewEntity={review} />
                </Collapse>
              ))}
            </TransitionGroup>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SecondaryReviewCard
