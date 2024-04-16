// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/statistic'

const UserOverviewCard = () => {
  // ** Hooks
  const { data: statisticEntity, isLoading: isFindOneStatisticEntityLoading } = useFindOneQuery(null)

  return (
    <Card>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='使用者統計'
        titleTypographyProps={{ variant: 'h6' }}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='caption'>每 5 分鐘更新一次</Typography>
          </Box>
        }
        action={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              '& svg': { color: 'success.main' }
            }}
          >
            <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
              {isFindOneStatisticEntityLoading ? (
                <Skeleton variant='text' width={80} />
              ) : (
                format(new Date(statisticEntity!.updatedAt), 'yyyy/MM/dd HH:mm')
              )}
            </Typography>
            <Typography variant='caption'>上次更新</Typography>
          </Box>
        }
      />
      <CardContent>
        {isFindOneStatisticEntityLoading ? (
          <Grid container spacing={6}>
            {Array.from(Array(3).keys()).map(index => (
              <Grid key={`users-overview-skeleton-${index}`} item xs={12} md={4}>
                <Stack direction='row' alignItems='center' spacing={4}>
                  <Skeleton variant='rounded' width={48} height={48} />
                  <Stack direction='column' spacing={0} flex='1'>
                    <Typography variant='h6' sx={{ fontWeight: 600 }}>
                      <Skeleton />
                    </Typography>
                    <Typography variant='caption'>
                      <Skeleton />
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Stack direction='row' alignItems='center' spacing={4}>
                <CustomAvatar skin='light' variant='rounded' color='success'>
                  <Icon icon='mdi:users-group-outline' />
                </CustomAvatar>
                <Stack direction='column' spacing={0} flex='1'>
                  <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    {statisticEntity?.usersTotal || 0}
                  </Typography>
                  <Typography variant='caption'>總數</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction='row' alignItems='center' spacing={4}>
                <CustomAvatar skin='light' variant='rounded' color='info'>
                  <Icon icon='mdi:check-bold' />
                </CustomAvatar>
                <Stack direction='column' spacing={0} flex='1'>
                  <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    {statisticEntity?.usersIsConfirmed || 0}
                  </Typography>
                  <Typography variant='caption'>已開通</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction='row' alignItems='center' spacing={4}>
                <CustomAvatar skin='light' variant='rounded' color='error'>
                  <Icon icon='mdi:block-helper' />
                </CustomAvatar>
                <Stack direction='column' spacing={0} flex='1'>
                  <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    {statisticEntity?.usersIsBlocked || 0}
                  </Typography>
                  <Typography variant='caption'>已封鎖</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}

export default UserOverviewCard
