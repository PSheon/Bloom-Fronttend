// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'

// ** Custom Component Imports
import ReviewFundEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'

const ReviewFundEditLoadingSkeleton = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ReviewFundEditBreadcrumbs
          pageLevels={[{ title: 'Fund Review', href: '/review/dashboard' }, { title: 'Edit' }]}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Stack spacing={4}>
              <Skeleton variant='rounded' height={160} />
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems='center'>
                <Skeleton variant='rounded' width={128} height={96} />
                <Stack spacing={4} alignItems={{ xs: 'center', md: 'flex-start' }}>
                  <Skeleton variant='rounded' width={160} height={32} />
                  <Skeleton variant='rounded' width={256} height={24} />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant='rounded' height={64} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={6} alignItems='center'>
                      <Grid item xs={12}>
                        <Stack spacing={2} alignItems='center'>
                          <Skeleton variant='rounded' width={200} height={200} />
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={2}>
                          <Skeleton variant='text' sx={{ fontSize: '1.6rem' }} />
                          <Skeleton variant='text' />
                          <Skeleton variant='text' />
                          <Skeleton variant='text' />
                          <Skeleton variant='text' />
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Skeleton variant='text' width={200} sx={{ fontSize: '1.6rem' }} />
                      <Skeleton variant='text' />
                      <Skeleton variant='text' />
                      <Skeleton variant='text' />
                      <Skeleton variant='text' />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Stack spacing={4}>
                      <Skeleton variant='rounded' width={200} height={24} />
                      <Skeleton variant='rounded' height={48} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Skeleton variant='rounded' width={200} height={24} />
                  <Skeleton variant='text' sx={{ fontSize: '1.2rem' }} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReviewFundEditLoadingSkeleton
