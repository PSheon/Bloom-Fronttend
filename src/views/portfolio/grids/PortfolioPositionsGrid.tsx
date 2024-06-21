// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { useAccount } from 'wagmi'

// ** Custom Component Imports
import WalletConnectCard from 'src/views/shared/wallet-connect-card'
import PortfolioPositionsOwnedSFTListGrid from 'src/views/portfolio/grids/PortfolioPositionsOwnedSFTListGrid'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

const PortfolioPositionsGrid = () => {
  // ** Hooks
  const walletAccount = useAccount()

  const { data: walletsData } = useFindMeQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 3
    }
  })

  // ** Vars
  const wallets = walletsData?.data || []

  const isCurrentWalletVerified =
    walletAccount.status === 'connected' &&
    wallets.find(wallet => wallet.address.toLowerCase() === walletAccount.address.toLowerCase())

  if (walletAccount.status === 'connected' && isCurrentWalletVerified) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5' component='p'>
              My Positions
            </Typography>
            <Typography variant='body2' component='p'>
              Your SFT positions in the ecosystem
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <PortfolioPositionsOwnedSFTListGrid />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ py: 12 }}>
          <Stack
            spacing={4}
            alignItems='center'
            justifyContent='center'
            sx={{ width: '100%', maxWidth: theme => theme.spacing(200) }}
          >
            <Typography variant='h4' component='p' textAlign='center' sx={{ fontWeight: 600 }}>
              Use Money in your wallet
            </Typography>
            <Typography variant='subtitle1' component='p' textAlign='center'>
              Cryptocurrency is a digital form of currency that utilizes cryptography to secure transactions, control
              the creation of new units, and verify the transfer of assets.
            </Typography>
          </Stack>
          <Stack sx={{ width: '100%', maxWidth: theme => theme.spacing(120) }}>
            <WalletConnectCard />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default PortfolioPositionsGrid
