// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { useAccount } from 'wagmi'

// ** Custom Component Imports
import WalletConnectCard from 'src/views/shared/wallet-connect-card'
import PublicFundLiveOwnedSFTListGrid from 'src/views/fund/live/grids/PublicFundLiveOwnedSFTListGrid'
import PublicFundLiveStakedSFTListGrid from 'src/views/fund/live/grids/PublicFundLiveStakedSFTListGrid'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

// ** Util Imports
import { getChainId } from 'src/utils'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveVaultSFTWalletCheckGrid = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const { data: walletsData } = useFindMeQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 5
    }
  })

  // ** Vars
  const wallets = walletsData?.data || []
  const requiredChainId = getChainId(initFundEntity.chain)
  const isCurrentChainSupported = requiredChainId === walletAccount.chainId

  const isCurrentWalletVerified =
    walletAccount.status === 'connected' &&
    wallets.find(wallet => wallet.address.toLowerCase() === walletAccount.address.toLowerCase())

  if (walletAccount.status === 'connected' && isCurrentChainSupported && isCurrentWalletVerified) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>My SFT</Typography>
            <Typography variant='body2'>
              List of SFTs that you have staked in the fund. You can redeem the SFTs at any time
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveOwnedSFTListGrid initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>Staked SFT</Typography>
            <Typography variant='body2'>
              List of SFTs that staked in the fund. You can redeem the SFTs at any time.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveStakedSFTListGrid initFundEntity={initFundEntity} />
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
            <WalletConnectCard requiredChain={initFundEntity.chain} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default PublicFundLiveVaultSFTWalletCheckGrid
