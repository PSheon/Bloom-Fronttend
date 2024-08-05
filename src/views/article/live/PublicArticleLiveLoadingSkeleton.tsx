// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

const PublicArticleLiveLoadingSkeleton = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Skeleton variant='text' width={120} />
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={4}>
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start'>
            <Skeleton variant='text' width={120} />
            <Typography variant='subtitle2' component='p'>
              <Skeleton variant='text' width={80} />
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography variant='h3' component='p'>
              <Skeleton variant='text' width='60%' />
            </Typography>
            <Typography variant='h6' component='p'>
              <Skeleton variant='text' width='40%' />
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} lg={9}>
            <Stack spacing={2}>
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='100%' />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Stack spacing={4}>
              <Skeleton variant='text' width={60} />
              <Stack direction='row' spacing={4} alignItems='center'>
                <Skeleton variant='circular' width={34} height={34} />
                <Stack alignItems='flex-start'>
                  <Skeleton variant='text' width={120} />
                  <Skeleton variant='text' width={80} />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PublicArticleLiveLoadingSkeleton
