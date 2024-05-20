// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Grow from '@mui/material/Grow'
import Fade from '@mui/material/Fade'
import Tooltip from '@mui/material/Tooltip'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import {
  useAccount,
  useAccountEffect,
  useSignMessage,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from 'wagmi'
import safePrice from 'currency.js'
import { Atropos } from 'atropos/react'
import toast from 'react-hot-toast'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Custom Component Imports
import ManagementFundPreviewPackageMintStepperDotBox from 'src/views/management/fund/preview/boxes/ManagementFundPreviewPackageMintStepperDotBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** API Imports
import { useFindMeQuery, useGetNonceQuery, useVerifyMutation } from 'src/store/api/management/wallet'

// ** Util Imports
import {
  getFundCurrencyProperties,
  getPackageStatusProperties,
  getFormattedPriceUnit,
  getGradientColors,
  getChainId,
  getFormattedEthereumAddress,
  getBaseCurrencyABI,
  getBaseCurrencyAddress
} from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { GridProps } from '@mui/material/Grid'
import type { FundType } from 'src/types/fundTypes'
import type { PackageType } from 'src/types/packageTypes'

// ** Style Imports
import 'atropos/css'

// ** Styled Grid Component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled <sup> Component
const Sup = styled('sup')(({ theme }) => ({
  fontSize: '1.2rem',
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

interface Props {
  initFundEntity: FundType
  initPackageEntity: PackageType
  selectedPackageEntityId: number | null
  handleSelectPackage: (packageEntityId: number) => void
}

const ManagementFundPreviewPackageCard = (props: Props) => {
  // ** Props
  const { initFundEntity, initPackageEntity, selectedPackageEntityId, handleSelectPackage } = props

  // ** States
  const [activeMintStep, setActiveMintStep] = useState<number>(0)
  const [isVerifyWalletProcessLoading, setIsVerifyWalletProcessLoading] = useState<boolean>(false)
  const [mintQuantity, setMintQuantity] = useState<number>(1)
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const bgColors = useBgColor()
  const walletAccount = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnectAsync } = useDisconnect()

  const {
    data: payTokenBalance,
    refetch: refetchPayTokenBalance,
    isLoading: isPayTokenBalanceLoading,
    isFetching: isPayTokenBalanceFetching
  } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: getBaseCurrencyABI(initFundEntity.chain, initFundEntity.baseCurrency),
    address: getBaseCurrencyAddress(initFundEntity.chain, initFundEntity.baseCurrency),
    functionName: 'balanceOf',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected' && activeMintStep === 2
    }
  })

  const {
    data: payTokenAllowance,
    refetch: refetchPayTokenAllowance,
    isLoading: isPayTokenAllowanceLoading,
    isFetching: isPayTokenAllowanceFetching
  } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: getBaseCurrencyABI(initFundEntity.chain, initFundEntity.baseCurrency),
    address: getBaseCurrencyAddress(initFundEntity.chain, initFundEntity.baseCurrency),
    functionName: 'allowance',
    args: [walletAccount.address!, initFundEntity.fundSFTContractAddress],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected' && activeMintStep === 2
    }
  })

  const {
    data: approvePayTokenHash,
    isPending: isApprovePayTokenPending,
    writeContract: approvePayToken
  } = useWriteContract()

  const { isLoading: isApprovePayTokenConfirming, isSuccess: isApprovePayTokenSuccess } = useWaitForTransactionReceipt({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    hash: approvePayTokenHash
  })

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
  const totalPrice = Number(safePrice(initPackageEntity?.priceInUnit ?? 0).multiply(mintQuantity))

  const isCurrentWalletVerified =
    walletAccount.status === 'connected' &&
    wallets.find(wallet => wallet.address.toLowerCase() === walletAccount.address.toLowerCase())

  const nonce = nonceData?.nonce
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)
  const packageStatusProperties = getPackageStatusProperties(initPackageEntity.status)

  const STEPS = [
    {
      title: 'Connect Wallet',
      subtitle: 'Connect and verify your wallet',
      checks: {
        walletConnect: () => {
          return walletAccount.status === 'connected'
        },
        connectedNetwork: () => {
          const requiredChainId = getChainId(initFundEntity.chain)

          return walletAccount.chain?.id === requiredChainId
        },
        walletVerified: () => {
          return isCurrentWalletVerified
        },
        total: () => {
          return (
            STEPS[0].checks!.walletConnect!() &&
            STEPS[0].checks!.connectedNetwork!() &&
            STEPS[0].checks!.walletVerified!()
          )
        }
      }
    },
    {
      title: 'Select Quantity',
      subtitle: 'Select quantity and check fees',
      checks: {
        checkQuantity: () => {
          return 1 <= mintQuantity && mintQuantity <= 10
        },
        total: () => {
          return STEPS[1].checks!.checkQuantity!()
        }
      }
    },
    {
      title: 'Mint',
      subtitle: 'Confirm and mint token',
      checks: {
        total: () => {
          return true
        }
      }
    }
  ]

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

  const checkAllowanceSufficient = (): boolean => {
    if (isPayTokenAllowanceLoading || isPayTokenAllowanceFetching) return true

    return BigInt(totalPrice) * 10n ** 18n <= BigInt(Number(payTokenAllowance ?? 0))
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

  // ** Side Effects
  useAccountEffect({
    onDisconnect() {
      setActiveMintStep(() => 0)
    }
  })
  useEffect(() => {
    if (isApprovePayTokenSuccess) {
      toast.success('Pay token approved')
      refetchPayTokenAllowance()
    }
  }, [isApprovePayTokenSuccess, refetchPayTokenAllowance])

  return (
    <Card
      sx={{
        border: theme =>
          `1px ${selectedPackageEntityId === initPackageEntity.id ? theme.palette.primary.main : 'transparent'} solid`,
        transition: 'border-color 0.2s',
        '&:hover': {
          borderColor: theme => theme.palette.primary.main
        }
      }}
    >
      <Grid container spacing={6}>
        <StyledGrid item md={5} xs={12} sx={{ position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: theme => theme.spacing(12), right: 16 }}>
            <CustomChip
              skin='light'
              size='medium'
              label={packageStatusProperties.displayName}
              color={packageStatusProperties.color}
              sx={{
                height: 20,
                fontWeight: 600,
                borderRadius: '5px',
                fontSize: '0.875rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { mt: -0.25 }
              }}
            />
          </Box>
          <CardContent
            sx={{
              minHeight: theme => theme.spacing(90),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& img:hover': {
                cursor: 'pointer'
              }
            }}
          >
            <Atropos>
              <Image
                width={180}
                height={256}
                draggable={false}
                alt={initPackageEntity.displayName}
                src={`/images/funds/packages/card-skin/${initPackageEntity.skin.toLowerCase()}-${
                  theme.palette.mode
                }.webp`}
              />
            </Atropos>
          </CardContent>
        </StyledGrid>
        <Grid
          item
          md={7}
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pt: theme => ['0 !important', '0 !important', `${theme.spacing(6)} !important`],
            pl: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(6)} !important`, '0 !important']
          }}
        >
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Stack direction='row' spacing={2} flexWrap='wrap' justifyContent='space-between'>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Box>
                  <CustomChip
                    skin='light'
                    size='medium'
                    label={
                      <Typography
                        variant='subtitle1'
                        component='p'
                        sx={{ fontWeight: 600 }}
                      >{`# ${initPackageEntity.packageId}`}</Typography>
                    }
                    color='secondary'
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      borderRadius: '5px',
                      fontSize: '0.75rem',
                      alignSelf: 'flex-start',
                      color: 'text.secondary'
                    }}
                  />
                </Box>
                <Typography variant='h5' component='p'>
                  {initPackageEntity.displayName}
                </Typography>
              </Stack>
              <Stack direction='row' sx={{ position: 'relative' }}>
                <Sup>{fundBaseCurrencyProperties.symbol}</Sup>
                <Typography
                  variant='h3'
                  component='p'
                  sx={{
                    mb: -1.2,
                    ml: 2,
                    lineHeight: 1,
                    color: 'primary.main'
                  }}
                >
                  {getFormattedPriceUnit(initPackageEntity.priceInUnit)}
                </Typography>
              </Stack>
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant='body2'>{initPackageEntity.description || 'No description'}</Typography>
            </Box>
            <Box>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
            </Box>
            <Stack spacing={2} justifyContent='center'>
              <Typography variant='subtitle2' component='p'>
                Utility
              </Typography>

              {initPackageEntity.slot?.length === 0 ? (
                <Typography component='p'>尚未設定內容</Typography>
              ) : (
                <Stack spacing={2} alignSelf='stretch'>
                  {initPackageEntity.slot.map(property => {
                    return (
                      <Stack
                        key={`slot-${property.id}`}
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Typography variant='subtitle1' component='p'>
                          {property.propertyType}
                        </Typography>
                        <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                          {property.value}
                        </Typography>
                      </Stack>
                    )
                  })}
                </Stack>
              )}
            </Stack>

            <Stack sx={{ pt: 8, mt: 'auto' }}>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Button
                fullWidth
                disabled={selectedPackageEntityId === initPackageEntity.id}
                variant={selectedPackageEntityId === initPackageEntity.id ? 'text' : 'outlined'}
                size='small'
                sx={{
                  '& svg': {
                    transition: theme => theme.transitions.create('transform'),
                    transform: selectedPackageEntityId === initPackageEntity.id ? 'rotate(180deg)' : 'rotate(0)'
                  }
                }}
                startIcon={<Icon icon='mdi:keyboard-arrow-down' />}
                onClick={() => {
                  handleSelectPackage(initPackageEntity.id)
                }}
              >
                <Typography variant='subtitle2' component='p'>
                  Mint
                </Typography>
              </Button>
            </Stack>
          </CardContent>
        </Grid>

        <Grow in={selectedPackageEntityId === initPackageEntity.id} mountOnEnter unmountOnExit>
          <Grid item xs={12}>
            <Divider sx={{ mt: -6 }} />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <StepperWrapper>
                    <Stepper activeStep={activeMintStep}>
                      {STEPS.map((step, index) => (
                        <Step key={`preview-package-mint-${index}`}>
                          <StepLabel StepIconComponent={ManagementFundPreviewPackageMintStepperDotBox}>
                            <Box className='step-label'>
                              <Typography className='step-number'>{`0${index + 1}`}</Typography>
                              <Box>
                                <Typography className='step-title'>{step.title}</Typography>
                                <Typography className='step-subtitle'>{step.subtitle}</Typography>
                              </Box>
                            </Box>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </StepperWrapper>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ m: '0 !important' }} />
                </Grid>
                <Grid item xs={12}>
                  {/* Check wallet */}
                  <Fade in={activeMintStep === 0} mountOnEnter unmountOnExit>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Stack spacing={4} alignItems='center' justifyContent='center'>
                          <Stack
                            spacing={6}
                            alignItems='center'
                            justifyContent='center'
                            sx={{ width: '100%', maxWidth: theme => theme.spacing(120), py: 12 }}
                          >
                            <CustomAvatar skin='light' sx={{ width: 56, height: 56 }}>
                              <Icon icon='mdi:wallet-bifold-outline' fontSize='2rem' />
                            </CustomAvatar>
                            <Typography variant='body2'>
                              Please connect your wallet to proceed with the minting process
                            </Typography>
                            <Stack
                              spacing={2}
                              alignSelf='stretch'
                              divider={<Divider orientation='horizontal' flexItem />}
                            >
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1' component='p'>
                                  Connect Wallet
                                </Typography>
                                <Stack
                                  alignItems='center'
                                  justifyContent='center'
                                  sx={{
                                    color: STEPS[0].checks!.walletConnect!() ? 'success.main' : 'warning.main'
                                  }}
                                >
                                  <Icon
                                    icon={
                                      STEPS[0].checks!.walletConnect!()
                                        ? 'mdi:check-circle-outline'
                                        : 'mdi:alert-circle-outline'
                                    }
                                  />
                                </Stack>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography
                                  variant='subtitle1'
                                  component='p'
                                >{`Network ${initFundEntity.chain}`}</Typography>
                                <Stack
                                  alignItems='center'
                                  justifyContent='center'
                                  sx={{
                                    color: STEPS[0].checks!.connectedNetwork!() ? 'success.main' : 'warning.main'
                                  }}
                                >
                                  <Icon
                                    icon={
                                      STEPS[0].checks!.connectedNetwork!()
                                        ? 'mdi:check-circle-outline'
                                        : 'mdi:alert-circle-outline'
                                    }
                                  />
                                </Stack>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1' component='p'>
                                  Wallet Verified
                                </Typography>
                                <Stack
                                  alignItems='center'
                                  justifyContent='center'
                                  sx={{
                                    color: STEPS[0].checks!.walletVerified!() ? 'success.main' : 'warning.main'
                                  }}
                                >
                                  <Icon
                                    icon={
                                      STEPS[0].checks!.walletVerified!()
                                        ? 'mdi:check-circle-outline'
                                        : 'mdi:alert-circle-outline'
                                    }
                                  />
                                </Stack>
                              </Stack>
                            </Stack>
                            <ConnectButton.Custom>
                              {({
                                account,
                                chain,
                                openChainModal,
                                openConnectModal,
                                authenticationStatus,
                                mounted
                              }) => {
                                const ready = mounted && authenticationStatus !== 'loading'

                                const connected =
                                  ready &&
                                  account &&
                                  chain &&
                                  (!authenticationStatus || authenticationStatus === 'authenticated')

                                if (!connected) {
                                  return (
                                    <Button variant='contained' onClick={openConnectModal} sx={{ flex: 1 }}>
                                      <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                        <Icon icon='mdi:login-variant' fontSize={16} />
                                        Connect Wallet
                                      </Stack>
                                    </Button>
                                  )
                                }

                                if (chain.unsupported) {
                                  return (
                                    <Button color='error' variant='contained' onClick={openChainModal} sx={{ flex: 1 }}>
                                      <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                        <Icon icon='mdi:error-outline' fontSize={16} />
                                        Network unsupported
                                      </Stack>
                                    </Button>
                                  )
                                }

                                if (!STEPS[0].checks!.connectedNetwork!()) {
                                  return (
                                    <Button color='error' variant='contained' onClick={openChainModal} sx={{ flex: 1 }}>
                                      <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                        <Icon icon='mdi:exchange' fontSize={16} />
                                        Switch network
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
                                      maxWidth: theme => theme.spacing(120),
                                      borderRadius: 1,
                                      border: theme => `1px solid ${theme.palette.primary.main}`,
                                      ...bgColors.primaryLight
                                    }}
                                  >
                                    <Stack
                                      direction='column'
                                      spacing={4}
                                      alignItems='center'
                                      justifyContent='space-between'
                                    >
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
                                              <Icon
                                                icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'}
                                                fontSize={16}
                                              />
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
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Fade>

                  {/* Check quantity and Approve pay token */}
                  <Fade in={activeMintStep === 1} mountOnEnter unmountOnExit>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Stack spacing={4} alignItems='center' justifyContent='center'>
                          <Stack
                            spacing={6}
                            alignItems='center'
                            justifyContent='center'
                            sx={{ width: '100%', maxWidth: theme => theme.spacing(120), py: 12 }}
                          >
                            <CustomAvatar skin='light' sx={{ width: 56, height: 56 }}>
                              <Icon icon='mdi:attach-money' fontSize='2rem' />
                            </CustomAvatar>
                            <Typography variant='body2' component='p'>
                              Set quantity and approve pay token
                            </Typography>
                            <Stack
                              spacing={2}
                              alignSelf='stretch'
                              divider={<Divider orientation='horizontal' flexItem />}
                            >
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  Quantity
                                </Typography>
                                <Stack
                                  direction='row'
                                  alignItems='center'
                                  justifyContent='space-between'
                                  sx={{ mr: -4 }}
                                >
                                  <Stack
                                    direction='row'
                                    spacing={4}
                                    alignItems='center'
                                    sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                                  >
                                    <IconButton
                                      size='large'
                                      onClick={() => {
                                        setMintQuantity(prevMintQuantity => Math.max(prevMintQuantity - 1, 1))
                                      }}
                                    >
                                      <Icon icon='mdi:minus-box-outline' />
                                    </IconButton>
                                    <Typography variant='h6' component='p'>
                                      {mintQuantity}
                                    </Typography>
                                    <IconButton
                                      size='large'
                                      onClick={() => {
                                        setMintQuantity(prevMintQuantity => Math.min(prevMintQuantity + 1, 10))
                                      }}
                                    >
                                      <Icon icon='mdi:plus-box-outline' />
                                    </IconButton>
                                  </Stack>
                                </Stack>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  Price
                                </Typography>
                                <Typography
                                  variant='subtitle1'
                                  component='p'
                                >{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                  initPackageEntity?.priceInUnit
                                )} ${fundBaseCurrencyProperties.currency}`}</Typography>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  Fee
                                </Typography>
                                <Typography
                                  variant='subtitle1'
                                  component='p'
                                >{`${initFundEntity.performanceFeePercentage} %`}</Typography>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  Total
                                </Typography>
                                <Typography
                                  variant='h6'
                                  component='p'
                                  sx={{ fontWeight: 600 }}
                                >{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                  Number(safePrice(initPackageEntity?.priceInUnit ?? 0).multiply(mintQuantity))
                                )} ${fundBaseCurrencyProperties.currency}`}</Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Fade>

                  {/* Mint */}
                  <Fade in={activeMintStep === 2} mountOnEnter unmountOnExit>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Stack spacing={4} alignItems='center' justifyContent='center'>
                          <Stack
                            spacing={6}
                            alignItems='center'
                            justifyContent='center'
                            sx={{ width: '100%', maxWidth: theme => theme.spacing(120), py: 12 }}
                          >
                            <CustomAvatar skin='light' sx={{ width: 56, height: 56 }}>
                              <Icon icon='mdi:cart-arrow-down' fontSize='2rem' />
                            </CustomAvatar>
                            <Typography variant='body2' component='p'>
                              Confirm details and mint token
                            </Typography>
                            <Stack
                              spacing={2}
                              alignSelf='stretch'
                              divider={<Divider orientation='horizontal' flexItem />}
                            >
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  Quantity
                                </Typography>
                                <Typography variant='subtitle1' component='p'>{`x ${mintQuantity}`}</Typography>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  Total
                                </Typography>
                                <Typography
                                  variant='subtitle1'
                                  component='p'
                                >{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                  totalPrice
                                )} ${fundBaseCurrencyProperties.currency}`}</Typography>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  Wallet
                                </Typography>
                                <Stack
                                  direction='row'
                                  spacing={2}
                                  alignItems='center'
                                  justifyContent='center'
                                  sx={{
                                    color: 'warning.main'
                                  }}
                                >
                                  <Typography variant='subtitle1' component='p'>
                                    {getFormattedEthereumAddress(walletAccount.address as string)}
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
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  {`${initFundEntity.baseCurrency} Balance`}
                                </Typography>
                                {isPayTokenBalanceLoading || isPayTokenBalanceFetching ? (
                                  <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                    <Skeleton variant='text' width={120} />
                                    <Skeleton variant='circular' width={28} height={28} />
                                  </Stack>
                                ) : (
                                  <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                    <Typography variant='subtitle1' component='p'>
                                      {`${fundBaseCurrencyProperties.symbol} ${payTokenBalance ? getFormattedPriceUnit((payTokenBalance as bigint) / 10n ** 18n) : 0} ${fundBaseCurrencyProperties.currency}`}
                                    </Typography>
                                    <IconButton size='small' onClick={() => refetchPayTokenBalance()}>
                                      <Icon icon='mdi:reload' fontSize={16} />
                                    </IconButton>
                                  </Stack>
                                )}
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle2' component='p'>
                                  {`${initFundEntity.baseCurrency} Allowance`}
                                </Typography>
                                <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                  {!checkAllowanceSufficient() && (
                                    <Tooltip title='Allowance Insufficient' placement='top' arrow>
                                      <IconButton
                                        size='small'
                                        sx={{
                                          color: 'warning.main'
                                        }}
                                      >
                                        <Icon icon='mdi:alert-circle-outline' fontSize={18} />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  {isPayTokenAllowanceLoading || isPayTokenAllowanceFetching ? (
                                    <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                      <Skeleton variant='text' width={120} />
                                      <Skeleton variant='circular' width={28} height={28} />
                                    </Stack>
                                  ) : (
                                    <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                      <Typography variant='subtitle1' component='p'>
                                        {`${fundBaseCurrencyProperties.symbol} ${payTokenAllowance ? getFormattedPriceUnit((payTokenAllowance as bigint) / 10n ** 18n) : 0} ${fundBaseCurrencyProperties.currency}`}
                                      </Typography>
                                      <IconButton size='small' onClick={() => refetchPayTokenAllowance()}>
                                        <Icon icon='mdi:reload' fontSize={16} />
                                      </IconButton>
                                    </Stack>
                                  )}
                                </Stack>
                              </Stack>
                            </Stack>
                            <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                              <LoadingButton
                                fullWidth
                                loading={isApprovePayTokenPending || isApprovePayTokenConfirming}
                                variant='contained'
                                disabled={checkAllowanceSufficient()}
                                onClick={() => {
                                  approvePayToken(
                                    {
                                      chainId: getChainId(
                                        initFundEntity.chain
                                      ) as (typeof wagmiConfig)['chains'][number]['id'],
                                      abi: getBaseCurrencyABI(initFundEntity.chain, initFundEntity.baseCurrency),
                                      address: getBaseCurrencyAddress(
                                        initFundEntity.chain,
                                        initFundEntity.baseCurrency
                                      ),
                                      functionName: 'approve',
                                      args: [initFundEntity.fundSFTContractAddress, BigInt(totalPrice) * 10n ** 18n],
                                      account: walletAccount.address!
                                    },
                                    {
                                      onError: () => {
                                        toast.error('Failed to approve pay token')
                                      }
                                    }
                                  )
                                }}
                                sx={{ flex: 1 }}
                              >
                                <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                  <Icon icon='mdi:approve' fontSize={16} />
                                  Approved
                                </Stack>
                              </LoadingButton>
                              <LoadingButton fullWidth variant='contained' disabled sx={{ flex: 1 }}>
                                <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                  <Icon icon='mdi:hammer' fontSize={16} />
                                  Mint
                                </Stack>
                              </LoadingButton>
                            </Stack>
                            <Typography variant='subtitle1' textAlign='center'>
                              {`Can't mint in preview mode`}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Fade>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Stack direction='row' flexGrow='1' alignItems='center' justifyContent='space-between'>
                <Button
                  disabled={activeMintStep === 0}
                  onClick={() => {
                    setActiveMintStep(prev => Math.max(prev - 1, 0))
                  }}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  disabled={activeMintStep === 2 || !STEPS[activeMintStep].checks?.total() || isWalletListLoading}
                  onClick={() => {
                    setActiveMintStep(prev => Math.min(prev + 1, 2))
                  }}
                >
                  Next
                </Button>
              </Stack>
            </CardActions>
          </Grid>
        </Grow>
      </Grid>
    </Card>
  )
}

export default ManagementFundPreviewPackageCard
