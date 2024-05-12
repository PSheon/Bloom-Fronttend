// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import toast from 'react-hot-toast'
import format from 'date-fns/format'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage } from 'wagmi'

// ** API Imports
import { useFindMeQuery, useGetNonceQuery, useVerifyMutation } from 'src/store/api/management/wallet'

// ** Util Imports
import { getFormattedEthereumAddress } from 'src/utils'

const MeAccountOverviewWalletListCard = () => {
  // ** States
  const [isVerifyWalletProcessLoading, setIsVerifyWalletProcessLoading] = useState<boolean>(false)

  // ** Hooks
  const walletAccount = useAccount()
  const { signMessageAsync } = useSignMessage()

  const { data: walletsData, isLoading: isWalletListLoading } = useFindMeQuery({
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

  return (
    <Card>
      <CardHeader title='Wallets' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
              we need to verify your identity before you can use your wallet, please click the button below to verify
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted
              }) => {
                const ready = mounted && authenticationStatus !== 'loading'

                const connected =
                  ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

                if (!connected) {
                  return (
                    <Button variant='contained' onClick={openConnectModal}>
                      Connect Wallet
                    </Button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <Button color='error' variant='contained' onClick={openChainModal}>
                      Wrong network
                    </Button>
                  )
                }

                return (
                  <Stack direction='column' spacing={4} alignItems='flex-start' justifyContent='space-between'>
                    <Button variant='outlined' onClick={openAccountModal}>
                      {`${account.displayName} ${account.displayBalance ? ` - ${account.displayBalance}` : ''}`}
                    </Button>

                    {!isCurrentWalletVerified && (
                      <LoadingButton
                        variant='contained'
                        loading={isVerifyWalletLoading || isVerifyWalletProcessLoading}
                        disabled={!nonce}
                        onClick={handleVerifyWallet}
                      >
                        Verify
                      </LoadingButton>
                    )}
                  </Stack>
                )
              }}
            </ConnectButton.Custom>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>Verified</Typography>
          </Grid>
          {isWalletListLoading ? (
            <Grid item xs={12}>
              <Skeleton variant='rounded' width='100%' height={64} />
            </Grid>
          ) : (
            wallets.map((wallet, index: number) => {
              const isVerified =
                walletAccount.status === 'connected' &&
                wallet.address.toLowerCase() === walletAccount.address.toLowerCase()

              return (
                <Grid key={index} item xs={12}>
                  <Stack
                    direction={{
                      xs: 'column',
                      md: 'row'
                    }}
                    spacing={2}
                    justifyContent='space-between'
                    alignItems={['flex-start', 'center']}
                    sx={{
                      p: 4,
                      borderRadius: 1,
                      border: theme => `1px solid ${theme.palette.divider}`,
                      backgroundColor: 'action.hover'
                    }}
                  >
                    <Stack spacing={2} alignItems='flex-start' justifyContent='center'>
                      <Typography variant='body2'>{wallet.connector}</Typography>
                      <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: theme => theme.palette[isVerified ? 'success' : 'warning'].main
                          }}
                        />
                        <Typography sx={{ fontWeight: 500 }}>{getFormattedEthereumAddress(wallet.address)}</Typography>
                      </Stack>
                    </Stack>

                    <Stack alignSelf={['flex-start', 'flex-end']} sx={{ textAlign: ['start', 'end'] }}>
                      <Typography variant='body2'>
                        Verified at {format(new Date(wallet.createdAt), 'dd/MM/yyyy')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              )
            })
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MeAccountOverviewWalletListCard
