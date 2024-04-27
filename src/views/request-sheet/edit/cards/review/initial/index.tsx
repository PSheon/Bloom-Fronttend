// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Custom Component Imports
import ReviewListLoadingSkeleton from 'src/views/request-sheet/edit/cards/review/shared/LoadingSkeleton'
import ReviewListViewForm from 'src/views/request-sheet/edit/cards/review/shared/ViewForm'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/review'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const InitialReviewCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** Hooks
  const session = useSession()
  const { data: reviewsData, isLoading: isReviewListLoading } = useFindQuery({
    filters: {
      requestSheet: initRequestSheetEntity.id,
      reviewer: session.data!.user?.id as number,
      processStatus: 'Initial review'
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
        subheader={<Typography variant='subtitle2'>請修改計畫書並回覆建議</Typography>}
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

export default InitialReviewCard
