// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { useAccount, useAccountEffect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import safePrice from 'currency.js'
import { Atropos } from 'atropos/react'
import confetti from 'canvas-confetti'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Custom Component Imports
import ManagementFundPreviewPackageMintStepperDotBox from 'src/views/management/fund/preview/boxes/ManagementFundPreviewPackageMintStepperDotBox'
import WalletConnectCard from 'src/views/shared/wallet-connect-card'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

// ** Util Imports
import {
  getFundCurrencyProperties,
  getPackageStatusProperties,
  getFormattedPriceUnit,
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
}

const ManagementFundPreviewPackageCard = (props: Props) => {
  // ** Props
  const { initFundEntity, initPackageEntity } = props

  // ** States
  const [isMintSFTDialogOpen, setIsMintSFTDialogOpen] = useState<boolean>(false)
  const [activeMintStep, setActiveMintStep] = useState<number>(0)
  const [mintQuantity, setMintQuantity] = useState<number>(1)
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const bgColors = useBgColor()
  const walletAccount = useAccount()

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
    args: [walletAccount.address!, initFundEntity.sft.contractAddress],
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

  // ** Vars
  const wallets = walletsData?.data || []
  const totalPrice = Number(safePrice(initPackageEntity?.priceInUnit ?? 0).multiply(mintQuantity))

  const isCurrentWalletVerified =
    walletAccount.status === 'connected' &&
    wallets.find(wallet => wallet.address.toLowerCase() === walletAccount.address.toLowerCase())

  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)
  const packageStatusProperties = getPackageStatusProperties(initPackageEntity.status)

  const STEPS = [
    {
      show: true,
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
      show: true,
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
      show: true,
      title: 'Mint',
      subtitle: 'Confirm and mint token',
      checks: {
        total: () => {
          return true
        }
      }
    },
    {
      show: false,
      title: 'Mint Succeed',
      subtitle: 'Check your sft',
      checks: {
        total: () => {
          return true
        }
      }
    }
  ]

  // ** Logics
  const handleOpenMintSFTDialog = () => setIsMintSFTDialogOpen(() => true)
  const handleCloseMintSFTDialog = () => setIsMintSFTDialogOpen(() => false)

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsAddressCopied(() => true)
    setTimeout(() => {
      setIsAddressCopied(() => false)
    }, 2 * 1000)
  }

  const checkAllowanceSufficient = (): boolean => {
    if (isPayTokenAllowanceLoading || isPayTokenAllowanceFetching) return true

    return BigInt(totalPrice) * 10n ** 18n <= BigInt(Number(payTokenAllowance ?? 0))
  }

  // ** Side Effects
  useAccountEffect({
    onDisconnect() {
      setActiveMintStep(() => 0)
    }
  })
  useEffect(() => {
    if (isApprovePayTokenSuccess) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        zIndex: 9999
      })
      refetchPayTokenAllowance()
    }
  }, [isApprovePayTokenSuccess, refetchPayTokenAllowance])

  return (
    <Card
      sx={{
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
                  variant='h4'
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
                <Typography component='p'>No utilities</Typography>
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
                variant='contained'
                size='small'
                startIcon={<Icon icon='mdi:keyboard-arrow-down' />}
                onClick={handleOpenMintSFTDialog}
              >
                Mint
              </Button>
            </Stack>
          </CardContent>
        </Grid>

        <Dialog
          open={isMintSFTDialogOpen}
          onClose={handleCloseMintSFTDialog}
          aria-labelledby='mint-sft'
          aria-describedby='mint-sft-description'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
        >
          <IconButton
            size='small'
            onClick={handleCloseMintSFTDialog}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <DialogTitle
            id='mint-sft'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
            }}
          >
            Mint SFT
            <DialogContentText
              id='user-view-edit-description'
              variant='body2'
              component='p'
              sx={{ textAlign: 'center' }}
            >
              Mint SFT to invest in the fund
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
                <StepperWrapper>
                  <Stepper activeStep={activeMintStep}>
                    {STEPS.filter(step => step.show).map((step, index) => (
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
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='center'
                          sx={{ py: 12 }}
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
                          <WalletConnectCard />
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
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='center'
                          sx={{ py: 12 }}
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
                              <Typography variant='subtitle1' component='p'>{`x ${mintQuantity}`}</Typography>
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
                          <Stack direction='row' spacing={12} alignItems='center' justifyContent='space-between'>
                            <IconButton
                              size='large'
                              onClick={() => {
                                setMintQuantity(prevMintQuantity => Math.max(prevMintQuantity - 1, 1))
                              }}
                            >
                              <Icon icon='mdi:minus-box-outline' fontSize={48} />
                            </IconButton>
                            <Typography variant='h5' component='p'>
                              {mintQuantity}
                            </Typography>
                            <IconButton
                              size='large'
                              onClick={() => {
                                setMintQuantity(prevMintQuantity => Math.min(prevMintQuantity + 1, 10))
                              }}
                            >
                              <Icon icon='mdi:plus-box-outline' fontSize={48} />
                            </IconButton>
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
                        <Stack spacing={6} alignItems='center' justifyContent='center' sx={{ width: '100%', py: 12 }}>
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
                                  <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={16} />
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
                            {checkAllowanceSufficient() ? (
                              <Box
                                sx={{
                                  px: 4,
                                  py: 2,
                                  width: '100%',

                                  borderRadius: 1,
                                  border: theme => `1px solid ${theme.palette.primary.main}`,
                                  ...bgColors.primaryLight
                                }}
                              >
                                <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                  <Icon icon='mdi:approve' fontSize={16} />
                                  {`${fundBaseCurrencyProperties.currency} Approved`}
                                </Stack>
                              </Box>
                            ) : (
                              <LoadingButton
                                fullWidth
                                loading={isApprovePayTokenPending || isApprovePayTokenConfirming}
                                variant='contained'
                                onClick={() => {
                                  approvePayToken({
                                    chainId: getChainId(
                                      initFundEntity.chain
                                    ) as (typeof wagmiConfig)['chains'][number]['id'],
                                    abi: getBaseCurrencyABI(initFundEntity.chain, initFundEntity.baseCurrency),
                                    address: getBaseCurrencyAddress(initFundEntity.chain, initFundEntity.baseCurrency),
                                    functionName: 'approve',
                                    args: [initFundEntity.sft.contractAddress, BigInt(totalPrice) * 10n ** 18n],
                                    account: walletAccount.address!
                                  })
                                }}
                              >
                                <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                  <Icon icon='mdi:approve' fontSize={16} />
                                  {`Approve ${fundBaseCurrencyProperties.currency}`}
                                </Stack>
                              </LoadingButton>
                            )}
                            <Button fullWidth variant='contained' disabled>
                              <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                <Icon icon='mdi:hammer' fontSize={16} />
                                Mint
                              </Stack>
                            </Button>
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
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'space-between',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(4)} !important`],
              pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(7.5)} !important`]
            }}
          >
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
                disabled={activeMintStep >= 2 || !STEPS[activeMintStep].checks?.total() || isWalletListLoading}
                onClick={() => {
                  setActiveMintStep(prev => Math.min(prev + 1, 2))
                }}
              >
                Next
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </Grid>
    </Card>
  )
}

export default ManagementFundPreviewPackageCard
