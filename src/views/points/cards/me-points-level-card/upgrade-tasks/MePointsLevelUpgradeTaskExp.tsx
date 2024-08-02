// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

// ** API Imports
import { useFindMeOneQuery } from 'src/store/api/management/user'

// ** Util Imports
import { getFormattedPriceUnit } from 'src/utils'

// ** Type Imports
import type { UpgradeTaskType } from 'src/configs/point'

interface Props {
  expDisplayMin: number
  expDisplayMax: number
  upgradeTask: UpgradeTaskType
}

const MePointsLevelUpgradeTaskExp = (props: Props) => {
  // ** Props
  const { expDisplayMin, expDisplayMax, upgradeTask } = props

  // ** Hooks
  const { data: meUserData } = useFindMeOneQuery(null)

  // ** Vars
  const meExp = meUserData?.exp ?? 0

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
            {`${getFormattedPriceUnit(meExp)} of ${getFormattedPriceUnit(expDisplayMax)}`}
          </Typography>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            {meExp > expDisplayMax
              ? 'Completed'
              : `${Math.round(((meExp - expDisplayMin) / (expDisplayMax - expDisplayMin)) * 100)} %`}
          </Typography>
        </Stack>
        <LinearProgress
          value={Math.min(Math.round(((meExp - expDisplayMin) / (expDisplayMax - expDisplayMin)) * 100), 100)}
          color='success'
          variant='determinate'
          sx={{ width: '100%' }}
        />
      </Stack>
    </Stack>
  )
}

export default MePointsLevelUpgradeTaskExp
