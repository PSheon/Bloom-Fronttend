// ** MUI Imports
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'

const PublicFundListLoadingSkeletonCard = () => {
  return (
    <Card>
      <CardContent>
        <Stack direction='row' spacing={4}>
          <Skeleton variant='rounded' width={200} height={200} />
          <Stack spacing={2} flexGrow={1}>
            <Skeleton variant='text' width={200} sx={{ fontSize: '1.6rem' }} />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PublicFundListLoadingSkeletonCard
