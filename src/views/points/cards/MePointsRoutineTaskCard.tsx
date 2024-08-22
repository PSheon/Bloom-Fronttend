// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import toast from 'react-hot-toast'
import isAfter from 'date-fns/isAfter'
import addDays from 'date-fns/addDays'
import Countdown from 'react-countdown'
import confetti from 'canvas-confetti'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import {
  useDailyCheckMutation as useDailyCheckMutation,
  useFindMeQuery as useFindMeDailyCheckRecordQuery
} from 'src/store/api/management/dailyCheckRecord'

// ** Styled components
const IllustrationImg = styled('img')(({ theme }) => ({
  right: theme.spacing(4),
  bottom: 0,
  width: theme.spacing(48),
  position: 'absolute',
  [theme.breakpoints.down('md')]: {
    opacity: 0
  }
}))

const MePointsRoutineTaskCard = () => {
  // ** Hooks
  const theme = useTheme()

  const { data: meDailyCheckRecordsData } = useFindMeDailyCheckRecordQuery({
    filters: {},
    sort: ['createdAt:desc'],
    pagination: {
      page: 1,
      pageSize: 1
    }
  })

  const [dailyCheck, { isLoading: isDailyCheckLoading }] = useDailyCheckMutation()

  // ** Vars
  const dailyCheckRecords = meDailyCheckRecordsData?.data || []
  const latestDailyCheckDate = dailyCheckRecords[0]?.createdAt ? new Date(dailyCheckRecords[0].createdAt) : new Date(0)
  const allowedDailyCheck = isAfter(new Date(), addDays(latestDailyCheckDate, 1))

  // ** Logics
  const handleDailyCheck = async () => {
    try {
      await dailyCheck(null).unwrap()
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.8 },
        zIndex: 9999
      })
    } catch (error) {
      toast.error('Failed to check in')
    }
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader
        title={
          <Typography variant='h5' component='p' noWrap>
            Claim your daily rewards 🎉
          </Typography>
        }
        subheader={
          <Typography variant='caption' sx={{ mr: 1.5 }}>
            {`We'll check your level when you claim`}
          </Typography>
        }
      />
      <CardContent>
        <Stack spacing={6} alignItems='flex-start' justifyContent='flex-start'>
          <Stack
            alignSelf='stretch'
            alignItems='center'
            justifyContent='center'
            sx={{
              maxWidth: {
                xs: '100%',
                md: theme.spacing(60)
              }
            }}
          >
            {allowedDailyCheck ? (
              <LoadingButton
                fullWidth
                loading={isDailyCheckLoading}
                disabled={!allowedDailyCheck}
                variant='contained'
                onClick={handleDailyCheck}
              >
                <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                  <Icon icon='mdi:approve' fontSize={16} />
                  Claim 60 Exp
                </Stack>
              </LoadingButton>
            ) : (
              <Countdown
                date={addDays(latestDailyCheckDate, 1)}
                renderer={({ total, hours, minutes, seconds, completed }) => {
                  if (completed) {
                    return (
                      <LoadingButton
                        fullWidth
                        loading={isDailyCheckLoading}
                        variant='contained'
                        onClick={handleDailyCheck}
                      >
                        <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                          <Icon icon='mdi:approve' fontSize={16} />
                          Claim 60 Exp
                        </Stack>
                      </LoadingButton>
                    )
                  }

                  return (
                    <Stack spacing={4} alignSelf='stretch' alignItems='center'>
                      <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
                        {`${hours}:${minutes}:${seconds} left`}
                      </Typography>
                      <LinearProgress
                        value={((86_400 - total / 1_000) / 86_400) * 1_00}
                        color='success'
                        variant='determinate'
                        sx={{ width: '100%' }}
                      />
                    </Stack>
                  )
                }}
              />
            )}
          </Stack>
        </Stack>

        <IllustrationImg alt='illustration' src={`/images/points/illustration-daily-claim-${theme.palette.mode}.png`} />
      </CardContent>
    </Card>
  )
}

export default MePointsRoutineTaskCard
