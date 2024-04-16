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

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/statistic'

// ** Util Imports
import { getProcessStatusList, getRequestSheetProcessStatusAttributes, getStatisticProcessStatusValue } from 'src/utils'

const RequestSheetOverviewCard = () => {
  // ** Hooks
  const { data: statisticEntity, isLoading: isFindOneStatisticEntityLoading } = useFindOneQuery(null)

  // ** Vars
  const processStatusList = getProcessStatusList().slice(1)

  return (
    <Card>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='審核統計'
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
            {Array.from(Array(6).keys()).map(index => (
              <Grid key={`request-sheet-overview-skeleton-${index}`} item xs={12} md={2}>
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
            {processStatusList.map((processStatus, index) => {
              const { color, icon, displayName } = getRequestSheetProcessStatusAttributes(processStatus)

              return (
                <Grid key={`overview-process-status-${index}`} item xs={12} md={2}>
                  <Stack direction='row' alignItems='center' spacing={4}>
                    <CustomAvatar skin='light' variant='rounded' color={color}>
                      <Icon icon={icon} />
                    </CustomAvatar>
                    <Stack direction='column' spacing={0} flex='1'>
                      <Typography variant='h6' sx={{ fontWeight: 600 }}>
                        {getStatisticProcessStatusValue(statisticEntity!, processStatus)}
                      </Typography>
                      <Typography variant='caption'>{displayName}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              )
            })}
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}

export default RequestSheetOverviewCard
