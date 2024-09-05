// ** MUI Imports
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PublicFundDefiVaultMyReferralInformationStack = () => {
  return (
    <Stack spacing={6}>
      <Stack spacing={4}>
        <Stack>
          <Typography variant='subtitle1' component='p'>
            My Referral Information
          </Typography>
          <Typography variant='subtitle2' component='p'>
            Your all-time referral record
          </Typography>
        </Stack>

        <Stack spacing={4}>
          <Stack
            direction='row'
            alignSelf='stretch'
            alignItems='center'
            justifyContent='center'
            divider={
              <Divider flexItem sx={{ m: 0 }} orientation='vertical'>
                <CustomAvatar
                  skin='light'
                  color='secondary'
                  sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
                >
                  <Icon icon='mdi:plus-box-outline' />
                </CustomAvatar>
              </Divider>
            }
          >
            <Stack spacing={4} flex={1} alignItems='center' sx={{ py: 6 }}>
              <CustomAvatar skin='light' sx={{ mb: 3 }} color='success' variant='rounded'>
                <Icon icon='mdi:users-group-outline' />
              </CustomAvatar>
              <Stack alignItems='center'>
                <Typography sx={{ fontWeight: 600 }}>x 49</Typography>
                <Typography variant='body2'>Total referee</Typography>
              </Stack>
            </Stack>

            <Stack spacing={4} flex={1} alignItems='center' sx={{ py: 6 }}>
              <CustomAvatar skin='light' sx={{ mb: 3 }} color='success' variant='rounded'>
                <Icon icon='mdi:database-arrow-down-outline' />
              </CustomAvatar>
              <Stack alignItems='center'>
                <Typography sx={{ fontWeight: 600 }}>$ 40,000</Typography>
                <Typography variant='body2'>Total referee's deposit</Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          <Stack alignItems='center'>
            <Typography sx={{ fontWeight: 600 }}>Not linked</Typography>
            <Typography variant='body2'>My referrer</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={4}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Refer & Earn
        </Typography>

        <Stack
          spacing={2}
          alignItems='flex-start'
          justifyContent='center'
          divider={
            <Divider flexItem>
              <CustomAvatar
                skin='light'
                color='secondary'
                sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
              >
                <Icon icon='mdi:keyboard-arrow-down' />
              </CustomAvatar>
            </Divider>
          }
        >
          <Stack direction='row' spacing={4} alignItems='flex-start' justifyContent='center'>
            <CustomAvatar skin='light' color='success' variant='rounded'>
              <Icon icon='mdi:number-1-box-outline' />
            </CustomAvatar>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Send Invitation 👍🏻</Typography>
              <Typography variant='body2'>Send your referral link to your friend</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={4} alignItems='flex-start' justifyContent='center'>
            <CustomAvatar skin='light' color='success' variant='rounded'>
              <Icon icon='mdi:number-2-box-outline' />
            </CustomAvatar>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Registration 😎</Typography>
              <Typography variant='body2'>Let them register to our services</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={4} alignItems='flex-start' justifyContent='center'>
            <CustomAvatar skin='light' color='success' variant='rounded'>
              <Icon icon='mdi:number-3-box-outline' />
            </CustomAvatar>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Gain 25% of Referee Interest 😇</Typography>
              <Typography variant='body2'>You can share 25% of the interest reward</Typography>
              <Typography variant='body2'>once your referee claims it.</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PublicFundDefiVaultMyReferralInformationStack
