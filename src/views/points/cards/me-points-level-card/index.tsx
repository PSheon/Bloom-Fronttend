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

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import MePointsLevelLoadingSkeleton from 'src/views/points/cards/me-points-level-card/MePointsLevelLoadingSkeleton'
import MePointsLevelShowRoomIconButton from 'src/views/points/cards/me-points-level-card/MePointsLevelShowRoomIconButton'
import MePointsLevelPrivilegesStack from 'src/views/points/cards/me-points-level-card/privileges'
import MePointsLevelUpgradeTasksStack from 'src/views/points/cards/me-points-level-card/upgrade-tasks'

// ** API Imports
import { useFindMeOneQuery } from 'src/store/api/management/user'
import { useFindMeQuery } from 'src/store/api/management/referral'

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

  const { data: meReferralsEntity, isLoading: isFindMeReferralsLoading } = useFindMeQuery({
    filters: {
      isActive: true
    },
    pagination: {
      page: 1,
      pageSize: 10
    }
  })

  // ** Vars
  const meExp = meUserData?.exp ?? 0
  const meReferrals = meReferralsEntity?.data || []
  const meLevel = meReferrals[0]?.level || 1
  const meLevelProperties = getLevelProperties(meLevel)

  return (
    <Card>
      {isMeUserDataLoading || isFindMeReferralsLoading ? (
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
                value={Math.min(
                  Math.round(
                    ((meExp - meLevelProperties.expDisplayMin) /
                      (meLevelProperties.expDisplayMax - meLevelProperties.expDisplayMin)) *
                      100
                  ),
                  100
                )}
              />
            </Box>
            <CustomChip
              skin='light'
              size='small'
              label={`Exp ${getFormattedPriceUnit(meExp)} / ${getFormattedPriceUnit(meLevelProperties.expDisplayMax)}`}
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
          <Typography variant='subtitle2' component='p'>
            Privileges
          </Typography>
          <MePointsLevelShowRoomIconButton />
        </Stack>
        <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
        <MePointsLevelPrivilegesStack privileges={meLevelProperties.privileges} />
        <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
        <Stack direction='row' spacing={2} alignSelf='stretch' alignItems='center' justifyContent='flex-start'>
          <Typography variant='subtitle2' component='p'>
            Upgrade Tasks
          </Typography>
        </Stack>
        <MePointsLevelUpgradeTasksStack levelProperties={meLevelProperties} />
        <Stack alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 2 }}>
          <Typography variant='caption'>updates may take up to 5 minutes</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MePointsLevelCard
