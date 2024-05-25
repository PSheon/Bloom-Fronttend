// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import toast from 'react-hot-toast'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import PublicFundLiveVaultAverageAPYCard from 'src/views/fund/live/cards/PublicFundLiveVaultAverageAPYCard'
import PublicFundLiveVaultTVLCard from 'src/views/fund/live/cards/PublicFundLiveVaultTVLCard'
import PublicFundLiveVaultTotalStakedCard from 'src/views/fund/live/cards/PublicFundLiveVaultTotalStakedCard'
import PublicFundLiveOwnedSFTListGrid from 'src/views/fund/live/grids/PublicFundLiveOwnedSFTListGrid'
import PublicFundLiveStakedSFTListGrid from 'src/views/fund/live/grids/PublicFundLiveStakedSFTListGrid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** API Imports
import { useFindMeQuery, useGetNonceQuery, useVerifyMutation } from 'src/store/api/management/wallet'

// ** Util Imports
import { getFormattedEthereumAddress, getGradientColors } from 'src/utils'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveVaultTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [isVerifyWalletProcessLoading, setIsVerifyWalletProcessLoading] = useState<boolean>(false)
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const bgColors = useBgColor()
  const walletAccount = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnectAsync } = useDisconnect()

  const { data: walletsData } = useFindMeQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 5
    }
  })

  const { data: nonceData } = useGetNonceQuery(null)
  const [verifyWallet, { isLoading: isVerifyWalletLoading }] = useVerifyMutation()

  // ** Vars
  const wallets = walletsData?.data || []

  const isCurrentWalletVerified =
    walletAccount.status === 'connected' &&
    wallets.find(wallet => wallet.address.toLowerCase() === walletAccount.address.toLowerCase())

  const nonce = nonceData?.nonce

  // ** Logics
  const handleDisconnect = async () => {
    try {
      await disconnectAsync()
    } catch {
      toast.error('Failed to disconnect wallet')
    }
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsAddressCopied(() => true)
    setTimeout(() => {
      setIsAddressCopied(() => false)
    }, 2 * 1000)
  }

  const handleVerifyWallet = async () => {
    try {
      setIsVerifyWalletProcessLoading(() => true)

      const message = new SiweMessage({
        domain: window?.location.host,
        address: walletAccount.address!,
        statement: `Welcome to Bloom, Please sign in with Ethereum`,
        uri: window?.location.origin,
        version: '1',
        chainId: walletAccount.chainId!,
        nonce: nonce!
      }).prepareMessage()

      const signature = await signMessageAsync({ message })

      await verifyWallet({
        data: {
          message,
          signature,
          address: walletAccount.address!,
          connector: walletAccount?.connector?.name || 'Unknown'
        }
      }).unwrap()

      setIsVerifyWalletProcessLoading(() => false)
      toast.success('Wallet verified')
    } catch {
      setIsVerifyWalletProcessLoading(() => false)
      toast.error('Failed to verify wallet')
    }
  }

  // ** Renders
  const renderWalletAvatar = (address: string) => {
    const colors = getGradientColors(address)

    return (
      <CustomAvatar
        skin='light'
        sx={{
          width: 74,
          height: 74,
          boxShadow: `${colors[0]} 0px 3px 5px`
        }}
      >
        <Box
          sx={{
            width: 74,
            height: 74,
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

  const renderSFTList = () => {
    if (walletAccount.status === 'connected' && isCurrentWalletVerified) {
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
    } else {
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
            <Stack spacing={4} alignItems='center' justifyContent='center'>
              <Typography variant='h6' component='p'>
                Connect and Verify your wallet to check SFT
              </Typography>
              <Box sx={{ width: '100%', maxWidth: theme => theme.spacing(120) }}>
                <ConnectButton.Custom>
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
                </ConnectButton.Custom>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={6}>
          <PublicFundLiveVaultAverageAPYCard />
        </Grid>
        <Grid item xs={6} md={3}>
          <PublicFundLiveVaultTVLCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={6} md={3}>
          <PublicFundLiveVaultTotalStakedCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          {renderSFTList()}
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default PublicFundLiveVaultTabPanel
