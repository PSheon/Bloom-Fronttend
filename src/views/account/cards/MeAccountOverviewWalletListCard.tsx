// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

// ** Util Imports
import { getFormattedEthereumAddress, getGradientColors } from 'src/utils'

const MeAccountOverviewWalletListCard = () => {
  // ** Hooks
  const walletAccount = useAccount()

  const { data: walletsData, isLoading: isWalletListLoading } = useFindMeQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 5
    }
  })

  // ** Vars
  const wallets = walletsData?.data || []

  // ** Renders
  const renderWalletAvatar = (address: string) => {
    const colors = getGradientColors(address)

    return (
      <CustomAvatar
        skin='light'
        sx={{
          width: 36,
          height: 36,
          boxShadow: `${colors[0]} 0px 3px 5px`
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            backgroundColor: colors[0],
            backgroundImage: `
              radial-gradient(at 66% 77%, ${colors[1]} 0px, transparent 50%),
              radial-gradient(at 29% 97%, ${colors[2]} 0px, transparent 50%),
              radial-gradient(at 99% 86%, ${colors[3]} 0px, transparent 50%),
              radial-gradient(at 29% 88%, ${colors[4]} 0px, transparent 50%)
            `
          }}
        />
      </CustomAvatar>
    )
  }

  return (
    <Card>
      <CardHeader title='Wallets' />
      <CardContent>
        <Stack spacing={4} alignItems='center' justifyContent='center'>
          <Stack direction='row' alignSelf='stretch' justifyContent='space-between'>
            <Typography
              sx={{
                lineHeight: 2,
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.17px'
              }}
            >
              Address
            </Typography>
            <Typography
              sx={{
                lineHeight: 2,
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.17px'
              }}
            >
              Status
            </Typography>
          </Stack>
          <Stack spacing={4} alignSelf='stretch' alignItems='center' justifyContent='center'>
            {isWalletListLoading ? (
              [...Array(3).keys()].map(index => (
                <Stack
                  key={`wallet-list-skeleton-${index}`}
                  direction='row'
                  spacing={4}
                  alignSelf='stretch'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Stack direction='row' spacing={4} flexGrow='1' alignItems='center'>
                    <Skeleton variant='circular' width={40} height={40} />
                    <Stack spacing='0.5'>
                      <Skeleton variant='text' width={120} />
                      <Skeleton variant='text' width={50} />
                    </Stack>
                  </Stack>
                  <Stack>
                    <Skeleton variant='text' width={40} />
                  </Stack>
                </Stack>
              ))
            ) : wallets.length === 0 ? (
              <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
                  <Icon icon='mdi:help-circle-outline' fontSize='2rem' />
                </CustomAvatar>
                <Typography variant='subtitle1' component='p'>
                  No verified wallets found
                </Typography>
              </CardContent>
            ) : (
              wallets.map((wallet, index: number) => {
                return (
                  <Stack
                    key={`wallet-list-${index}`}
                    direction='row'
                    spacing={4}
                    alignSelf='stretch'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Stack direction='row' spacing={4} flexGrow='1' alignItems='center'>
                      {renderWalletAvatar(wallet.address)}
                      <Stack spacing='0.5'>
                        <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: theme =>
                                theme.palette[
                                  wallet.address.toLowerCase() === walletAccount?.address?.toLowerCase()
                                    ? 'success'
                                    : 'warning'
                                ].main
                            }}
                          />
                          <Typography sx={{ fontWeight: 500 }}>
                            {getFormattedEthereumAddress(wallet.address)}
                          </Typography>
                        </Stack>
                        <Typography variant='caption'>{wallet.connector}</Typography>
                      </Stack>
                    </Stack>
                    <Stack alignItems='center'>
                      <CustomChip
                        skin='light'
                        size='small'
                        color='primary'
                        label='verified'
                        rounded
                        sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                      />
                    </Stack>
                  </Stack>
                )
              })
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MeAccountOverviewWalletListCard
