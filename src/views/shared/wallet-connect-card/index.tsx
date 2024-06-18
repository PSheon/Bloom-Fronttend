// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'

// ** Third-Party Imports
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage, useSwitchChain, useDisconnect } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import WalletConnectSkeletonCard from 'src/views/shared/wallet-connect-card/WalletConnectSkeletonCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeQuery, useGetNonceQuery, useVerifyMutation } from 'src/store/api/management/wallet'

// ** Util Imports
import { getFormattedEthereumAddress, getChainId, getGradientColors } from 'src/utils'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  requiredChain?: FundType['chain']
}

const WalletConnectCard = (props: Props) => {
  // ** Props
  const { requiredChain } = props

  // ** States
  const [isVerifyWalletProcessLoading, setIsVerifyWalletProcessLoading] = useState<boolean>(false)
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const session = useSession()
  const walletAccount = useAccount()
  const { switchChain } = useSwitchChain()
  const { signMessageAsync } = useSignMessage()
  const { openConnectModal } = useConnectModal()
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

  if (walletAccount.status === 'connecting' || walletAccount.status === 'reconnecting') {
    return <WalletConnectSkeletonCard />
  }

  if (walletAccount.status === 'connected') {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openChainModal }) => {
          return (
            <Card sx={{ backgroundColor: 'primary.main' }}>
              <CardContent>
                <Stack spacing={4} alignItems='flex-start' justifyContent='center'>
                  <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                    <Stack direction='row' spacing={4} alignItems='center' justifyContent='center'>
                      {renderWalletAvatar(walletAccount.address)}
                      <Stack alignItems='flex-start' justifyContent='center'>
                        <Typography variant='subtitle1' component='p' color='common.white'>
                          {getFormattedEthereumAddress(walletAccount.address)}
                        </Typography>
                        <Typography variant='caption' color='common.white'>
                          {walletAccount.connector?.name}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack alignSelf='stretch' alignItems='center' justifyContent='center'>
                      <IconButton size='small' onClick={handleDisconnect}>
                        <CustomAvatar skin='filled' sx={{ width: 28, height: 28 }}>
                          <Icon icon='mdi:logout' fontSize={20} />
                        </CustomAvatar>
                      </IconButton>
                    </Stack>
                  </Stack>

                  {chain?.unsupported ? (
                    <Stack spacing={4} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                      <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack alignItems='center' justifyContent='center'>
                          <Typography variant='h5' component='p' color='common.white' sx={{ fontWeight: 600 }}>
                            {requiredChain ? `Switch to ${requiredChain}` : 'Network Unsupported'}
                          </Typography>
                          <Typography variant='body2' component='p' color='common.white'>
                            Please switch to a supported network
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack
                        direction='row'
                        spacing={4}
                        alignSelf='stretch'
                        alignItems='center'
                        justifyContent='space-around'
                        sx={{
                          px: 6,
                          py: 4,
                          borderRadius: '10px',
                          backgroundColor: theme => theme.palette.primary.dark
                        }}
                      >
                        <Stack alignItems='center' justifyContent='center'>
                          <IconButton
                            color='error'
                            onClick={() => {
                              if (requiredChain) {
                                switchChain({ chainId: getChainId(requiredChain) })
                              } else {
                                openChainModal()
                              }
                            }}
                          >
                            <CustomAvatar skin='filled' color='error'>
                              <Icon icon='mdi:exchange' fontSize={20} />
                            </CustomAvatar>
                          </IconButton>
                          <Typography variant='subtitle2' color='common.white'>
                            click to switch
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack spacing={4} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                      <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack alignItems='center' justifyContent='center'>
                          <Typography variant='h5' component='p' color='common.white' sx={{ fontWeight: 600 }}>
                            {`${account?.displayBalance ? `~ ${account.displayBalance}` : '-'}`}
                          </Typography>
                          <Typography variant='body2' component='p' color='common.white'>
                            wallet balance
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack
                        direction='row'
                        spacing={4}
                        alignSelf='stretch'
                        alignItems='center'
                        justifyContent='space-around'
                        sx={{
                          px: 6,
                          py: 4,
                          borderRadius: '10px',
                          backgroundColor: theme => theme.palette.primary.dark
                        }}
                      >
                        {walletAccount.chain?.blockExplorers?.default.url && (
                          <Stack alignItems='center' justifyContent='center'>
                            <IconButton
                              component={Link}
                              target='_blank'
                              href={`${walletAccount?.chain?.blockExplorers?.default.url}/address/${walletAccount.address}`}
                            >
                              <CustomAvatar skin='filled'>
                                <Icon icon='mdi:clipboard-text-history-outline' fontSize={20} />
                              </CustomAvatar>
                            </IconButton>
                            <Typography variant='subtitle2' color='common.white'>
                              Explore
                            </Typography>
                          </Stack>
                        )}
                        {isCurrentWalletVerified ? (
                          <Stack alignItems='center' justifyContent='center'>
                            <IconButton onClick={() => handleCopyAddress(account!.address)}>
                              <CustomAvatar skin='filled'>
                                <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={20} />
                              </CustomAvatar>
                            </IconButton>
                            <Typography variant='subtitle2' color='common.white'>
                              {isAddressCopied ? 'Copied' : 'Copy'}
                            </Typography>
                          </Stack>
                        ) : (
                          <Stack alignItems='center' justifyContent='center'>
                            <Box sx={{ position: 'relative' }}>
                              <IconButton color='success' disabled={!nonce} onClick={handleVerifyWallet}>
                                <CustomAvatar skin='filled' color='success'>
                                  <Icon icon='mdi:clipboard-check-outline' fontSize={20} />
                                </CustomAvatar>
                              </IconButton>
                              {(isVerifyWalletLoading || isVerifyWalletProcessLoading) && (
                                <CircularProgress
                                  size={56}
                                  sx={{
                                    color: theme => theme.palette.primary.main,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-28px',
                                    marginLeft: '-28px'
                                  }}
                                />
                              )}
                            </Box>
                            <Typography variant='subtitle2' color='common.white'>
                              {isVerifyWalletLoading || isVerifyWalletProcessLoading ? 'Verifying' : 'Verify'}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>
          )
        }}
      </ConnectButton.Custom>
    )
  }

  return (
    <Card sx={{ backgroundColor: 'primary.main' }}>
      <CardContent>
        <Stack spacing={4} alignItems='flex-start' justifyContent='center'>
          <Stack alignItems='flex-start' justifyContent='center'>
            <Typography variant='h5' component='p' color='common.white'>
              Greeting{' '}
              <Box component='span' sx={{ fontWeight: 600 }}>
                {session.data?.user.username}
              </Box>
              ! 🎉
            </Typography>
            <Typography variant='caption' color='common.white'>
              Connect your wallet and start earning
            </Typography>
          </Stack>

          <Typography variant='subtitle1' color='common.white'>
            {`We won't ask for your private key`}
          </Typography>

          <Stack
            direction='row'
            spacing={4}
            alignSelf='stretch'
            alignItems='center'
            justifyContent='center'
            sx={{
              p: 6,
              borderRadius: '10px',
              backgroundColor: theme => theme.palette.primary.dark
            }}
          >
            <Stack alignItems='center' justifyContent='center'>
              <IconButton size='large' onClick={openConnectModal}>
                <CustomAvatar skin='filled'>
                  <Icon icon='mdi:plus-circle-outline' />
                </CustomAvatar>
              </IconButton>
              <Typography variant='subtitle1' color='common.white'>
                connect
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default WalletConnectCard
