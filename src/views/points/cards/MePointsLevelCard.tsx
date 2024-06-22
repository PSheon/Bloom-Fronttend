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
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Imports
import { getFormattedPriceUnit } from 'src/utils'

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
  const session = useSession()

  // ** Vars
  const user = session.data?.user
  const myPoints = BigInt(user?.points ?? '0')

  return (
    <Card>
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
              src={`/images/points/account-level-${1}.svg`}
              variant='rounded'
              alt='Daisy Patterson'
              sx={{ width: 120, height: 120, fontWeight: 600, zIndex: 2 }}
            />
            <StyledCircularProgress
              disableShrink
              size={116}
              variant='determinate'
              thickness={5}
              color='success'
              value={55}
            />
          </Box>
          <CustomChip
            skin='light'
            size='small'
            label={`${getFormattedPriceUnit(myPoints)} / 5,000`}
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
            Digital Stars
          </Typography>
          <CustomChip
            skin='light'
            size='small'
            label='Level 1'
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

      <CardContent>
        <Stack direction='row' spacing={2} alignSelf='stretch' alignItems='center' justifyContent='space-between'>
          <Typography variant='subtitle2'>Privileges</Typography>
          <IconButton size='small'>
            <Icon icon='mdi:question-mark-circle-outline' fontSize={14} />
          </IconButton>
        </Stack>
        <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
        <Stack spacing={4} alignItems='center' justifyContent='center' sx={{ pt: 2, pb: 1 }}>
          <Stack direction='row' spacing={2} alignSelf='stretch' alignItems='center' justifyContent='flex-start'>
            <Typography variant='body2'>APY Boost</Typography>
            <Typography variant='subtitle2' color='text.primary'>{`+ ${0}%`}</Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <Stack spacing={4} alignItems='center' justifyContent='center' sx={{ pt: 2, pb: 1 }}>
          <LoadingButton fullWidth loading={false} variant='contained'>
            <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
              <Icon icon='mdi:approve' fontSize={16} />
              {`Check in`}
            </Stack>
          </LoadingButton>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MePointsLevelCard
