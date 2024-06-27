// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

const MePointsLevelVerifyWalletTaskStack = () => {
  // ** Hooks
  const { data: walletsData } = useFindMeQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 3
    }
  })

  // ** Vars
  const wallets = walletsData?.data || []

  return (
    <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
      <Stack direction='row' spacing={4} alignSelf='stretch' alignItems='center' justifyContent='flex-start'>
        <CustomAvatar skin='light' variant='rounded' sx={{ width: 50, height: 50 }}>
          <Icon icon='mdi:credit-card' fontSize='2rem' />
        </CustomAvatar>
        <Stack alignItems='flex-start' justifyContent='center'>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            Connect and verify your wallet
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            You can verify up to 3 wallets
          </Typography>
        </Stack>
        <Stack flex='1' alignItems='flex-end' justifyContent='center'>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            +300
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            exp
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2} alignSelf='stretch' alignItems='center'>
        <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            {`${wallets.length} of ${3} wallets`}
          </Typography>
          <Typography variant='body2' color='text.primary' sx={{ fontWeight: 600 }}>
            {`${Math.round((wallets.length / 3) * 100)} %`}
          </Typography>
        </Stack>
        <LinearProgress
          value={Math.round((wallets.length / 3) * 100)}
          color='success'
          variant='determinate'
          sx={{ width: '100%' }}
        />
      </Stack>
    </Stack>
  )
}

export default MePointsLevelVerifyWalletTaskStack
