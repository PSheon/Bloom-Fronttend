// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import toast from 'react-hot-toast'
import isAfter from 'date-fns/isAfter'
import addDays from 'date-fns/addDays'
import Countdown from 'react-countdown'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** API Imports
import {
  useDailyCheckMutation as useDailyCheckMutation,
  useFindMeQuery as useFindMeDailyCheckRecordQuery
} from 'src/store/api/management/dailyCheckRecord'

const MePointsLevelDailyCheckTaskStack = () => {
  const { data: meDailyCheckRecordsData } = useFindMeDailyCheckRecordQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 3
    }
  })

  const [dailyCheck, { isLoading: isDailyCheckLoading }] = useDailyCheckMutation()

  // ** Vars
  const dailyCheckRecords = meDailyCheckRecordsData?.data || []
  const latestDailyCheckDate = dailyCheckRecords[0]?.date ? new Date(dailyCheckRecords[0].date) : new Date(0)
  const allowedDailyCheck = isAfter(new Date(), addDays(latestDailyCheckDate, 1))

  // ** Logics
  const handleDailyCheck = async () => {
    try {
      await dailyCheck(null).unwrap()
    } catch (error) {
      toast.error('Failed to check in')
    }
  }

  return (
    <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
      <Stack direction='row' spacing={4} alignSelf='stretch' alignItems='center' justifyContent='flex-start'>
        <CustomAvatar skin='light' variant='rounded' sx={{ width: 50, height: 50 }}>
          <Icon icon='mdi:alarm-check' fontSize='2rem' />
        </CustomAvatar>
        <Stack alignItems='flex-start' justifyContent='center'>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            Daily Check
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            You can check in every 24 hours
          </Typography>
        </Stack>
        <Stack flex='1' alignItems='flex-end' justifyContent='center'>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            +60
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            exp
          </Typography>
        </Stack>
      </Stack>

      {allowedDailyCheck ? (
        <Stack spacing={2} alignSelf='stretch' alignItems='center'>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            Claim your daily check rewards
          </Typography>
        </Stack>
      ) : (
        <Countdown
          date={addDays(latestDailyCheckDate, 1)}
          renderer={({ total, hours, minutes, seconds, completed }) => (
            <Stack spacing={2} alignSelf='stretch' alignItems='center'>
              <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
                {completed ? 'Claim your daily check rewards' : `${hours}:${minutes}:${seconds} left`}
              </Typography>
              <LinearProgress
                value={((86_400 - total / 1_000) / 86_400) * 1_00}
                color='success'
                variant='determinate'
                sx={{ width: '100%' }}
              />
            </Stack>
          )}
        />
      )}

      <LoadingButton
        fullWidth
        loading={isDailyCheckLoading}
        disabled={!allowedDailyCheck}
        variant='contained'
        onClick={handleDailyCheck}
      >
        <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
          <Icon icon='mdi:approve' fontSize={16} />
          Check in
        </Stack>
      </LoadingButton>
    </Stack>
  )
}

export default MePointsLevelDailyCheckTaskStack
