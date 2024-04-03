// ** MUI Imports
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const ActivityTimelineLoadingSkeleton = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
      </Grid>
    </Grid>
  )
}

export default ActivityTimelineLoadingSkeleton
