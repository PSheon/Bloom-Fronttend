// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

// ** MUI Components
import { styled, useTheme, alpha } from '@mui/material/styles'
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
import {
  useAccount,
  useAccountEffect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useDisconnect
} from 'wagmi'
import { ExactNumber as N } from 'exactnumber'
import { Atropos } from 'atropos/react'
import { motion, AnimatePresence } from 'framer-motion'
import format from 'date-fns/format'
import getUnixTime from 'date-fns/getUnixTime'
import confetti from 'canvas-confetti'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Custom Component Imports
import PublicFundLivePackageMintStepperDotBox from 'src/views/fund/live/boxes/PublicFundLivePackageMintStepperDotBox'
import PublicFundLiveTransactionErrorDrawer from 'src/views/fund/live/drawers/PublicFundLiveTransactionErrorDrawer'
import PublicFundDefiVaultPackageDepositRevenueChart from 'src/views/fund/defi-vault/charts/PublicFundDefiVaultPackageDepositRevenueChart'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** API Imports
import { useDepositSignHashMutation } from 'src/store/api/management/dvFund'

// ** Util Imports
import {
  getNextFirstDate,
  getFundCurrencyProperties,
  getPackageStatusProperties,
  getFormattedPriceUnit,
  getChainId,
  getFormattedEthereumAddress,
  getBaseCurrencyABI,
  getBaseCurrencyAddress,
  getGradientColors,
  getValidDefiVaultReferrer
} from 'src/utils'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { BaseError } from 'wagmi'
import type { GridProps } from '@mui/material/Grid'
import type { DVFundType } from 'src/types/dvFundTypes'
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

type TransactionErrorType = {
  from: string
  to: string
  chainInformation: string
  message: string
}
interface Props {
  initDVFundEntity: DVFundType
  initPackageEntity: PackageType
}

const PublicFundDefiVaultPackageCard = (props: Props) => {
  // ** Props
  const { initDVFundEntity, initPackageEntity } = props

  // ** States
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState<boolean>(false)
  const [activeDepositStep, setActiveDepositStep] = useState<number>(0)
  const [depositQuantity, setDepositQuantity] = useState<number>(1)
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)
  const [transactionError, setTransactionError] = useState<TransactionErrorType | null>(null)

  // ** Hooks
  const theme = useTheme()
  const bgColors = useBgColor()
  const router = useRouter()
  const walletAccount = useAccount()
  const searchParams = useSearchParams()
  const { disconnectAsync } = useDisconnect()

  const { refetch: refetchMeDepositInfo } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'depositOf',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: false
    }
  })

  const {
    data: payTokenBalance,
    refetch: refetchPayTokenBalance,
    isLoading: isPayTokenBalanceLoading,
    isFetching: isPayTokenBalanceFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: getBaseCurrencyABI(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
    address: getBaseCurrencyAddress(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
    functionName: 'balanceOf',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected' && activeDepositStep === 1,
      placeholderData: 0n
    }
  })

  const {
    data: payTokenAllowance,
    refetch: refetchPayTokenAllowance,
    isLoading: isPayTokenAllowanceLoading,
    isFetching: isPayTokenAllowanceFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: getBaseCurrencyABI(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
    address: getBaseCurrencyAddress(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
    functionName: 'allowance',
    args: [walletAccount.address!, initDVFundEntity.vault.contractAddress],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected' && activeDepositStep === 1,
      placeholderData: 0n
    }
  })

  const {
    data: approvePayTokenHash,
    isPending: isApprovePayTokenPending,
    writeContract: approvePayToken
  } = useWriteContract()

  const { isLoading: isApprovePayTokenConfirming, isSuccess: isApprovePayTokenSuccess } = useWaitForTransactionReceipt({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    hash: approvePayTokenHash
  })

  const { data: depositHash, isPending: isDepositPending, writeContract: deposit } = useWriteContract()

  const { isLoading: isDepositConfirming, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    hash: depositHash
  })

  const [depositSignHash, { isLoading: isDepositSignHashLoading }] = useDepositSignHashMutation()

  // ** Vars
  const selectedStartDate = getNextFirstDate()
  const selectedApy = initPackageEntity.slots.find(slot => slot.propertyName === 'APY')!.value
  const selectedDurationDays = initPackageEntity.slots.find(slot => slot.propertyName === 'Duration')!.value
  const selectedReferrer = getValidDefiVaultReferrer(searchParams.get('referrer') ?? '')

  const selectedPrincipalDelayDays = initPackageEntity.slots.find(
    slot => slot.propertyName === 'PrincipalDelayDays'
  )!.value

  const totalPriceString = N(initPackageEntity?.priceInUnit ?? 0)
    .mul(depositQuantity)
    .toString()

  const expectedInterestEarning =
    (Number(selectedDurationDays) * (initPackageEntity?.priceInUnit ?? 0) * depositQuantity * Number(selectedApy)) /
    (100 * 365)

  const fundBaseCurrencyProperties = getFundCurrencyProperties(initDVFundEntity.baseCurrency)
  const packageStatusProperties = getPackageStatusProperties(initPackageEntity.status)

  const STEPS = [
    {
      show: true,
      title: 'Select Quantity',
      subtitle: 'Select quantity and check fees',
      checks: {
        checkQuantity: () => {
          return 1 <= depositQuantity && depositQuantity <= 100 && selectedReferrer !== walletAccount.address
        },
        total: () => {
          return STEPS[0].checks!.checkQuantity!()
        }
      }
    },
    {
      show: true,
      title: 'Deposit',
      subtitle: 'Confirm your claim details',
      checks: {
        total: () => {
          return true
        }
      }
    },
    {
      show: false,
      title: 'Deposit Succeed',
      subtitle: 'Check your deposit',
      checks: {
        total: () => {
          return true
        }
      }
    }
  ]

  // ** Logics
  const handleOpenDepositDialog = () => setIsDepositDialogOpen(() => true)
  const handleCloseDepositDialog = () => setIsDepositDialogOpen(() => false)
  const handleCloseTransactionErrorDrawer = () => setTransactionError(() => null)

  const handleClearReferrer = () => {
    const newQuery = Object.assign({}, router.query)

    delete newQuery.referrer

    router.replace({
      query: newQuery
    })
  }

  const handleRefetchMeDepositInfo = () => {
    refetchMeDepositInfo()
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsAddressCopied(() => true)
    setTimeout(() => {
      setIsAddressCopied(() => false)
    }, 2 * 1000)
  }

  const handleDisconnectWallet = async () => {
    await disconnectAsync()
  }

  const checkAllowanceSufficient = (): boolean => {
    if (isPayTokenAllowanceLoading || isPayTokenAllowanceFetching) return true
    const NPayTokenAllowance = typeof payTokenAllowance === 'bigint' ? N(payTokenAllowance) : N(0)

    return N(totalPriceString).mul(N(10).pow(18)).toNumber() <= NPayTokenAllowance.toNumber()
  }

  const handleDeposit = async () => {
    try {
      const formattedAmountString = N(totalPriceString).mul(N(10).pow(18)).toString()

      const { hash } = await depositSignHash({
        packageId: initPackageEntity.id,
        data: {
          contractAddress: initDVFundEntity.vault.contractAddress,
          sender: walletAccount.address!,
          interestRate: Number(selectedApy),
          startTime: getUnixTime(selectedStartDate),
          principalDelayDays: Number(selectedPrincipalDelayDays),
          durationDays: Number(selectedDurationDays)
        }
      }).unwrap()

      deposit(
        {
          chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
          abi: initDVFundEntity.vault.contractAbi,
          address: initDVFundEntity.vault.contractAddress as `0x${string}`,
          functionName: 'deposit',
          args: [
            hash,
            formattedAmountString,
            selectedApy,
            getUnixTime(selectedStartDate),
            selectedPrincipalDelayDays,
            selectedDurationDays,
            selectedReferrer || initDVFundEntity.defaultReferrerAddress
          ],
          account: walletAccount.address!
        },
        {
          onError: error => {
            setTransactionError(() => ({
              from: walletAccount.address!,
              to: initDVFundEntity.vault.contractAddress as `0x${string}`,
              chainInformation: `${initDVFundEntity.chain} (${getChainId(initDVFundEntity.chain)})`,
              message: (error as BaseError)?.shortMessage || 'Failed to deposit'
            }))
          }
        }
      )
    } catch {
      setTransactionError(() => ({
        from: walletAccount.address!,
        to: initDVFundEntity.vault.contractAddress as `0x${string}`,
        chainInformation: `${initDVFundEntity.chain} (${getChainId(initDVFundEntity.chain)})`,
        message: 'Failed to deposit'
      }))
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

  // ** Side Effects
  useAccountEffect({
    onDisconnect() {
      setActiveDepositStep(() => 0)
    }
  })
  useEffect(() => {
    const requiredChainId = getChainId(initDVFundEntity.chain)

    if (walletAccount.chain?.id !== requiredChainId) {
      setActiveDepositStep(() => 0)
    }
  }, [initDVFundEntity.chain, walletAccount.chain?.id])
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
  useEffect(() => {
    if (isDepositSuccess) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        zIndex: 9999
      })
      refetchPayTokenBalance()
      setActiveDepositStep(() => 2)
    }
  }, [isDepositSuccess, refetchPayTokenBalance])

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
                <Typography variant='h6' component='p'>
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

              {initPackageEntity.slots?.length === 0 ? (
                <Typography component='p'>No utilities</Typography>
              ) : (
                <Stack spacing={2} alignSelf='stretch'>
                  {initPackageEntity.slots.map(property => {
                    return (
                      <Stack
                        key={`slot-${property.id}`}
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                          <Icon
                            icon={property.displayType === 'string' ? 'mdi:format-text-variant-outline' : 'mdi:numbers'}
                            fontSize={16}
                          />
                          <Typography variant='subtitle1' component='p'>
                            {property.propertyName}
                          </Typography>
                        </Stack>
                        <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                          {property.displayValue ?? property.value}
                        </Typography>
                      </Stack>
                    )
                  })}
                </Stack>
              )}
            </Stack>

            <Stack sx={{ pt: 8, mt: 'auto' }}>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Button fullWidth variant='contained' size='small' onClick={handleOpenDepositDialog}>
                Deposit
              </Button>
            </Stack>
          </CardContent>
        </Grid>

        <Dialog
          open={isDepositDialogOpen}
          onClose={handleCloseDepositDialog}
          aria-labelledby='deposit'
          aria-describedby='deposit-description'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
        >
          <IconButton
            size='small'
            onClick={handleCloseDepositDialog}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <DialogTitle
            id='deposit'
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem !important',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
            }}
          >
            Deposit
            <DialogContentText id='user-view-edit-description' variant='body2' component='p' textAlign='center'>
              start your defi journey
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
                <StepperWrapper sx={{ position: 'relative' }}>
                  <Stack
                    alignItems='center'
                    justifyContent='center'
                    sx={{ position: 'absolute', width: 'calc(25% - 16px)', height: '24px' }}
                  >
                    <Box sx={{ width: '100%', height: '3px', backgroundColor: theme => theme.palette.primary.main }} />
                  </Stack>
                  <Stack
                    alignItems='center'
                    justifyContent='center'
                    sx={{ position: 'absolute', right: 0, width: 'calc(25% - 16px)', height: '24px' }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '3px',
                        backgroundColor:
                          activeDepositStep === STEPS.length - 1
                            ? theme.palette.primary.main
                            : alpha(theme.palette.primary.main, 0.3)
                      }}
                    />
                  </Stack>
                  <Stepper alternativeLabel activeStep={activeDepositStep}>
                    {STEPS.filter(step => step.show).map((step, index) => (
                      <Step key={`preview-package-deposit-${index}`}>
                        <StepLabel StepIconComponent={PublicFundLivePackageMintStepperDotBox}>{step.title}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </StepperWrapper>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ m: '0 !important' }} />
              </Grid>
              <Grid item xs={12}>
                <AnimatePresence mode='wait'>
                  {/* Check quantity and fee */}
                  {activeDepositStep === 0 && (
                    <motion.div
                      key={`deposit-step-${activeDepositStep}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle1' component='p'>
                              Your wallet
                            </Typography>
                          </Stack>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Stack direction='row' spacing={4} alignItems='center' justifyContent='center'>
                              {renderWalletAvatar(walletAccount.address!)}
                              <Stack alignItems='flex-start' justifyContent='center'>
                                <Stack direction='row' alignItems='center' justifyContent='center'>
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
                              <Button
                                variant='outlined'
                                sx={{ p: 1.5, minWidth: 38 }}
                                color='secondary'
                                onClick={handleDisconnectWallet}
                              >
                                <Icon icon='mdi:link-variant-off' fontSize={20} />
                              </Button>
                            </Stack>
                          </Stack>
                        </Stack>

                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle1' component='p'>
                              Quantity
                            </Typography>
                          </Stack>
                          <Stack
                            direction='row'
                            spacing={4}
                            alignSelf='stretch'
                            alignItems='center'
                            justifyContent='space-around'
                            sx={{ pt: 4 }}
                          >
                            <Stack alignItems='center' justifyContent='center'>
                              <IconButton
                                size='large'
                                color='primary'
                                onClick={() => {
                                  setDepositQuantity(prevDepositQuantity => Math.max(prevDepositQuantity - 1, 1))
                                }}
                              >
                                <Icon icon='mdi:minus-circle-outline' fontSize={36} />
                              </IconButton>
                              <Typography variant='caption' component='p'>
                                Min x1
                              </Typography>
                            </Stack>
                            <Stack alignItems='center' justifyContent='center'>
                              <Typography
                                variant='h5'
                                component='p'
                                textAlign='center'
                                color='primary'
                                sx={{ fontWeight: 600 }}
                              >
                                {`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                  N(initPackageEntity.priceInUnit).mul(depositQuantity).toNumber()
                                )} ${fundBaseCurrencyProperties.currency}`}
                              </Typography>
                              <Typography variant='h6' component='p' color='text.secondary' sx={{ fontWeight: 600 }}>
                                {`x ${depositQuantity}`}
                              </Typography>
                            </Stack>
                            <Stack alignItems='center' justifyContent='center'>
                              <IconButton
                                size='large'
                                color='primary'
                                onClick={() => {
                                  setDepositQuantity(prevDepositQuantity => Math.min(prevDepositQuantity + 1, 50))
                                }}
                              >
                                <Icon icon='mdi:plus-circle-outline' fontSize={36} />
                              </IconButton>
                              <Typography variant='caption' component='p'>
                                Max x50
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>

                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle1' component='p'>
                              Referrer
                            </Typography>
                            {selectedReferrer === walletAccount.address && (
                              <Button
                                variant='outlined'
                                sx={{ p: 1.5, minWidth: 38 }}
                                color='secondary'
                                onClick={handleClearReferrer}
                              >
                                <Icon icon='mdi:remove-circle-outline' fontSize={20} />
                              </Button>
                            )}
                          </Stack>
                          <Stack alignItems='center' justifyContent='center'>
                            <Typography
                              variant='h5'
                              component='p'
                              textAlign='center'
                              color={
                                selectedReferrer === walletAccount.address
                                  ? 'error.main'
                                  : selectedReferrer
                                    ? 'primary'
                                    : 'text.primary'
                              }
                              sx={{ fontWeight: 600 }}
                            >
                              {selectedReferrer === walletAccount.address
                                ? 'Invalid referrer'
                                : selectedReferrer === ''
                                  ? `${themeConfig.templateName} Team`
                                  : getFormattedEthereumAddress(selectedReferrer)}
                            </Typography>
                            {selectedReferrer === walletAccount.address && (
                              <Typography variant='subtitle1' component='p' textAlign='center' color='text.secondary'>
                                Can not refer yourself, please change your wallet or choose another referrer
                              </Typography>
                            )}
                          </Stack>
                        </Stack>

                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle1' component='p'>
                              Information
                            </Typography>
                          </Stack>
                          <Stack alignSelf='stretch' divider={<Divider orientation='horizontal' flexItem />}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                Price per unit
                              </Typography>
                              <Typography
                                variant='subtitle1'
                                component='p'
                              >{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                initPackageEntity.priceInUnit
                              )} ${fundBaseCurrencyProperties.currency}`}</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                Start date
                              </Typography>
                              <Typography variant='subtitle1' component='p'>
                                {format(selectedStartDate, 'PPpp')}
                              </Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                Fees
                              </Typography>
                              <Typography
                                variant='subtitle1'
                                component='p'
                              >{`${initDVFundEntity.performanceFeePercentage} %`}</Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </motion.div>
                  )}

                  {/* Deposit */}
                  {activeDepositStep === 1 && (
                    <motion.div
                      key={`deposit-step-${activeDepositStep}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle1' component='p'>
                              Your wallet
                            </Typography>
                          </Stack>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Stack direction='row' spacing={4} alignItems='center' justifyContent='center'>
                              {renderWalletAvatar(walletAccount.address!)}
                              <Stack alignItems='flex-start' justifyContent='center'>
                                <Stack direction='row' alignItems='center' justifyContent='center'>
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
                              <Button
                                variant='outlined'
                                sx={{ p: 1.5, minWidth: 38 }}
                                color='secondary'
                                onClick={handleDisconnectWallet}
                              >
                                <Icon icon='mdi:link-variant-off' fontSize={20} />
                              </Button>
                            </Stack>
                          </Stack>
                        </Stack>

                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                            <Stack
                              direction='row'
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Typography variant='subtitle1' component='p'>
                                You deposit
                              </Typography>
                            </Stack>
                            <Stack
                              direction='row'
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Typography variant='h6' component='p'>
                                {fundBaseCurrencyProperties.currency}
                              </Typography>
                              <Typography
                                variant='h6'
                                component='p'
                                color='primary'
                              >{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(Number(totalPriceString))}`}</Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            alignSelf='stretch'
                            alignItems='center'
                            justifyContent='center'
                            sx={{ color: 'text.secondary' }}
                          >
                            <Icon icon='mdi:details' fontSize={28} />
                          </Stack>

                          <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                            <Stack
                              direction='row'
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Typography variant='subtitle1' component='p'>
                                You get
                              </Typography>
                            </Stack>
                            <Stack
                              direction='row'
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Typography variant='h6' component='p'>
                                Estimated Earning
                              </Typography>
                              <Typography variant='h6' component='p' color='warning.main' textAlign='right'>
                                {`${100 + (Number(selectedApy) * Number(selectedDurationDays)) / 365} %`}
                              </Typography>
                            </Stack>
                            <Stack
                              direction='row'
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Stack>
                                <Typography variant='h6' component='p'>
                                  Total
                                </Typography>
                                <Typography variant='subtitle2' component='p'>
                                  Principal Back + Interest Earning
                                </Typography>
                              </Stack>
                              <Stack alignItems='flex-end' justifyContent='center'>
                                <Typography
                                  variant='h6'
                                  component='p'
                                  color='info.main'
                                >{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(Number(totalPriceString) + expectedInterestEarning)}`}</Typography>
                                <Typography variant='subtitle2' component='p' textAlign='right'>
                                  {`($${getFormattedPriceUnit(Number(totalPriceString))} + $${getFormattedPriceUnit(expectedInterestEarning)})`}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>

                          <Stack
                            alignSelf='stretch'
                            alignItems='center'
                            justifyContent='center'
                            sx={{ color: 'text.secondary' }}
                          >
                            <Icon icon='mdi:details' fontSize={28} />
                          </Stack>

                          <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                            <Stack
                              direction='row'
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Typography variant='subtitle1' component='p'>
                                Your claim details
                              </Typography>
                            </Stack>
                            <Stack alignSelf='stretch'>
                              <ApexChartWrapper>
                                <PublicFundDefiVaultPackageDepositRevenueChart
                                  startDate={selectedStartDate}
                                  amount={Number(totalPriceString)}
                                  interestRate={Number(selectedApy)}
                                  duration={Number(selectedDurationDays)}
                                  principalDelayInDays={Number(selectedPrincipalDelayDays)}
                                />
                              </ApexChartWrapper>
                            </Stack>
                          </Stack>
                        </Stack>

                        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle1' component='p'>
                              Information
                            </Typography>
                          </Stack>
                          <Stack alignSelf='stretch' divider={<Divider orientation='horizontal' flexItem />}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                Start Earning Date
                              </Typography>
                              <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                <Typography variant='subtitle1' component='p' textAlign='right'>
                                  {format(selectedStartDate, 'PPpp')}
                                </Typography>
                              </Stack>
                            </Stack>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                Estimated APY
                              </Typography>
                              <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                <Typography variant='subtitle1' component='p' textAlign='right'>
                                  {`${selectedApy} %`}
                                </Typography>
                              </Stack>
                            </Stack>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                Duration
                              </Typography>
                              <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                <Typography variant='subtitle1' component='p' textAlign='right'>
                                  {`${selectedDurationDays} Days`}
                                </Typography>
                              </Stack>
                            </Stack>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                Principal Delay
                              </Typography>
                              <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                <Typography variant='subtitle1' component='p' textAlign='right'>
                                  {`${selectedPrincipalDelayDays} Days`}
                                </Typography>
                              </Stack>
                            </Stack>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                {`Your ${initDVFundEntity.baseCurrency} Balance`}
                              </Typography>
                              {isPayTokenBalanceLoading || isPayTokenBalanceFetching ? (
                                <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                  <Skeleton variant='text' width={120} />
                                  <Skeleton variant='circular' width={28} height={28} />
                                </Stack>
                              ) : (
                                <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                  <Typography variant='subtitle1' component='p' textAlign='right'>
                                    {`${fundBaseCurrencyProperties.symbol} ${
                                      typeof payTokenBalance === 'bigint'
                                        ? getFormattedPriceUnit(N(payTokenBalance).div(N(10).pow(18)).toNumber())
                                        : 0n
                                    } ${fundBaseCurrencyProperties.currency}`}
                                  </Typography>
                                  <IconButton size='small' onClick={() => refetchPayTokenBalance()}>
                                    <Icon icon='mdi:reload' fontSize={16} />
                                  </IconButton>
                                </Stack>
                              )}
                            </Stack>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                {`Your ${initDVFundEntity.baseCurrency} Allowance`}
                              </Typography>
                              <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                {!checkAllowanceSufficient() && (
                                  <Tooltip title='Allowance Insufficient' placement='top' arrow>
                                    <IconButton size='small' color='warning'>
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
                                    <Typography variant='subtitle1' component='p' textAlign='right'>
                                      {`${fundBaseCurrencyProperties.symbol} ${
                                        typeof payTokenAllowance === 'bigint'
                                          ? getFormattedPriceUnit(
                                              N(payTokenAllowance ?? 0)
                                                .div(N(10).pow(18))
                                                .toNumber()
                                            )
                                          : 0
                                      } ${fundBaseCurrencyProperties.currency}`}
                                    </Typography>
                                    <IconButton size='small' onClick={() => refetchPayTokenAllowance()}>
                                      <Icon icon='mdi:reload' fontSize={16} />
                                    </IconButton>
                                  </Stack>
                                )}
                              </Stack>
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
                                const formattedApproveValueString = N(totalPriceString).mul(N(10).pow(18)).toString()

                                approvePayToken(
                                  {
                                    chainId: getChainId(
                                      initDVFundEntity.chain
                                    ) as (typeof wagmiConfig)['chains'][number]['id'],
                                    abi: getBaseCurrencyABI(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
                                    address: getBaseCurrencyAddress(
                                      initDVFundEntity.chain,
                                      initDVFundEntity.baseCurrency
                                    ),
                                    functionName: 'approve',
                                    args: [initDVFundEntity.vault.contractAddress, formattedApproveValueString],
                                    account: walletAccount.address!
                                  },
                                  {
                                    onError: error => {
                                      setTransactionError(() => ({
                                        from: walletAccount.address!,
                                        to: initDVFundEntity.vault.contractAddress as `0x${string}`,
                                        chainInformation: `${initDVFundEntity.chain} (${getChainId(initDVFundEntity.chain)})`,
                                        message: (error as BaseError)?.shortMessage || 'Failed to approve'
                                      }))
                                    }
                                  }
                                )
                              }}
                            >
                              <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                                <Icon icon='mdi:approve' fontSize={16} />
                                {`Approve ${fundBaseCurrencyProperties.currency}`}
                              </Stack>
                            </LoadingButton>
                          )}
                          <LoadingButton
                            fullWidth
                            loading={isDepositSignHashLoading || isDepositPending || isDepositConfirming}
                            variant='contained'
                            disabled={!checkAllowanceSufficient()}
                            onClick={handleDeposit}
                          >
                            <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                              <Icon icon='mdi:hammer' fontSize={16} />
                              Deposit
                            </Stack>
                          </LoadingButton>
                          <Typography variant='caption' component='p' textAlign='center'>
                            please do not leave the page until the transaction is confirmed
                          </Typography>
                        </Stack>
                      </Stack>
                    </motion.div>
                  )}

                  {/* Deposit Succeed */}
                  {activeDepositStep === 2 && (
                    <motion.div
                      key={`deposit-step-${activeDepositStep}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ py: 6 }}>
                        <CustomAvatar skin='light' sx={{ width: 56, height: 56 }}>
                          <Icon icon='mdi:check-decagram-outline' fontSize='2rem' />
                        </CustomAvatar>
                        <Typography variant='body2' component='p'>
                          Deposit Successfully, check your new balance
                        </Typography>
                        <Button variant='contained' size='medium' onClick={handleRefetchMeDepositInfo}>
                          Check deposit
                        </Button>
                      </Stack>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                disabled={activeDepositStep === 0}
                onClick={() => {
                  setActiveDepositStep(prev => Math.max(prev - 1, 0))
                }}
              >
                Back
              </Button>
              <Button
                variant='contained'
                disabled={activeDepositStep >= 1 || !STEPS[activeDepositStep].checks?.total()}
                onClick={() => {
                  setActiveDepositStep(prev => Math.min(prev + 1, 1))
                }}
              >
                Next
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </Grid>

      <PublicFundLiveTransactionErrorDrawer
        transactionError={transactionError}
        onClose={handleCloseTransactionErrorDrawer}
      />
    </Card>
  )
}

export default PublicFundDefiVaultPackageCard
