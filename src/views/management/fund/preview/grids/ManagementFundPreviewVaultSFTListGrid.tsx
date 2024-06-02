// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { useAccount } from 'wagmi'

// ** Custom Component Imports
import WalletConnectCard from 'src/views/shared/wallet-connect-card'
import ManagementFundPreviewOwnedSFTListGrid from 'src/views/management/fund/preview/grids/ManagementFundPreviewOwnedSFTListGrid'
import ManagementFundPreviewStakedSFTListGrid from 'src/views/management/fund/preview/grids/ManagementFundPreviewStakedSFTListGrid'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

// ** Util Imports
import { getChainId } from 'src/utils'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundPreviewVaultSFTListGrid = (props: Props) => {
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
          <ManagementFundPreviewOwnedSFTListGrid initFundEntity={initFundEntity} />
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
          <ManagementFundPreviewStakedSFTListGrid initFundEntity={initFundEntity} />
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
            {/* <ConnectButton.Custom>
              {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                const ready = mounted && authenticationStatus !== 'loading'

                const connected =
                  ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

                if (!connected) {
                  return (
                    <Button fullWidth variant='contained' onClick={openConnectModal} sx={{ flex: 1 }}>
                      <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                        <Icon icon='mdi:login-variant' fontSize={16} />
                        Connect Wallet
                      </Stack>
                    </Button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <Button fullWidth color='error' variant='contained' onClick={openChainModal} sx={{ flex: 1 }}>
                      <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                        <Icon icon='mdi:error-outline' fontSize={16} />
                        Network unsupported
                      </Stack>
                    </Button>
                  )
                }

                return (
                  <Box
                    sx={{
                      px: 4,
                      py: 6,
                      width: '100%',
                      borderRadius: 1,
                      border: theme => `1px solid ${theme.palette.primary.main}`,
                      ...bgColors.primaryLight
                    }}
                  >
                    <Stack direction='column' spacing={4} alignItems='center' justifyContent='space-between'>
                      {renderWalletAvatar(account.address)}
                      <Stack alignItems='center'>
                        <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                          {getFormattedEthereumAddress(account.address)}
                        </Typography>
                        <Typography variant='subtitle2' component='p'>
                          {`${account.displayBalance ? `~ ${account.displayBalance}` : ''}`}
                        </Typography>
                      </Stack>
                      {isCurrentWalletVerified ? (
                        <Stack
                          direction='row'
                          spacing={4}
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <Button variant='contained' onClick={handleDisconnect} sx={{ flex: 1 }}>
                            <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                              <Icon icon='mdi:logout' fontSize={16} />
                              Disconnect
                            </Stack>
                          </Button>
                          <Button
                            variant='contained'
                            onClick={() => handleCopyAddress(account.address)}
                            sx={{ flex: 1 }}
                          >
                            <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                              <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={16} />
                              {isAddressCopied ? 'Copied' : 'Copy'}
                            </Stack>
                          </Button>
                        </Stack>
                      ) : (
                        <Stack
                          direction='row'
                          spacing={4}
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <Button variant='outlined' onClick={handleDisconnect} sx={{ flex: 1 }}>
                            <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                              <Icon icon='mdi:logout' fontSize={16} />
                              Disconnect
                            </Stack>
                          </Button>
                          <LoadingButton
                            variant='contained'
                            loading={isVerifyWalletLoading || isVerifyWalletProcessLoading}
                            disabled={!nonce}
                            onClick={handleVerifyWallet}
                            sx={{ flex: 1 }}
                          >
                            <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                              <Icon icon='mdi:clipboard-check-outline' fontSize={16} />
                              Verify
                            </Stack>
                          </LoadingButton>
                        </Stack>
                      )}
                    </Stack>
                  </Box>
                )
              }}
            </ConnectButton.Custom> */}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ManagementFundPreviewVaultSFTListGrid
