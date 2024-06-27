// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import MePointsLevelLoadingSkeleton from 'src/views/points/cards/me-points-level-card/MePointsLevelLoadingSkeleton'
import MePointsLevelVerifyWalletTaskStack from 'src/views/points/cards/me-points-level-card/MePointsLevelVerifyWalletTaskStack'
import MePointsLevelDailyCheckTaskStack from 'src/views/points/cards/me-points-level-card/MePointsLevelDailyCheckTaskStack'

// ** API Imports
import { useFindMeOneQuery } from 'src/store/api/management/user'

// ** Util Imports
import { getFormattedPriceUnit, getLevelProperties } from 'src/utils'

// ** Type Imports
import type { CircularProgressProps } from '@mui/material/CircularProgress'

// ** Styled Components
const StyledCircularProgress = styled(CircularProgress)<CircularProgressProps>(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  strokeLinecap: 'round',
  '& svg': {
    transform: 'rotate(180deg)'
  }
}))

const MePointsLevelCard = () => {
  // ** Hooks
  const { data: meUserData, isLoading: isMeUserDataLoading } = useFindMeOneQuery(null)

  // ** Vars
  const meExp = meUserData?.exp ?? 0
  const meLevelProperties = getLevelProperties(meExp)

  return (
    <Card>
      {isMeUserDataLoading ? (
        <MePointsLevelLoadingSkeleton />
      ) : (
        <CardContent
          sx={{ pt: 15, position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
        >
          <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
            <Image width={150} height={75} src='/images/points/profile-deco-left.svg' alt='deco left' />
          </Box>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Image width={150} height={70} src='/images/points/profile-deco-right.svg' alt='deco right' />
          </Box>

          <Stack spacing={2}>
            <Box sx={{ position: 'relative' }}>
              <CustomAvatar
                src={`/images/points/account-level-${meLevelProperties.level}.svg`}
                variant='rounded'
                alt={`level-${meLevelProperties.level}`}
                sx={{ width: 120, height: 120, fontWeight: 600, zIndex: 2 }}
              />
              <StyledCircularProgress
                disableShrink
                size={116}
                variant='determinate'
                thickness={5}
                color='success'
                value={Math.round((meExp / meLevelProperties.expCap) * 100)}
              />
            </Box>
            <CustomChip
              skin='light'
              size='small'
              label={`Exp ${getFormattedPriceUnit(meExp)} / ${getFormattedPriceUnit(meLevelProperties.expCap)}`}
              color='success'
              sx={{
                height: 20,
                fontWeight: 600,
                borderRadius: '5px',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { mt: -0.25 }
              }}
            />
          </Stack>

          <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 4 }}>
            <Typography variant='h6' component='p'>
              {meLevelProperties.title}
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              label={`Level ${meLevelProperties.level}`}
              color='primary'
              sx={{
                height: 20,
                fontWeight: 600,
                borderRadius: '5px',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { mt: -0.25 }
              }}
            />
          </Stack>
        </CardContent>
      )}

      <CardContent>
        <Stack direction='row' spacing={2} alignSelf='stretch' alignItems='center' justifyContent='space-between'>
          <Typography variant='subtitle2'>Privileges</Typography>
          <IconButton size='small'>
            <Icon icon='mdi:question-mark-circle-outline' fontSize={14} />
          </IconButton>
        </Stack>
        <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
        <Stack spacing={4} alignItems='center' justifyContent='center'>
          {meLevelProperties.privileges.map((privilege, index) => (
            <Stack
              key={`privilege-${index}`}
              direction='row'
              spacing={2}
              alignSelf='stretch'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='subtitle2' color='text.primary' sx={{ fontWeight: 600 }}>
                {privilege.title}
              </Typography>
              <Typography variant='subtitle2' color='text.primary' sx={{ fontWeight: 600 }}>
                {privilege.displayValue}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
        <Stack direction='row' spacing={2} alignSelf='stretch' alignItems='center' justifyContent='flex-start'>
          <Typography variant='subtitle2'>Tasks</Typography>
        </Stack>
        <Stack
          spacing={4}
          alignItems='center'
          justifyContent='center'
          divider={<Icon icon='mdi:plus-circle-outline' />}
          sx={{ mt: 4 }}
        >
          {/* Task: Verify Wallet */}
          <MePointsLevelVerifyWalletTaskStack />

          {/* Task: Daily Check */}
          <MePointsLevelDailyCheckTaskStack />
        </Stack>

        <Stack alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 2 }}>
          <Typography variant='caption'>updates may take up to 5 minutes</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MePointsLevelCard
