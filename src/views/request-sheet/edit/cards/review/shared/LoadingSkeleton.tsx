// ** MUI Imports
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

const ReviewListLoadingSkeleton = () => {
  return (
    <Stack spacing={4}>
      <Stack spacing={4}>
        <Stack spacing={4} flex='1'>
          <Stack direction='row' alignItems='center' spacing={4}>
            <Skeleton variant='circular' width={40} height={40} />
            <Stack justifyContent='center' flex='1'>
              <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            </Stack>
            <Skeleton variant='rounded' width={60} height={40} />
          </Stack>
          <Skeleton variant='rounded' width='100%' height={80} />
        </Stack>
        <Stack spacing={2} flex='1' sx={{ pl: 6 }}>
          <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
          <Skeleton variant='rounded' width='100%' height={80} />
        </Stack>
      </Stack>
      <Stack spacing={4}>
        <Stack spacing={4} flex='1'>
          <Stack direction='row' alignItems='center' spacing={4}>
            <Skeleton variant='circular' width={40} height={40} />
            <Stack justifyContent='center' flex='1'>
              <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            </Stack>
            <Skeleton variant='rounded' width={60} height={40} />
          </Stack>
          <Skeleton variant='rounded' width='100%' height={80} />
        </Stack>
        <Stack spacing={2} flex='1' sx={{ pl: 6 }}>
          <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
          <Skeleton variant='rounded' width='100%' height={80} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ReviewListLoadingSkeleton
