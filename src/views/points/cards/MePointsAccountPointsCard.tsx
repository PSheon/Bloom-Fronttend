// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeOneQuery } from 'src/store/api/management/user'

// ** Util Imports
import { getFormattedPriceUnit } from 'src/utils'

// ** Styled component for the trophy image
const TrophyImg = styled('img')(({ theme }) => ({
  right: 12,
  bottom: 0,
  width: 72,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 98
  }
}))

const MePointsAccountPointsCard = () => {
  // ** Hooks
  const { data: meUserData, isLoading: isMeUserDataLoading } = useFindMeOneQuery(null)

  // ** Vars
  const meUsername = meUserData?.username ?? 'User'
  const mePoints = meUserData?.points ?? 0

  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader
        title={
          isMeUserDataLoading ? (
            <Skeleton width={160} height={32} />
          ) : (
            <Typography variant='h6' component='p' noWrap>
              Hi{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {meUsername}
              </Box>
              ! 🎉
            </Typography>
          )
        }
        subheader={
          <Typography variant='caption' sx={{ mr: 1.5 }}>
            Best staker 🤟🏻
          </Typography>
        }
      />
      <CardContent>
        <Stack alignItems='flex-start' justifyContent='flex-start'>
          {isMeUserDataLoading ? (
            <Skeleton width={100} height={32} />
          ) : (
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='center'
              sx={{ color: 'primary.main' }}
            >
              <Icon icon='mdi:progress-star-four-points' />
              <Typography variant='h5' component='p' color='primary.main' sx={{ fontWeight: 600 }}>
                {getFormattedPriceUnit(mePoints)}
              </Typography>
            </Stack>
          )}
          <Typography variant='body2'>Total points</Typography>
        </Stack>
        <TrophyImg alt='trophy' src='/images/cards/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default MePointsAccountPointsCard
