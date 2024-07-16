// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'
import Link from 'next/link'

// ** MUI Imports
import { styled, useTheme, alpha } from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Fade from '@mui/material/Fade'
import LinearProgress from '@mui/material/LinearProgress'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import { useAccount, useAccountEffect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'
import { Atropos } from 'atropos/react'
import { motion, AnimatePresence } from 'framer-motion'
import Countdown from 'react-countdown'
import format from 'date-fns/format'
import isAfter from 'date-fns/isAfter'
import confetti from 'canvas-confetti'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Custom Component Imports
import PublicFundLiveSFTClaimStepperDotBox from 'src/views/fund/live/boxes/PublicFundLiveSFTClaimStepperDotBox'
import PublicFundLiveStakedSFTSkeletonCard from 'src/views/fund/live/cards/staked-sft/PublicFundLiveStakedSFTSkeletonCard'
import PublicFundLiveTransactionErrorDrawer from 'src/views/fund/live/drawers/PublicFundLiveTransactionErrorDrawer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import {
  getFundCurrencyProperties,
  getFormattedPriceUnit,
  getChainId,
  getFormattedEthereumAddress,
  getGradientColors
} from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { BaseError } from 'wagmi'
import type { FundType } from 'src/types/fundTypes'
import type { StackProps } from '@mui/material/Stack'

// ** Styled <sup> Component
const Sup = styled('sup')(({ theme }) => ({
  fontSize: '1.2rem',
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

const StyledClaimMethodSelectStack = styled(Stack)<StackProps>(({ theme }) => ({
  borderRadius: '5px',
  padding: theme.spacing(6, 8),
  transition: 'border-color 0.2s'
}))

type ClaimMethodType = {
  img: string
  type: 'Claim Only' | 'Claim and Unstake'
  title: string
  subtitle: string
}

type StakeRecordType = [string, bigint, bigint, number, number, bigint]
type TransactionErrorType = {
  from: string
  to: string
  chainInformation: string
  message: string
}
interface Props {
  initFundEntity: FundType
  sftIndex: number
}

const PublicFundLiveStakedSFTCard = (props: Props) => {
  // ** Props
  const { initFundEntity, sftIndex } = props

  // ** States
  const [isUnstakeSFTDialogOpen, setIsUnstakeSFTDialogOpen] = useState<boolean>(false)
  const [activeClaimStep, setActiveClaimStep] = useState<number>(0)
  const [transactionError, setTransactionError] = useState<TransactionErrorType | null>(null)

  const [selectedClaimMethod, setSelectedClaimMethod] = useState<ClaimMethodType>({
    img: '/images/vault/claim-only.png',
    type: 'Claim Only',
    title: 'Claim Only',
    subtitle: 'receive rewards only'
  })

  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const walletAccount = useAccount()

  const { data: sftId, isLoading: isSftIdLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.sft.contractAbi,
    address: initFundEntity.sft.contractAddress as `0x${string}`,
    functionName: 'tokenOfOwnerByIndex',
    args: [initFundEntity.vault.contractAddress, sftIndex],
    account: walletAccount.address!
  })

  const { data: sftValue, isLoading: isSftValueLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.sft.contractAbi,
    address: initFundEntity.sft.contractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [sftId],
    account: walletAccount.address!,
    query: {
      enabled: !isSftIdLoading && sftId !== undefined,
      placeholderData: 0n
    }
  })

  const { data: sftSlotId, isLoading: isSftSlotIdLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.sft.contractAbi,
    address: initFundEntity.sft.contractAddress as `0x${string}`,
    functionName: 'slotOf',
    args: [sftId],
    account: walletAccount.address!,
    query: {
      enabled: !isSftIdLoading && sftId !== undefined,
      placeholderData: 0n
    }
  })

  const { refetch: refetchSftBalance } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.sft.contractAbi,
    address: initFundEntity.sft.contractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: false
    }
  })

  const { refetch: refetchOwnedStakedSFTBalance } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: false
    }
  })

  const { refetch: refetchVaultTotalStaked } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'totalStaked',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: false
    }
  })

  const { data: vaultStakeRecord, isLoading: isVaultStakeRecordLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'stakeRecord',
    args: [sftId],
    account: walletAccount.address!,
    query: {
      enabled: !isSftIdLoading && sftId !== undefined
    }
  })

  const {
    data: vaultStakedEarningInfo,
    refetch: refetchVaultStakedEarningInfo,
    isLoading: isVaultStakedEarningInfoLoading,
    isFetching: isVaultStakedEarningInfoFetching
  } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'earningInfo',
    args: [sftId],
    account: walletAccount.address!,
    query: {
      enabled: !isSftIdLoading && sftId !== undefined
    }
  })

  const { data: unstakeSftHash, isPending: isUnstakeSftPending, writeContract: unstakeSft } = useWriteContract()

  const { isLoading: isUnstakeSftConfirming, isSuccess: isUnstakeSftSuccess } = useWaitForTransactionReceipt({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    hash: unstakeSftHash
  })

  // ** Vars
  const sftSlot = initFundEntity.defaultPackages?.data.find(
    pkg => Number(pkg.attributes.packageId) === Number(sftSlotId)
  )

  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const isInStakeLockPeriod = vaultStakeRecord
    ? isAfter(new Date((vaultStakeRecord as StakeRecordType)[4] * 1_000), new Date())
    : false

  const isInPenalty = selectedClaimMethod.type === 'Claim and Unstake' && isInStakeLockPeriod

  const stakeRecordStartDate = vaultStakeRecord
    ? format(new Date((vaultStakeRecord as StakeRecordType)[3] * 1_000), 'PPp')
    : '-'

  const stakeRecordUnlockDate = vaultStakeRecord
    ? format(new Date((vaultStakeRecord as StakeRecordType)[4] * 1_000), 'PPp')
    : '-'

  const stakeRecordFullRewards = vaultStakeRecord ? (vaultStakeRecord as StakeRecordType)[5] : 0n

  const STEPS = [
    {
      show: true,
      title: 'Select Claim Method',
      subtitle: 'Select method and check rewards',
      checks: {
        checkQuantity: () => {
          return true
        },
        total: () => {
          return STEPS[0].checks!.checkQuantity!()
        }
      }
    },
    {
      show: true,
      title: 'Claim',
      subtitle: 'Confirm and claim rewards',
      checks: {
        total: () => {
          return true
        }
      }
    },
    {
      show: false,
      title: 'Claim Succeed',
      subtitle: 'Check your sft',
      checks: {
        total: () => {
          return true
        }
      }
    }
  ]

  const CLAIM_METHOD_INFORMATION: ClaimMethodType[] = [
    {
      img: '/images/vault/claim-only.png',
      type: 'Claim Only',
      title: 'Claim Only',
      subtitle: 'receive rewards only'
    },
    {
      img: '/images/vault/claim-and-unstake.png',
      type: 'Claim and Unstake',
      title: 'Claim & Unstake',
      subtitle: 'receive rewards and SFT'
    }
  ]

  // ** Logics
  const handleOpenUnstakeSFTDialog = () => setIsUnstakeSFTDialogOpen(() => true)
  const handleCloseUnstakeSFTDialog = () => setIsUnstakeSFTDialogOpen(() => false)
  const handleCloseTransactionErrorDrawer = () => setTransactionError(() => null)

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsAddressCopied(() => true)
    setTimeout(() => {
      setIsAddressCopied(() => false)
    }, 2 * 1000)
  }

  const getRewardsProperties = () => {
    if (typeof vaultStakedEarningInfo === 'bigint') {
      const startTimestamp = vaultStakeRecord ? (vaultStakeRecord as StakeRecordType)[3] * 1_000 : 0
      const endTimestamp = vaultStakeRecord ? (vaultStakeRecord as StakeRecordType)[4] * 1_000 : 0
      const nowTimestamp = Date.now()

      const percentage = Math.min(
        Math.round(((nowTimestamp - startTimestamp) / (endTimestamp - startTimestamp)) * 100),
        100
      )

      if (isInPenalty) {
        return {
          percentage: percentage / 2,
          formattedNumber: getFormattedPriceUnit(N(vaultStakedEarningInfo).div(N(2)).div(N(10).pow(18)).toNumber())
        }
      } else {
        return {
          percentage,
          formattedNumber: getFormattedPriceUnit(N(vaultStakedEarningInfo).div(N(10).pow(18)).toNumber())
        }
      }
    } else {
      return {
        percentage: 0,
        formattedNumber: '0'
      }
    }
  }

  const handleClaim = async () => {
    if (typeof sftId === 'bigint') {
      const tokenId = sftId.toString()

      unstakeSft(
        {
          chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
          abi: initFundEntity.vault.contractAbi,
          address: initFundEntity.vault.contractAddress as `0x${string}`,
          functionName: selectedClaimMethod.type === 'Claim Only' ? 'claim' : 'unstake',
          args: [[tokenId]],
          account: walletAccount.address!
        },
        {
          onError: error => {
            setTransactionError(() => ({
              from: walletAccount.address!,
              to: initFundEntity.sft.contractAddress as `0x${string}`,
              chainInformation: `${initFundEntity.chain} (${getChainId(initFundEntity.chain)})`,
              message: (error as BaseError)?.shortMessage || 'Failed to mint'
            }))
          }
        }
      )
    } else {
      setTransactionError(() => ({
        from: walletAccount.address!,
        to: initFundEntity.sft.contractAddress as `0x${string}`,
        chainInformation: `${initFundEntity.chain} (${getChainId(initFundEntity.chain)})`,
        message: 'Failed to get SFT ID'
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
      setActiveClaimStep(() => 0)
    }
  })
  useEffect(() => {
    if (isUnstakeSftSuccess) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.8 },
        zIndex: 9999
      })
      refetchSftBalance()
      refetchOwnedStakedSFTBalance()
      refetchVaultTotalStaked()
      setIsUnstakeSFTDialogOpen(() => false)
    }
  }, [isUnstakeSftSuccess, refetchSftBalance, refetchOwnedStakedSFTBalance, refetchVaultTotalStaked])

  if (isSftIdLoading || isSftValueLoading || isSftSlotIdLoading) {
    return <PublicFundLiveStakedSFTSkeletonCard />
  }

  return (
    <Card>
      <CardContent sx={{ height: '100%' }}>
        <Stack
          spacing={4}
          alignItems='center'
          justifyContent='flex-start'
          sx={{ position: 'relative', height: '100%' }}
        >
          <Box sx={{ position: 'absolute', top: 0, right: 8 }}>
            <CustomChip
              skin='light'
              size='medium'
              label={`# ${sftId ?? '-'}`}
              color='success'
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
          <Box
            sx={{
              minHeight: theme => theme.spacing(64),
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
                alt={sftSlot?.attributes.displayName ?? 'SFT Slot'}
                src={`/images/funds/packages/card-skin/${sftSlot?.attributes.skin.toLowerCase()}-${
                  theme.palette.mode
                }.webp`}
              />
            </Atropos>
          </Box>
          <Stack spacing={4} flex='1' alignSelf='stretch'>
            <Stack direction='row' spacing={4} justifyContent='space-between'>
              <Typography variant='h5' component='p'>
                {sftSlot?.attributes.displayName}
              </Typography>
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
                  {typeof sftValue === 'bigint' ? getFormattedPriceUnit(N(sftValue).div(N(10).pow(18)).toNumber()) : 0n}
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Typography variant='body2'>{sftSlot?.attributes.description || 'No description'}</Typography>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Stack spacing={2} flex='1' justifyContent='flex-start'>
              <Typography variant='subtitle2' component='p'>
                Utility
              </Typography>

              <Stack spacing={2} alignSelf='stretch'>
                {sftSlot?.attributes.slots.map(property => {
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
            </Stack>
            <Stack spacing={2} justifyContent='center'>
              <Typography variant='subtitle2' component='p'>
                Stake Information
              </Typography>

              <Stack spacing={2} alignSelf='stretch'>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='subtitle1' component='p'>
                    Stake Start Date
                  </Typography>
                  {isVaultStakeRecordLoading ? (
                    <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                      <Skeleton variant='text' width={120} />
                    </Stack>
                  ) : (
                    <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                      {stakeRecordStartDate}
                    </Typography>
                  )}
                </Stack>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='subtitle1' component='p'>
                    Stake Unlock Date
                  </Typography>
                  {isVaultStakeRecordLoading ? (
                    <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                      <Skeleton variant='text' width={120} />
                    </Stack>
                  ) : (
                    <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                      {stakeRecordUnlockDate}
                    </Typography>
                  )}
                </Stack>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='subtitle1' component='p'>
                    Earned
                  </Typography>
                  <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                    {isVaultStakedEarningInfoLoading || isVaultStakedEarningInfoFetching ? (
                      <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                        <Skeleton variant='text' width={120} />
                        <Skeleton variant='circular' width={28} height={28} />
                      </Stack>
                    ) : (
                      <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                        <Typography
                          variant='subtitle1'
                          component='p'
                          sx={{ fontWeight: 600 }}
                        >{`≈ ${fundBaseCurrencyProperties.symbol} ${
                          typeof vaultStakedEarningInfo === 'bigint'
                            ? getFormattedPriceUnit(N(vaultStakedEarningInfo).div(N(10).pow(18)).toNumber())
                            : 0n
                        } ${fundBaseCurrencyProperties.currency}`}</Typography>
                        <IconButton size='small' onClick={() => refetchVaultStakedEarningInfo()}>
                          <Icon icon='mdi:reload' fontSize={16} />
                        </IconButton>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={2} sx={{ mt: 'auto' }}>
              <Divider />
              <Button disabled fullWidth variant='contained'>
                Extend
              </Button>
              <Button fullWidth variant='contained' onClick={handleOpenUnstakeSFTDialog}>
                Claim
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>

      <Dialog
        open={isUnstakeSFTDialogOpen}
        onClose={handleCloseUnstakeSFTDialog}
        aria-labelledby='unstake-view'
        aria-describedby='unstake-view-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
      >
        <IconButton
          size='small'
          onClick={handleCloseUnstakeSFTDialog}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>

        <DialogTitle
          id='unstake-view'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          {`Claim #${sftId}`}
          <DialogContentText id='unstake-view-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            There will be penalties for unstaking early
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
          <Grid container spacing={6}>
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
                        activeClaimStep === STEPS.length - 1
                          ? theme.palette.primary.main
                          : alpha(theme.palette.primary.main, 0.3)
                    }}
                  />
                </Stack>
                <Stepper alternativeLabel activeStep={activeClaimStep}>
                  {STEPS.filter(step => step.show).map((step, index) => (
                    <Step key={`public-sft-claim-${index}`}>
                      <StepLabel StepIconComponent={PublicFundLiveSFTClaimStepperDotBox}>{step.title}</StepLabel>
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
                {/* Check claim method and rewards */}
                {activeClaimStep === 0 && (
                  <motion.div
                    key={`claim-step-${activeClaimStep}`}
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
                                  <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={16} />
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
                              component={Link}
                              href='/account'
                            >
                              <Icon icon='mdi:verified-user' fontSize={20} />
                            </Button>
                          </Stack>
                        </Stack>
                      </Stack>

                      <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                          <Typography variant='subtitle1' component='p'>
                            Method
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignSelf='stretch' sx={{ pt: 4 }}>
                          <Grid container spacing={4} alignItems='center' justifyContent='space-between'>
                            {CLAIM_METHOD_INFORMATION.map(claimMethodInfo => {
                              const { img, type, title, subtitle } = claimMethodInfo

                              return (
                                <Grid key={`claim-method-${type}`} item xs={12} sm={6}>
                                  <StyledClaimMethodSelectStack
                                    spacing={2}
                                    alignSelf='stretch'
                                    alignItems='center'
                                    onClick={() => setSelectedClaimMethod(claimMethodInfo)}
                                    sx={{
                                      flexBasis: '50%',
                                      border: theme =>
                                        `1px ${selectedClaimMethod.type === type ? theme.palette.primary.main : theme.palette.divider} solid`,
                                      '&:hover': {
                                        cursor: 'pointer',
                                        borderColor: theme => theme.palette.primary.main
                                      }
                                    }}
                                  >
                                    <Box>
                                      <Image width={60} height={50} src={img} alt={title} />
                                    </Box>
                                    <Typography variant='h6' textAlign='center' noWrap>
                                      {title}
                                    </Typography>
                                    <Typography variant='body2' component='p' textAlign='center' noWrap>
                                      {subtitle}
                                    </Typography>
                                  </StyledClaimMethodSelectStack>
                                </Grid>
                              )
                            })}
                          </Grid>
                        </Stack>
                      </Stack>

                      <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                          <Typography variant='subtitle1' component='p'>
                            Rewards
                          </Typography>
                        </Stack>
                        <Stack
                          spacing={4}
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='space-around'
                          sx={{ pt: 4 }}
                        >
                          <Stack alignItems='center' justifyContent='center'>
                            {isVaultStakedEarningInfoLoading || isVaultStakedEarningInfoFetching ? (
                              <Skeleton variant='text' width={120} />
                            ) : (
                              <Typography variant='h4' component='p' sx={{ fontWeight: 600 }}>
                                {`≈ ${fundBaseCurrencyProperties.symbol} ${getRewardsProperties().formattedNumber} ${fundBaseCurrencyProperties.currency}`}
                              </Typography>
                            )}
                            <Typography variant='h6' component='p' color='text.secondary' sx={{ fontWeight: 600 }}>
                              {`(${
                                typeof vaultStakedEarningInfo === 'bigint'
                                  ? getFormattedPriceUnit(N(vaultStakedEarningInfo).toNumber())
                                  : 0n
                              })`}
                            </Typography>
                          </Stack>

                          <Stack spacing={2} alignSelf='stretch' alignItems='center'>
                            <Stack
                              direction='row'
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
                                {`${getRewardsProperties().percentage}%`}
                              </Typography>
                              <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
                                progress
                              </Typography>
                            </Stack>
                            <LinearProgress
                              value={getRewardsProperties().percentage}
                              color={isInPenalty ? 'warning' : 'success'}
                              variant='determinate'
                              sx={{ width: '100%' }}
                            />
                          </Stack>

                          {isInPenalty && (
                            <Alert severity='warning'>
                              <Typography variant='body2' component='p'>
                                Currently, you are in the lock period. You will be penalized 50% if you unstake now.
                              </Typography>
                            </Alert>
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
                          {isInPenalty && (
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                              <Typography variant='subtitle2' component='p'>
                                Early Unstake Penalty
                              </Typography>
                              <Typography
                                variant='subtitle1'
                                component='p'
                                color='warning.main'
                                sx={{ fontWeight: 600 }}
                              >
                                - 50%
                              </Typography>
                            </Stack>
                          )}
                          <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle2' component='p'>
                              Full Rewards
                            </Typography>
                            <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                              {`≈ ${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                                N(stakeRecordFullRewards).div(N(10).pow(18)).toNumber()
                              )} ${fundBaseCurrencyProperties.currency}`}
                            </Typography>
                          </Stack>
                          <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Stack alignItems='flex-start' justifyContent='center'>
                              <Typography variant='subtitle2' component='p'>
                                Unlock Date
                              </Typography>
                              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                progress
                              </Typography>
                            </Stack>
                            <Stack alignItems='flex-end' justifyContent='center'>
                              <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                                {stakeRecordUnlockDate}
                              </Typography>
                              <Countdown
                                date={stakeRecordUnlockDate}
                                renderer={({ days, hours, minutes, seconds, completed }) => {
                                  if (completed) {
                                    return null
                                  }

                                  return (
                                    <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 600 }}>
                                      {`${days} ${days > 1 ? 'days' : 'day'} ${hours}:${minutes}:${seconds} left`}
                                    </Typography>
                                  )
                                }}
                              />
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </motion.div>
                )}

                {/* Claim rewards */}
                {activeClaimStep === 1 && (
                  <motion.div
                    key={`claim-step-${activeClaimStep}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
                      {isInPenalty && (
                        <Alert severity='warning'>
                          <Typography variant='body2' component='p'>
                            You will be penalized 50% if you unstake now.
                          </Typography>
                        </Alert>
                      )}

                      <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                          <Typography variant='subtitle1' component='p'>
                            You Get
                          </Typography>
                        </Stack>
                        <Stack
                          spacing={2}
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='space-between'
                          divider={<Icon icon='mdi:plus-circle-outline' />}
                        >
                          {selectedClaimMethod.type === 'Claim and Unstake' && (
                            <Stack
                              direction='row'
                              alignSelf='stretch'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Stack direction='row' spacing={4} alignItems='center' justifyContent='center'>
                                <Image
                                  width={48}
                                  height={60}
                                  draggable={false}
                                  alt={sftSlot?.attributes.displayName ?? `SFT #${sftId}`}
                                  src={`/images/funds/packages/card-skin/${sftSlot?.attributes.skin.toLowerCase()}-${
                                    theme.palette.mode
                                  }.webp`}
                                />
                                <Typography variant='h6' component='p'>
                                  {`SFT #${sftId}`}
                                </Typography>
                              </Stack>

                              <Typography variant='h6' component='p'>{`${fundBaseCurrencyProperties.symbol} ${
                                typeof sftValue === 'bigint'
                                  ? getFormattedPriceUnit(N(sftValue).div(N(10).pow(18)).toNumber())
                                  : 0n
                              } ${fundBaseCurrencyProperties.currency}`}</Typography>
                            </Stack>
                          )}
                          <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                            <Typography variant='h6' component='p'>
                              {fundBaseCurrencyProperties.currency}
                            </Typography>
                            <Typography variant='h6' component='p'>
                              {`${fundBaseCurrencyProperties.symbol} ${getRewardsProperties().formattedNumber} ${fundBaseCurrencyProperties.currency}`}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>

                      <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                          <Typography variant='subtitle1' component='p'>
                            Information
                          </Typography>
                        </Stack>
                        <Stack spacing={2} alignSelf='stretch' divider={<Divider orientation='horizontal' flexItem />}>
                          <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle2' component='p'>
                              Token ID
                            </Typography>
                            <Typography variant='subtitle1' component='p'>{`# ${sftId ?? '-'}`}</Typography>
                          </Stack>
                          <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='subtitle2' component='p'>
                              Earned
                            </Typography>
                            <Stack alignItems='flex-end' justifyContent='center'>
                              <Typography variant='subtitle1' component='p'>{`≈ ${fundBaseCurrencyProperties.symbol} ${
                                typeof vaultStakedEarningInfo === 'bigint'
                                  ? getFormattedPriceUnit(N(vaultStakedEarningInfo).div(N(10).pow(18)).toNumber())
                                  : 0n
                              } ${fundBaseCurrencyProperties.currency}`}</Typography>
                              <Typography variant='subtitle1' component='p'>{`(${
                                typeof vaultStakedEarningInfo === 'bigint'
                                  ? getFormattedPriceUnit(N(vaultStakedEarningInfo).toNumber())
                                  : 0n
                              })`}</Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>

                      <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                        <LoadingButton
                          fullWidth
                          loading={isUnstakeSftPending || isUnstakeSftConfirming}
                          variant='contained'
                          onClick={handleClaim}
                        >
                          <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                            <Icon icon='mdi:hammer' fontSize={16} />
                            {selectedClaimMethod.title}
                          </Stack>
                        </LoadingButton>
                      </Stack>
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
              disabled={activeClaimStep === 0}
              onClick={() => {
                setActiveClaimStep(prev => Math.max(prev - 1, 0))
              }}
            >
              Back
            </Button>
            <Button
              variant='contained'
              disabled={activeClaimStep >= 1 || !STEPS[activeClaimStep].checks?.total()}
              onClick={() => {
                setActiveClaimStep(prev => Math.min(prev + 1, 1))
              }}
            >
              Next
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      <PublicFundLiveTransactionErrorDrawer
        transactionError={transactionError}
        onClose={handleCloseTransactionErrorDrawer}
      />
    </Card>
  )
}

export default PublicFundLiveStakedSFTCard
