// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

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

const MePointsLevelLoadingSkeleton = () => {
  return (
    <CardContent sx={{ pt: 15, position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
        <Image width={150} height={75} src='/images/points/profile-deco-left.svg' alt='deco left' />
      </Box>
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <Image width={150} height={70} src='/images/points/profile-deco-right.svg' alt='deco right' />
      </Box>

      <Stack spacing={2}>
        <Box sx={{ position: 'relative' }}>
          <CustomAvatar
            src='/images/points/account-level-1.svg'
            variant='rounded'
            alt='Daisy Patterson'
            sx={{ width: 120, height: 120, fontWeight: 600, zIndex: 2 }}
          />
          <StyledCircularProgress
            disableShrink
            size={116}
            variant='indeterminate'
            thickness={5}
            color='success'
            value={55}
          />
        </Box>
        <Skeleton variant='text' width={120} height={24} />
      </Stack>

      <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 4 }}>
        <Skeleton variant='text' width={160} height={32} />
        <Skeleton variant='text' width={80} height={24} />
      </Stack>
    </CardContent>
  )
}

export default MePointsLevelLoadingSkeleton
