// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'

// ** Custom Component Imports
import NotificationEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'

const NotificationEditLoadingSkeleton = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <NotificationEditBreadcrumbs
          pageLevels={[{ title: '申請管理', href: '/review/request-sheet/list' }, { title: '審核申請' }]}
        />
      </Grid>
      <Grid item xl={9} md={8} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Skeleton variant='text' sx={{ width: '30%', fontSize: '2rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant='rounded' height={64} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='申請細節' />
              <CardContent>
                <Skeleton variant='text' sx={{ width: '30%', fontSize: '1.25rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant='text' sx={{ width: '30%', fontSize: '1.25rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant='text' sx={{ width: '30%', fontSize: '1.25rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant='text' sx={{ width: '30%', fontSize: '1.25rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant='text' sx={{ width: '30%', fontSize: '1.25rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='計畫書' />
              <CardContent>
                <Skeleton variant='rounded' height={260} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={3} md={4} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Skeleton variant='rounded' height={64} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Skeleton variant='text' sx={{ width: '30%', fontSize: '1.5rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem', mb: 4 }} />
                <Button fullWidth disabled type='submit' variant='outlined'>
                  載入中
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant='subtitle2'>資訊</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='rounded' height={30} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='rounded' height={30} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='rounded' height={30} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant='subtitle2'>操作記錄</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='rounded' height={30} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='rounded' height={30} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='rounded' height={30} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NotificationEditLoadingSkeleton
