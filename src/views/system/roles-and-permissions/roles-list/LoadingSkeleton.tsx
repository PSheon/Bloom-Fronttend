// ** MUI Imports
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const RolesListLoadingSkeleton = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} lg={4}>
        <Skeleton variant='rounded' height={150} />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Skeleton variant='rounded' height={150} />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Skeleton variant='rounded' height={150} />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Skeleton variant='rounded' height={150} />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Skeleton variant='rounded' height={150} />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Skeleton variant='rounded' height={150} />
      </Grid>
    </Grid>
  )
}

export default RolesListLoadingSkeleton
