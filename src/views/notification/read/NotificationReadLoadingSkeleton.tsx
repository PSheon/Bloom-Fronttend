// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import MuiTab from '@mui/material/Tab'

// ** Custom Component Imports
import NotificationReadBreadcrumbs from 'src/views/shared/PageBreadcrumbs'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { TabProps } from '@mui/material/Tab'

// ** Styled Tab Component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const NotificationReadLoadingSkeleton = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <NotificationReadBreadcrumbs
          pageLevels={[{ title: '我的通知', href: '/notification/list' }, { title: '查看通知' }]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Skeleton variant='rounded' height={200} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='rounded' />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth disabled type='submit' variant='contained'>
                      編輯
                    </Button>
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
                    <Typography variant='subtitle2'>屬性</Typography>
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
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TabContext value='overview'>
              <TabList
                variant='scrollable'
                scrollButtons='auto'
                aria-label='forced scroll tabs'
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
              >
                <Tab value='overview' label='Overview' icon={<Icon icon='mdi:view-dashboard-outline' />} />
                <Tab value='security' label='Security' icon={<Icon icon='mdi:lock-outline' />} />
              </TabList>
            </TabContext>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant='subtitle2'>
                      <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
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
                    <Typography variant='subtitle2'>
                      <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xl={9} md={8} xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h6'>通知對象</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={6} flexWrap='nowrap'>
                  <Grid item>
                    <Skeleton variant='rounded' width={80} height={80} />
                  </Grid>
                  <Grid container item flexGrow='1' flexDirection='column' justifyContent='center'>
                    <Grid item>
                      <Skeleton variant='text' sx={{ width: '30%', fontSize: '2rem' }} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6'>標題</Typography>
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6'>內文</Typography>
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant='rounded' height={260} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}
      {/* <Grid item xl={3} md={4} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Skeleton variant='rounded' height={64} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      disabled
                      type='submit'
                      variant='contained'
                      startIcon={<Icon icon='mdi:content-save-outline' />}
                    >
                      儲存通知
                    </Button>
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
        </Grid>
      </Grid> */}
    </Grid>
  )
}

export default NotificationReadLoadingSkeleton
