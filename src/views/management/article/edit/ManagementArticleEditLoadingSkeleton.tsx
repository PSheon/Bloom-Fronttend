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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Imports
import ManagementArticleEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'

// ** Type Imports
import type { TabProps } from '@mui/material/Tab'

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const ManagementArticleEditLoadingSkeleton = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementArticleEditBreadcrumbs
          pageLevels={[
            { title: 'PageBreadcrumb.Management.Articles.PageTitle', href: '/management/article/list' },
            { title: 'PageBreadcrumb.Management.Articles.Edit.PageTitle' }
          ]}
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
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2.7}>
                  <Grid item xs={12}>
                    <Typography variant='subtitle2'>Metadata</Typography>
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
    </Grid>
  )
}

export default ManagementArticleEditLoadingSkeleton
