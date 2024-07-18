// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

// ** API Imports
import { useFindMeStatisticsQuery } from 'src/store/api/management/pointRecord'

// ** Type Imports
import type { UpgradeTaskType } from 'src/configs/point'

interface Props {
  upgradeTask: UpgradeTaskType
}

const MePointsLevelUpgradeTaskRefer = (props: Props) => {
  // ** Props
  const { upgradeTask } = props

  // ** Hooks
  const { data: meStatisticsData } = useFindMeStatisticsQuery(null)

  // ** Vars
  const goal = upgradeTask.value
  const totalDirectReferrals = meStatisticsData?.rankDownLine1.totalMembers || 0

  return (
    <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='space-between'>
      <Stack alignItems='flex-start' justifyContent='center'>
        <Typography component='p' sx={{ fontWeight: 600 }}>
          {upgradeTask.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {upgradeTask.description}
        </Typography>
      </Stack>

      <Stack spacing={2} alignSelf='stretch' alignItems='center'>
        <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
            {`${totalDirectReferrals} of ${goal} referrals`}
          </Typography>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            {totalDirectReferrals > goal ? 'Completed' : `${Math.round((totalDirectReferrals / goal) * 100)} %`}
          </Typography>
        </Stack>
        <LinearProgress
          value={Math.min(Math.round((totalDirectReferrals / goal) * 100), 100)}
          color='success'
          variant='determinate'
          sx={{ width: '100%' }}
        />
      </Stack>
    </Stack>
  )
}

export default MePointsLevelUpgradeTaskRefer
