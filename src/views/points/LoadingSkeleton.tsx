// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'

// ** Custom Component Imports
import PointsBreadcrumbs from 'src/views/shared/PageBreadcrumbs'

const PointsLoadingSkeleton = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <PointsBreadcrumbs pageLevels={[{ title: 'PageBreadcrumb.Me.Points.PageTitle' }]} />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent
                sx={{ pt: 15, position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
              >
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
                      <Skeleton variant='circular' width={120} height={120} />
                      <Skeleton variant='rounded' width={160} />
                      <Stack spacing={4} alignItems='center' justifyContent='center'>
                        <Skeleton variant='rounded' width={180} />
                        <Skeleton variant='rounded' width={120} />
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant='subtitle2'>Invitation link</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                      <Skeleton variant='text' width={200} />
                      <Stack
                        direction='row'
                        spacing={4}
                        alignSelf='stretch'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Skeleton variant='rounded' height={36} sx={{ flex: '1' }} />
                        <Skeleton variant='rounded' width={36} height={36} />
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                      <Skeleton variant='text' width={200} />
                      <Stack
                        direction='row'
                        spacing={4}
                        alignSelf='stretch'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Skeleton variant='rounded' height={36} sx={{ flex: '1' }} />
                        <Skeleton variant='rounded' width={36} height={36} />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='h6' component='h3'>
                    Statistics
                  </Typography>
                }
                subheader={<Skeleton variant='text' width={200} />}
              />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={4}>
                    <Stack
                      direction='row'
                      spacing={4}
                      alignSelf='stretch'
                      alignItems='center'
                      justifyContent='flex-start'
                    >
                      <Skeleton variant='rounded' width={40} height={40} />
                      <Stack alignItems='flex-start' justifyContent='center'>
                        <Skeleton variant='text' width={180} />
                        <Skeleton variant='text' width={80} />
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack
                      direction='row'
                      spacing={4}
                      alignSelf='stretch'
                      alignItems='center'
                      justifyContent='flex-start'
                    >
                      <Skeleton variant='rounded' width={40} height={40} />
                      <Stack alignItems='flex-start' justifyContent='center'>
                        <Skeleton variant='text' width={180} />
                        <Skeleton variant='text' width={80} />
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack
                      direction='row'
                      spacing={4}
                      alignSelf='stretch'
                      alignItems='center'
                      justifyContent='flex-start'
                    >
                      <Skeleton variant='rounded' width={40} height={40} />
                      <Stack alignItems='flex-start' justifyContent='center'>
                        <Skeleton variant='text' width={180} />
                        <Skeleton variant='text' width={80} />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Stack spacing={6} alignItems='flex-start' justifyContent='center'>
                  <Skeleton variant='text' width={180} />

                  <Skeleton variant='rounded' width='100%' height={200} />

                  <Stack alignItems='flex-start' justifyContent='center'>
                    <Skeleton variant='text' width={280} />
                    <Skeleton variant='text' width={280} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Stack spacing={6} alignItems='flex-start' justifyContent='center'>
                  <Skeleton variant='text' width={180} />

                  <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                    {[...Array(5).keys()].map(index => {
                      return (
                        <Stack
                          key={`123123123-${index}`}
                          spacing={4}
                          alignSelf='stretch'
                          alignItems='flex-start'
                          justifyContent='center'
                        >
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Stack
                              direction='row'
                              spacing={4}
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='flex-start'
                            >
                              <Skeleton variant='rounded' width={40} height={40} />
                              <Stack alignItems='flex-start' justifyContent='center'>
                                <Skeleton variant='text' width={180} />
                                <Skeleton variant='text' width={80} />
                              </Stack>
                            </Stack>
                            <Skeleton variant='rounded' width={40} height={40} />
                          </Stack>
                        </Stack>
                      )
                    })}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Stack spacing={6} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                  <Skeleton variant='text' width={180} />

                  <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                    <Skeleton variant='text' width='100%' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' width='100%' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' width='100%' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' width='100%' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' width='100%' sx={{ fontSize: '1.25rem' }} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PointsLoadingSkeleton
