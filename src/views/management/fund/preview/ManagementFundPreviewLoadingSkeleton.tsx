// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'

// ** Custom Component Imports
import ManagementFundPreviewBreadcrumbs from 'src/views/shared/PageBreadcrumbs'

const ManagementFundPreviewLoadingSkeleton = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementFundPreviewBreadcrumbs
          pageLevels={[{ title: '公開資金列表', href: '/management/fund/list' }, { title: '資金' }]}
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
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Skeleton variant='text' width={200} sx={{ fontSize: '1.6rem' }} />
              <Skeleton variant='text' />
              <Skeleton variant='text' />
              <Skeleton variant='rounded' height={240} />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Skeleton variant='text' width={200} sx={{ fontSize: '1.6rem' }} />
              <Skeleton variant='rounded' height={240} />
              <Skeleton variant='text' />
              <Skeleton variant='text' />
            </Stack>
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
              <Skeleton variant='text' />
              <Skeleton variant='text' />
            </Stack>
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
  )
}

export default ManagementFundPreviewLoadingSkeleton
