// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Grid, { GridProps } from '@mui/material/Grid'
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

// ** Third-Party Imports
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SiweMessage } from 'siwe'
import { useAccount, useSignMessage } from 'wagmi'
import safePrice from 'currency.js'
import Atropos from 'atropos/react'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Custom Component Imports
import ManagementFundPreviewPackageMintStepperDotBox from 'src/views/management/fund/preview/boxes/ManagementFundPreviewPackageMintStepperDotBox'

// ** API Imports
import { useFindMeQuery, useGetNonceQuery, useVerifyMutation } from 'src/store/api/management/wallet'

// ** Util Imports
import {
  getFundCurrencyProperties,
  getPackageStatusProperties,
  getFormattedPriceUnit,
  getFormattedEthereumAddress
} from 'src/utils'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'
import { PackageType } from 'src/types/api/packageTypes'

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
  const [approvedPayToken, setApprovedPayToken] = useState<number>(0)

  // ** Hooks
  const theme = useTheme()
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
          return walletAccount.chain?.name.toLowerCase() === initFundEntity.chain.toLowerCase()
        },
        walletVerified: () => {
          return isCurrentWalletVerified
        },
        total: () => {
          return (
            walletAccount.status === 'connected' &&
            walletAccount.chain?.name.toLowerCase() === initFundEntity.chain.toLowerCase() &&
            Boolean(isCurrentWalletVerified)
          )
        }
      }
    },
    {
      title: 'Approve Token',
      subtitle: 'Select quantity and approve pay token',
      checks: {
        total: () => {
          return approvedPayToken >= Number(safePrice(initPackageEntity?.priceInUnit ?? 0).multiply(mintQuantity))
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
    <Card
      onClick={() => {
        handleSelectPackage(initPackageEntity.id)
      }}
      sx={{
        border: theme =>
          `1px ${selectedPackageEntityId === initPackageEntity.id ? theme.palette.primary.main : 'transparent'} solid`,
        cursor: 'pointer',
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
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Box>
                  <CustomChip
                    skin='light'
                    size='medium'
                    label={<Typography variant='subtitle1'>{`#${initPackageEntity.packageId}`}</Typography>}
                    color='secondary'
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      alignSelf: 'flex-start',
                      color: 'text.secondary'
                    }}
                  />
                </Box>
                <Typography variant='h6'>{initPackageEntity.displayName}</Typography>
              </Stack>

              <Stack direction='row' sx={{ position: 'relative' }}>
                <Sup>{fundBaseCurrencyProperties.symbol}</Sup>
                <Typography
                  variant='h4'
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
            </Box>
            <Typography variant='body2' sx={{ mt: 4, mb: 2 }}>
              {initPackageEntity.description || 'No description'}
            </Typography>
            <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />

            <Stack spacing={2} justifyContent='center' sx={{ mb: 2 }}>
              <Typography variant='subtitle2'>赋能</Typography>

              {initPackageEntity.slot?.length === 0 ? (
                <Typography sx={{ mb: 2 }}>尚未設定內容</Typography>
              ) : (
                initPackageEntity.slot.map(property => {
                  return (
                    <Grid key={`slot-${property.id}`} container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={5} sm={4} md={3}>
                        <Typography>{property.propertyType}</Typography>
                      </Grid>
                      <Grid item xs={7} sm={8} md={9}>
                        <Typography component='span' sx={{ fontWeight: 600 }}>
                          {property.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                })
              )}
            </Stack>
          </CardContent>
        </Grid>

        <Grow in={selectedPackageEntityId === initPackageEntity.id} mountOnEnter unmountOnExit>
          <Grid item xs={12}>
            <Divider sx={{ mt: -6 }} />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant='subtitle2'>鑄造</Typography>
                </Grid>
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
                                <Typography variant='subtitle1'>Connect Wallet</Typography>
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
                                <Typography variant='subtitle1'>{`Network ${initFundEntity.chain}`}</Typography>
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
                                <Typography variant='subtitle1'>Wallet Verified</Typography>
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
                                openAccountModal,
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

                                if (!STEPS[0].checks!.connectedNetwork!()) {
                                  return (
                                    <Button color='error' variant='contained' onClick={openChainModal}>
                                      Switch network
                                    </Button>
                                  )
                                }

                                return (
                                  <Stack
                                    direction='column'
                                    spacing={4}
                                    alignItems='center'
                                    justifyContent='space-between'
                                  >
                                    <Button variant='outlined' onClick={openAccountModal}>
                                      {`${account.displayName} ${
                                        account.displayBalance ? ` - ${account.displayBalance}` : ''
                                      }`}
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
                            <Typography variant='body2'>Set quantity and approve pay token</Typography>
                            <Stack
                              spacing={2}
                              alignSelf='stretch'
                              divider={<Divider orientation='horizontal' flexItem />}
                            >
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Quantity</Typography>
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
                                    <Typography variant='h6'>{mintQuantity}</Typography>
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
                                <Typography variant='subtitle1'>Price</Typography>
                                <Typography variant='h6'>{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                  initPackageEntity?.priceInUnit
                                )} ${fundBaseCurrencyProperties.currency}`}</Typography>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Total</Typography>
                                <Typography variant='h6'>{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                  Number(safePrice(initPackageEntity?.priceInUnit ?? 0).multiply(mintQuantity))
                                )} ${fundBaseCurrencyProperties.currency}`}</Typography>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Approved</Typography>
                                <Typography variant='h6'>{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                  approvedPayToken
                                )} ${fundBaseCurrencyProperties.currency}`}</Typography>
                              </Stack>
                            </Stack>
                            <Stack direction='row' spacing={4} flexGrow='1' alignItems='center' justifyContent='center'>
                              <TextField
                                fullWidth
                                value={approvedPayToken}
                                onChange={e => {
                                  setApprovedPayToken(() => parseInt(e.target.value, 10))
                                }}
                                size='small'
                                inputProps={{ type: 'number' }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start' sx={{ color: 'text.primary' }}>
                                      <Icon icon='mdi:dollar' />
                                    </InputAdornment>
                                  )
                                }}
                                sx={{ display: 'flex' }}
                              />
                              <LoadingButton loading={false} variant='contained' sx={{ textTransform: 'capitalize' }}>
                                Approve
                              </LoadingButton>
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
                            <Typography variant='body2'>Confirm details and mint token</Typography>
                            <Stack
                              spacing={2}
                              alignSelf='stretch'
                              divider={<Divider orientation='horizontal' flexItem />}
                            >
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Wallet</Typography>
                                <Typography variant='h6'>
                                  {getFormattedEthereumAddress(walletAccount.address as string)}
                                </Typography>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Quantity</Typography>
                                <Typography variant='h6'>{`x ${mintQuantity}`}</Typography>
                              </Stack>
                              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Total</Typography>
                                <Typography variant='h6'>{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                  Number(safePrice(initPackageEntity?.priceInUnit ?? 0).multiply(mintQuantity))
                                )} ${fundBaseCurrencyProperties.currency}`}</Typography>
                              </Stack>
                            </Stack>
                            <Stack direction='row' spacing={4} flexGrow='1' alignItems='center' justifyContent='center'>
                              <Typography variant='subtitle1' textAlign='center'>
                                無法在預覽模式下鑄造
                              </Typography>
                            </Stack>
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
                  variant='outlined'
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
