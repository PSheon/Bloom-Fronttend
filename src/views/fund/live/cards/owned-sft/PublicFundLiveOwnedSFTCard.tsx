// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'
import Link from 'next/link'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'
import { Atropos } from 'atropos/react'
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import confetti from 'canvas-confetti'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import PublicFundLiveOwnedSFTSkeletonCard from 'src/views/fund/live/cards/owned-sft/PublicFundLiveOwnedSFTSkeletonCard'
import PublicFundLiveTransactionErrorDrawer from 'src/views/fund/live/drawers/PublicFundLiveTransactionErrorDrawer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** API Imports
import { useFindMeOneQuery } from 'src/store/api/management/user'
import { useVaultSignHashMutation } from 'src/store/api/management/fund'

// ** Util Imports
import {
  getFundCurrencyProperties,
  getFormattedPriceUnit,
  getChainId,
  getFormattedEthereumAddress,
  getExpectInterestBalanceString,
  getGradientColors,
  getLevelProperties
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

const StyledPeriodDateSelectStack = styled(Stack)<StackProps>(({ theme }) => ({
  borderRadius: '5px',
  padding: theme.spacing(6, 8),
  transition: 'border-color 0.2s'
}))

type StakePeriodType = {
  img: string
  periodInDays: number
  bonusAPY: number
}

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

const PublicFundLiveOwnedSFTCard = (props: Props) => {
  // ** Props
  const { initFundEntity, sftIndex } = props

  // ** States
  const [isStakeSFTDialogOpen, setIsStakeSFTDialogOpen] = useState<boolean>(false)
  const [transactionError, setTransactionError] = useState<TransactionErrorType | null>(null)

  const [selectedStakePeriod, setSelectedStakePeriod] = useState<StakePeriodType>({
    img: '/images/vault/stake-7-days.png',
    periodInDays: 7,
    bonusAPY: 0
  })

  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const bgColors = useBgColor()
  const walletAccount = useAccount()

  const { data: meUserData } = useFindMeOneQuery(null)

  const { data: sftId, isLoading: isSftIdLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.sft.contractAbi,
    address: initFundEntity.sft.contractAddress as `0x${string}`,
    functionName: 'tokenOfOwnerByIndex',
    args: [walletAccount.address!, sftIndex],
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

  const {
    data: sftApproved,
    refetch: refetchSftApproved,
    isLoading: isSftApprovedLoading,
    isFetching: isSftApprovedFetching
  } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.sft.contractAbi,
    address: initFundEntity.sft.contractAddress as `0x${string}`,
    functionName: 'getApproved',
    args: [sftId],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected' && sftId !== undefined
    }
  })

  const { data: approveSftHash, isPending: isApproveSftPending, writeContract: approveSft } = useWriteContract()

  const { isLoading: isApproveSftConfirming, isSuccess: isApproveSftSuccess } = useWaitForTransactionReceipt({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    hash: approveSftHash
  })

  const { data: stakeSftHash, isPending: isStakeSftPending, writeContract: stakeSft } = useWriteContract()

  const { isLoading: isStakeSftConfirming, isSuccess: isStakeSftSuccess } = useWaitForTransactionReceipt({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    hash: stakeSftHash
  })

  const [signHash, { isLoading: isSignHashLoading }] = useVaultSignHashMutation()

  // ** Vars
  const meExp = meUserData?.exp ?? 0
  const meLevelProperties = getLevelProperties(meExp)
  const meLevelAPYPrivileges = meLevelProperties.privileges.find(privilege => privilege.title === 'APY Boost')

  const sftSlot = initFundEntity.defaultPackages?.data.find(
    pkg => Number(pkg.attributes.packageId) === Number(sftSlotId)
  )

  const sftSlotBaseAPY = parseFloat(
    sftSlot?.attributes.slots.find(property => property.propertyName === 'APY')?.value ?? '0'
  )

  const sftSlotMinimumStakingPeriod = parseInt(
    sftSlot?.attributes.slots.find(property => property.propertyName === 'MinimumStakingPeriod')?.value ?? '0',
    10
  )

  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const totalAPY =
    Math.round(((meLevelAPYPrivileges?.value ?? 0) + sftSlotBaseAPY + selectedStakePeriod.bonusAPY) * 1_000) / 1_000

  const STEPS = [
    {
      show: true,
      title: 'Select Stake Period',
      subtitle: 'Select period and check APY',
      checks: {
        checkQuantity: () => {
          return (
            selectedStakePeriod.periodInDays >= sftSlotMinimumStakingPeriod &&
            (selectedStakePeriod.periodInDays === 7 ||
              selectedStakePeriod.periodInDays === 30 ||
              selectedStakePeriod.periodInDays === 60)
          )
        },
        total: () => {
          return STEPS[0].checks!.checkQuantity!()
        }
      }
    },
    {
      show: true,
      title: 'Stake',
      subtitle: 'Confirm and stake SFT',
      checks: {
        total: () => {
          return true
        }
      }
    },
    {
      show: false,
      title: 'Stake Succeed',
      subtitle: 'Check your sft',
      checks: {
        total: () => {
          return true
        }
      }
    }
  ]

  const STAKE_PERIOD_INFORMATION: StakePeriodType[] = [
    {
      img: '/images/vault/stake-7-days.png',
      periodInDays: 7,
      bonusAPY: 0
    },
    {
      img: '/images/vault/stake-30-days.png',
      periodInDays: 30,
      bonusAPY: 0.8
    },
    {
      img: '/images/vault/stake-60-days.png',
      periodInDays: 60,
      bonusAPY: 2.4
    }
  ]

  // ** Logics
  const handleOpenStakeSFTDialog = () => setIsStakeSFTDialogOpen(() => true)
  const handleCloseStakeSFTDialog = () => setIsStakeSFTDialogOpen(() => false)
  const handleCloseTransactionErrorDrawer = () => setTransactionError(() => null)

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsAddressCopied(() => true)
    setTimeout(() => {
      setIsAddressCopied(() => false)
    }, 2 * 1000)
  }

  const checkAllowanceSufficient = (): boolean => {
    if (isSftApprovedLoading || isSftApprovedFetching) return true

    return sftApproved === initFundEntity.vault.contractAddress
  }

  const handleStake = async () => {
    try {
      if (typeof sftId === 'bigint' && typeof sftValue === 'bigint') {
        const tokenId = sftId.toString()
        const formattedBalanceString = N(sftValue).toString()

        const { hash, unlockTime, interest } = await signHash({
          id: initFundEntity.id,
          data: {
            contractName: initFundEntity.vault.contractName,
            stakerAddress: walletAccount.address!,
            tokenId: tokenId,
            balance: formattedBalanceString,
            periodInDays: selectedStakePeriod.periodInDays,
            apy: totalAPY
          }
        }).unwrap()

        stakeSft(
          {
            chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
            abi: initFundEntity.vault.contractAbi,
            address: initFundEntity.vault.contractAddress as `0x${string}`,
            functionName: 'stake',
            args: [hash, sftId!.toString(), formattedBalanceString, unlockTime.toString(), interest.toString()],
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
      }
    } catch {
      setTransactionError(() => ({
        from: walletAccount.address!,
        to: initFundEntity.sft.contractAddress as `0x${string}`,
        chainInformation: `${initFundEntity.chain} (${getChainId(initFundEntity.chain)})`,
        message: 'Failed to mint'
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
  useEffect(() => {
    if (isApproveSftSuccess) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.8 },
        zIndex: 9999
      })
      refetchSftApproved()
    }
  }, [isApproveSftSuccess, refetchSftApproved])
  useEffect(() => {
    if (isStakeSftSuccess) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.8 },
        zIndex: 9999
      })
      refetchSftBalance()
      refetchOwnedStakedSFTBalance()
      setIsStakeSFTDialogOpen(() => false)
    }
  }, [isStakeSftSuccess, refetchSftBalance, refetchOwnedStakedSFTBalance])

  if (isSftIdLoading || isSftValueLoading || isSftSlotIdLoading) {
    return <PublicFundLiveOwnedSFTSkeletonCard />
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
            <Stack direction='row' spacing={2} flexWrap='wrap' justifyContent='space-between'>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Typography variant='h5' component='p'>
                  {sftSlot?.attributes.displayName}
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
            <Stack spacing={2} sx={{ mt: 'auto' }}>
              <Divider />
              <Button fullWidth variant='contained' onClick={handleOpenStakeSFTDialog}>
                Stake
              </Button>
              {/* TODO: Fill here later */}
              <Button fullWidth variant='contained' disabled>
                Redeem
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <Dialog
        open={isStakeSFTDialogOpen}
        onClose={handleCloseStakeSFTDialog}
        aria-labelledby='stake-view'
        aria-describedby='stake-view-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
      >
        <IconButton
          size='small'
          onClick={handleCloseStakeSFTDialog}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>

        <DialogTitle
          id='stake-view'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          {`Stake #${sftId}`}
          <DialogContentText id='stake-view-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
            There will be penalties for un-staking early
          </DialogContentText>
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
                          <IconButton size='small' onClick={() => handleCopyAddress(walletAccount.address as string)}>
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
                      Your SFT
                    </Typography>
                  </Stack>
                  <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
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

                    <Typography variant='subtitle1' component='p'>{`${fundBaseCurrencyProperties.symbol} ${
                      typeof sftValue === 'bigint'
                        ? getFormattedPriceUnit(N(sftValue).div(N(10).pow(18)).toNumber())
                        : 0n
                    } ${fundBaseCurrencyProperties.currency}`}</Typography>
                  </Stack>
                </Stack>

                <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                  <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                    <Typography variant='subtitle1' component='p'>
                      Stake Period
                    </Typography>
                  </Stack>
                  <Stack
                    direction='row'
                    spacing={4}
                    alignSelf='stretch'
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ overflowX: 'auto' }}
                  >
                    {STAKE_PERIOD_INFORMATION.map(periodDateInfo => {
                      const { img, periodInDays, bonusAPY: bonusApy } = periodDateInfo

                      return (
                        <StyledPeriodDateSelectStack
                          key={`stake-period-${periodInDays}-days`}
                          spacing={4}
                          flex='1'
                          alignItems='center'
                          onClick={() => setSelectedStakePeriod(periodDateInfo)}
                          sx={{
                            border: theme =>
                              `1px ${selectedStakePeriod.periodInDays === periodInDays ? theme.palette.primary.main : theme.palette.divider} solid`,
                            '&:hover': {
                              cursor: 'pointer',
                              borderColor: theme => theme.palette.primary.main
                            }
                          }}
                        >
                          <Box>
                            <Image width={60} height={50} src={img} alt={`${periodInDays} days plan`} />
                          </Box>
                          <Box>
                            <Typography variant='h5' align='center'>
                              {`${periodInDays} Days`}
                            </Typography>
                          </Box>
                          <Stack spacing={2} alignContent='center' sx={{ position: 'relative' }}>
                            <Stack direction='row' justifyContent='center'>
                              <Typography
                                variant='body2'
                                component='p'
                                sx={{ mt: 1.6, fontWeight: 600, alignSelf: 'flex-start' }}
                              >
                                APY
                              </Typography>
                              <Typography
                                variant='h3'
                                component='p'
                                color='primary.main'
                                sx={{ fontWeight: 600, lineHeight: 1.17 }}
                              >
                                {`+${bonusApy}`}
                              </Typography>
                              <Typography
                                variant='body2'
                                component='p'
                                sx={{ ml: 2, mb: 1.6, fontWeight: 600, alignSelf: 'flex-end' }}
                              >
                                %
                              </Typography>
                            </Stack>
                          </Stack>
                        </StyledPeriodDateSelectStack>
                      )
                    })}
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
                      <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                        <CustomAvatar
                          src={`/images/points/account-level-${meLevelProperties.level}.svg`}
                          variant='rounded'
                          alt={`level-${meLevelProperties.level}`}
                          sx={{ width: 48, height: 48, fontWeight: 600, zIndex: 2 }}
                        />
                        <Stack alignItems='flex-start' justifyContent='center'>
                          <Typography variant='subtitle1' component='p'>
                            {meLevelProperties.title}
                          </Typography>
                          <CustomChip
                            skin='light'
                            size='small'
                            label={`Level ${meLevelProperties.level}`}
                            color='primary'
                            sx={{
                              height: 20,
                              fontWeight: 600,
                              borderRadius: '5px',
                              fontSize: '0.875rem',
                              textTransform: 'capitalize',
                              '& .MuiChip-label': { mt: -0.25 }
                            }}
                          />
                        </Stack>
                      </Stack>
                      <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                        <Typography variant='subtitle2' component='p'>
                          Privileges
                        </Typography>
                        <Button
                          variant='outlined'
                          sx={{ p: 1.5, minWidth: 38 }}
                          color='success'
                          component={Link}
                          href='/points'
                        >
                          <Icon icon='mdi:crown-circle-outline' fontSize={20} />
                        </Button>
                      </Stack>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Stack alignItems='flex-start' justifyContent='center'>
                        <Typography variant='subtitle2' component='p'>
                          Total APY
                        </Typography>
                        <Typography variant='subtitle2' component='p'>
                          (Level + Base + Bonus)
                        </Typography>
                      </Stack>
                      <Stack alignItems='flex-end' justifyContent='center'>
                        <Typography variant='subtitle1' component='p'>
                          {`${totalAPY} %`}
                        </Typography>
                        <Typography variant='subtitle1' component='p'>
                          {`(${meLevelAPYPrivileges?.value ?? 0} % + ${sftSlotBaseAPY} % + ${selectedStakePeriod.bonusAPY} %)`}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='subtitle2' component='p'>
                        Unlock Date
                      </Typography>
                      <Typography variant='subtitle1' component='p'>
                        {format(addDays(new Date(), selectedStakePeriod.periodInDays), 'PPpp')}
                      </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='subtitle2' component='p'>
                        Earn Expectation
                      </Typography>
                      <Typography variant='h6' component='p'>{`${fundBaseCurrencyProperties.symbol} ${
                        typeof sftValue === 'bigint'
                          ? getFormattedPriceUnit(
                              N(getExpectInterestBalanceString(sftValue, totalAPY, selectedStakePeriod.periodInDays))
                                .div(N(10).pow(18))
                                .toNumber()
                            )
                          : 0n
                      } ${fundBaseCurrencyProperties.currency}`}</Typography>
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
                        {`SFT #${sftId} Approved`}
                      </Stack>
                    </Box>
                  ) : (
                    <LoadingButton
                      fullWidth
                      loading={isApproveSftPending || isApproveSftConfirming}
                      variant='contained'
                      onClick={() => {
                        approveSft(
                          {
                            chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
                            abi: initFundEntity.sft.contractAbi,
                            address: initFundEntity.sft.contractAddress as `0x${string}`,
                            functionName: 'approve',
                            args: [initFundEntity.vault.contractAddress, sftId!],
                            account: walletAccount.address!
                          },
                          {
                            onError: error => {
                              setTransactionError(() => ({
                                from: walletAccount.address!,
                                to: initFundEntity.sft.contractAddress as `0x${string}`,
                                chainInformation: `${initFundEntity.chain} (${getChainId(initFundEntity.chain)})`,
                                message: (error as BaseError)?.shortMessage || 'Failed to approve'
                              }))
                            }
                          }
                        )
                      }}
                    >
                      <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                        <Icon icon='mdi:approve' fontSize={16} />
                        {`Approve SFT #${sftId}`}
                      </Stack>
                    </LoadingButton>
                  )}
                  <LoadingButton
                    fullWidth
                    loading={isSignHashLoading || isStakeSftPending || isStakeSftConfirming}
                    disabled={sftApproved !== initFundEntity.vault.contractAddress}
                    variant='contained'
                    onClick={handleStake}
                  >
                    <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                      <Icon icon='mdi:hammer' fontSize={16} />
                      Stake
                    </Stack>
                  </LoadingButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <PublicFundLiveTransactionErrorDrawer
        transactionError={transactionError}
        onClose={handleCloseTransactionErrorDrawer}
      />
    </Card>
  )
}

export default PublicFundLiveOwnedSFTCard
