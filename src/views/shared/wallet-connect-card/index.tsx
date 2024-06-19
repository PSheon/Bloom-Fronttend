// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage, useSwitchChain, useDisconnect } from 'wagmi'
import confetti from 'canvas-confetti'
import QRCode from 'react-qr-code'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

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

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

interface Props {
  requiredChain?: FundType['chain']
}

const WalletConnectCard = (props: Props) => {
  // ** Props
  const { requiredChain } = props

  // ** States
  const [isVerifyWalletProcessLoading, setIsVerifyWalletProcessLoading] = useState<boolean>(false)
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)
  const [isVerifiedWalletsDialogOpen, setIsVerifiedWalletsDialogOpen] = useState<boolean>(false)
  const [isReceiveDialogOpen, setIsReceiveDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const session = useSession()
  const walletAccount = useAccount()
  const { switchChain } = useSwitchChain()
  const { signMessageAsync } = useSignMessage()
  const { openConnectModal } = useConnectModal()
  const { disconnectAsync } = useDisconnect()

  const { data: walletsData, isLoading: isWalletListLoading } = useFindMeQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 3
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
  const handleOpenVerifiedWalletsDialog = () => setIsVerifiedWalletsDialogOpen(() => true)
  const handleCloseVerifiedWalletsDialog = () => setIsVerifiedWalletsDialogOpen(() => false)
  const handleOpenReceiveDialog = () => setIsReceiveDialogOpen(() => true)
  const handleCloseReceiveDialog = () => setIsReceiveDialogOpen(() => false)

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
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        zIndex: 9999
      })
    } catch {
      setIsVerifyWalletProcessLoading(() => false)
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
                        <Stack direction='row' alignItems='center' justifyContent='center'>
                          <Typography variant='subtitle1' component='p' color='common.white'>
                            {getFormattedEthereumAddress(walletAccount.address)}
                          </Typography>
                          <IconButton size='small' onClick={() => handleCopyAddress(walletAccount.address as string)}>
                            <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={16} />
                          </IconButton>
                        </Stack>
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

                  {chain?.unsupported || (requiredChain && chain?.id !== getChainId(requiredChain)) ? (
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
                        <Stack alignItems='center' justifyContent='center'>
                          <Box sx={{ position: 'relative' }}>
                            <IconButton onClick={handleOpenVerifiedWalletsDialog}>
                              <CustomAvatar skin='filled' color={isCurrentWalletVerified ? 'primary' : 'warning'}>
                                <Icon icon='mdi:link-variant' fontSize={20} />
                              </CustomAvatar>
                            </IconButton>
                          </Box>
                          <Typography variant='subtitle2' color='common.white'>
                            Verified Wallets
                          </Typography>
                        </Stack>
                        <Stack alignItems='center' justifyContent='center'>
                          <IconButton onClick={handleOpenReceiveDialog}>
                            <CustomAvatar skin='filled'>
                              <Icon icon='mdi:arrow-expand-down' fontSize={20} />
                            </CustomAvatar>
                          </IconButton>
                          <Typography variant='subtitle2' color='common.white'>
                            Receive
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </CardContent>

              {/* Verified Wallets */}
              <Dialog
                open={isVerifiedWalletsDialogOpen}
                onClose={handleCloseVerifiedWalletsDialog}
                aria-labelledby='verified-wallets'
                aria-describedby='verified-wallets-description'
                sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
              >
                <IconButton
                  size='small'
                  onClick={handleCloseVerifiedWalletsDialog}
                  sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                >
                  <Icon icon='mdi:close' />
                </IconButton>

                <DialogTitle
                  sx={{
                    textAlign: 'center',
                    fontSize: '1.5rem !important',
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
                  }}
                >
                  Wallets
                  <DialogContentText
                    id='verified-wallets-description'
                    variant='body2'
                    component='p'
                    sx={{ textAlign: 'center' }}
                  >
                    You can verify at most 3 wallets
                  </DialogContentText>
                  <Divider sx={{ mt: 4, mb: -6 }} />
                </DialogTitle>

                <DialogContent
                  sx={{
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
                    pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
                  }}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle1' component='p'>
                              Currently Wallet
                            </Typography>
                          </Stack>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Stack
                              direction='row'
                              spacing={4}
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='flex-start'
                            >
                              <Badge
                                overlap='circular'
                                sx={{ ml: 2, cursor: 'pointer' }}
                                badgeContent={
                                  <BadgeContentSpan
                                    sx={{
                                      backgroundColor: theme =>
                                        isCurrentWalletVerified
                                          ? theme.palette.success.main
                                          : theme.palette.warning.main
                                    }}
                                  />
                                }
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right'
                                }}
                              >
                                {renderWalletAvatar(walletAccount.address!)}
                              </Badge>
                              <Stack alignItems='flex-start' justifyContent='center'>
                                <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                                  <Typography variant='subtitle1' component='p'>
                                    {getFormattedEthereumAddress(walletAccount.address!)}
                                  </Typography>
                                  <IconButton
                                    size='small'
                                    onClick={() => handleCopyAddress(walletAccount.address as string)}
                                  >
                                    <Icon
                                      icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'}
                                      fontSize={16}
                                    />
                                  </IconButton>
                                </Stack>
                                <Typography variant='caption'>{walletAccount.connector?.name}</Typography>
                              </Stack>
                            </Stack>

                            <Stack alignSelf='stretch' alignItems='center' justifyContent='center'>
                              {isCurrentWalletVerified ? (
                                <CustomChip
                                  skin='light'
                                  size='small'
                                  color='success'
                                  label='verified'
                                  rounded
                                  sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                                />
                              ) : (
                                <LoadingButton
                                  variant='contained'
                                  size='small'
                                  loading={isVerifyWalletLoading || isVerifyWalletProcessLoading}
                                  onClick={handleVerifyWallet}
                                >
                                  Verify
                                </LoadingButton>
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                        <Stack
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='center'
                          sx={{ color: 'text.secondary' }}
                        >
                          <Icon icon='mdi:plus-circle-outline' fontSize={28} />
                        </Stack>
                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle1' component='p'>
                              Verified Wallets
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
                              <CardContent
                                sx={{
                                  display: 'flex',
                                  textAlign: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                                }}
                              >
                                <CustomAvatar skin='light' color='warning' sx={{ width: 56, height: 56, mb: 2 }}>
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
                                      <Badge
                                        overlap='circular'
                                        sx={{ ml: 2, cursor: 'pointer' }}
                                        badgeContent={
                                          <BadgeContentSpan
                                            sx={{
                                              backgroundColor: theme =>
                                                theme.palette[
                                                  wallet.address.toLowerCase() === walletAccount?.address?.toLowerCase()
                                                    ? 'success'
                                                    : 'warning'
                                                ].main
                                            }}
                                          />
                                        }
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right'
                                        }}
                                      >
                                        {renderWalletAvatar(wallet.address)}
                                      </Badge>
                                      <Stack spacing='0.5'>
                                        <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                          <Typography sx={{ fontWeight: 500 }}>
                                            {getFormattedEthereumAddress(wallet.address)}
                                          </Typography>
                                          <IconButton
                                            size='small'
                                            onClick={() => handleCopyAddress(walletAccount.address as string)}
                                          >
                                            <Icon
                                              icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'}
                                              fontSize={16}
                                            />
                                          </IconButton>
                                        </Stack>
                                        <Typography variant='caption'>{wallet.connector}</Typography>
                                      </Stack>
                                    </Stack>
                                    <Stack alignItems='center'>
                                      <CustomChip
                                        skin='light'
                                        size='small'
                                        color='success'
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
                        <Typography variant='caption' component='p' textAlign='center'>
                          Once you verify a wallet, it will not be removed
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>

              {/* Receive Dialog */}
              <Dialog
                open={isReceiveDialogOpen}
                onClose={handleCloseReceiveDialog}
                aria-labelledby='receive-funds'
                aria-describedby='receive-funds-description'
                sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
              >
                <IconButton
                  size='small'
                  onClick={handleCloseReceiveDialog}
                  sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                >
                  <Icon icon='mdi:close' />
                </IconButton>

                <DialogTitle
                  sx={{
                    textAlign: 'center',
                    fontSize: '1.5rem !important',
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
                  }}
                >
                  Receive Funds
                  <DialogContentText
                    id='receive-funds-description'
                    variant='body2'
                    component='p'
                    sx={{ textAlign: 'center' }}
                  >
                    Scan the QR code in your wallet to receive funds
                  </DialogContentText>
                  <Divider sx={{ mt: 4, mb: -6 }} />
                </DialogTitle>

                <DialogContent
                  sx={{
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
                    pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
                  }}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Stack alignItems='center' justifyContent='center'>
                        <QRCode value={walletAccount.address} />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction='row' spacing={4} alignItems='center' justifyContent='center'>
                        <Typography variant='subtitle1' component='p' color='common.white'>
                          {getFormattedEthereumAddress(walletAccount.address)}
                        </Typography>
                        <IconButton size='small' onClick={() => handleCopyAddress(walletAccount.address as string)}>
                          <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={16} />
                        </IconButton>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body2' component='p' color='text.secondary' textAlign='center'>
                        Copy the wallet address to
                      </Typography>
                      <Typography variant='body2' component='p' color='text.secondary' textAlign='center'>
                        send funds to this wallet
                      </Typography>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
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
              Greeting
              <Box component='span' sx={{ fontWeight: 600 }}>
                {` ${session.data?.user.username} `}
              </Box>
              ! 🎉
            </Typography>
            <Typography variant='caption' color='common.white'>
              {`We won't ask for your private key`}
            </Typography>
          </Stack>
          <Typography variant='subtitle1' color='common.white'>
            {`Connect your wallet and start earning`}
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
          <Stack alignSelf='stretch' alignItems='center' justifyContent='center'>
            <Typography variant='caption' color='common.white' textAlign='center'>
              By connecting your wallet, you agree to our
              <Typography
                variant='caption'
                color='common.white'
                component={Link}
                href='/terms-of-service'
                target='_blank'
                sx={{ fontWeight: 600 }}
              >
                {` Terms `}
              </Typography>
            </Typography>
            <Typography variant='caption' color='common.white' textAlign='center'>
              and have read our
              <Typography
                variant='caption'
                color='common.white'
                component={Link}
                href='/privacy-policy'
                target='_blank'
                sx={{ fontWeight: 600 }}
              >
                {` Privacy Policy `}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default WalletConnectCard
