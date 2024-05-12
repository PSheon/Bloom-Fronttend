// ** MUI Imports
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'

const PublicArticleListLoadingSkeletonCard = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={4}>
          <Skeleton variant='rounded' width='100%' height={200} />
          <Stack spacing={2} flexGrow={1}>
            <Skeleton variant='text' width={280} sx={{ fontSize: '1.6rem' }} />
            <Skeleton variant='text' width={200} sx={{ fontSize: '1.2rem' }} />
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
            <Stack direction='row' spacing={2}>
              <Skeleton variant='circular' width={22} height={22} />
              <Skeleton variant='text' width={200} />
            </Stack>
            <Skeleton variant='text' width={120} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PublicArticleListLoadingSkeletonCard
