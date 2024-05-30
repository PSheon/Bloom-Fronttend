// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'

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
import { Atropos } from 'atropos/react'
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import confetti from 'canvas-confetti'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import PublicFundLiveOwnedSFTSkeletonCard from 'src/views/fund/live/cards/owned-sft/PublicFundLiveOwnedSFTSkeletonCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** API Imports
import { useVaultSignHashMutation } from 'src/store/api/management/fund'

// ** Util Imports
import {
  getFundCurrencyProperties,
  getFormattedPriceUnit,
  getChainId,
  getFormattedEthereumAddress,
  getExpectInterestBalance
} from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
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
  padding: theme.spacing(6),
  transition: 'border-color 0.2s'
}))

type StakePeriodType = {
  img: string
  periodInDays: number
  apy: number
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

  const [stakePeriod, setStakePeriod] = useState<StakePeriodType>({
    img: '/images/vault/stake-7-days.png',
    periodInDays: 7,
    apy: 8
  })

  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const bgColors = useBgColor()
  const walletAccount = useAccount()

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
      enabled: !isSftIdLoading && sftId !== undefined
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
      enabled: !isSftIdLoading && sftId !== undefined
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
  const formattedSftValue = BigInt(Number(sftValue ?? 0)) / 10n ** 18n
  const sftSlot = initFundEntity.defaultPackages?.data.find(pkg => pkg.id === Number(sftSlotId))
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const STAKE_PERIOD_INFORMATION: StakePeriodType[] = [
    {
      img: '/images/vault/stake-7-days.png',
      periodInDays: 7,
      apy: 8
    },
    {
      img: '/images/vault/stake-30-days.png',
      periodInDays: 30,
      apy: 18
    },
    {
      img: '/images/vault/stake-60-days.png',
      periodInDays: 60,
      apy: 22
    }
  ]

  // ** Logics
  const handleOpenStakeSFTDialog = () => setIsStakeSFTDialogOpen(() => true)
  const handleCloseStakeSFTDialog = () => setIsStakeSFTDialogOpen(() => false)

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
        const tokenValue = sftValue.toString()

        const { hash, unlockTime, interest } = await signHash({
          id: initFundEntity.id,
          data: {
            contractName: initFundEntity.vault.contractName,
            stakerAddress: walletAccount.address!,
            tokenId: tokenId,
            balance: tokenValue,
            periodInDays: stakePeriod.periodInDays,
            apy: stakePeriod.apy
          }
        }).unwrap()

        stakeSft(
          {
            chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
            abi: initFundEntity.vault.contractAbi,
            address: initFundEntity.vault.contractAddress as `0x${string}`,
            functionName: 'stake',
            args: [hash, sftId!.toString(), sftValue!.toString(), unlockTime.toString(), interest.toString()],
            account: walletAccount.address!
          },
          {
            onError: () => {
              /* TODO: fix here later */
              // toast.error('Failed to stake sft')
            }
          }
        )
      }
    } catch {
      /* TODO: fix here later */
      // toast.error('Failed to stake sft')
    }
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
      refetchVaultTotalStaked()
      setIsStakeSFTDialogOpen(() => false)
    }
  }, [isStakeSftSuccess, refetchSftBalance, refetchOwnedStakedSFTBalance, refetchVaultTotalStaked])

  if (isSftIdLoading || isSftValueLoading || isSftSlotIdLoading) {
    return <PublicFundLiveOwnedSFTSkeletonCard />
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={4} alignItems='center' justifyContent='center' sx={{ position: 'relative' }}>
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
          <Stack spacing={4} alignSelf='stretch'>
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
                  {getFormattedPriceUnit(formattedSftValue ?? 0)}
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Typography variant='body2'>{sftSlot?.attributes.description || 'No description'}</Typography>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Stack spacing={2} justifyContent='center'>
              <Typography variant='subtitle2' component='p'>
                Utility
              </Typography>

              <Stack spacing={2} alignSelf='stretch'>
                {sftSlot?.attributes.slot.map(property => {
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
            There will be penalties for unstaking early
          </DialogContentText>
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
              <Grid container spacing={6}>
                {STAKE_PERIOD_INFORMATION.map(periodDateInfo => {
                  const { img, periodInDays, apy } = periodDateInfo

                  return (
                    <Grid key={`stake-period-${periodInDays}-days`} item xs={12} sm={4}>
                      <StyledPeriodDateSelectStack
                        spacing={4}
                        alignItems='center'
                        onClick={() => setStakePeriod(periodDateInfo)}
                        sx={{
                          border: theme =>
                            `1px ${stakePeriod.periodInDays === periodInDays ? theme.palette.primary.main : theme.palette.divider} solid`,
                          '&:hover': {
                            cursor: 'pointer',
                            borderColor: theme => theme.palette.primary.main
                          }
                        }}
                      >
                        <Box>
                          <Image width={100} height={80} src={img} alt={`${periodInDays} days plan`} />
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
                              {apy}
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
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={4} alignItems='center' justifyContent='center'>
                <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ py: 12 }}>
                  <Stack spacing={2} alignSelf='stretch' divider={<Divider orientation='horizontal' flexItem />}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='subtitle2' component='p'>
                        Token ID
                      </Typography>
                      <Typography variant='subtitle1' component='p'>{`# ${sftId ?? '-'}`}</Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='subtitle2' component='p'>
                        Balance
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        component='p'
                      >{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                        (Number(sftValue) ?? 0) / 10 ** 18
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
                        <IconButton size='small' onClick={() => handleCopyAddress(walletAccount.address as string)}>
                          <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={16} />
                        </IconButton>
                      </Stack>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='subtitle2' component='p'>
                        Unlock Date
                      </Typography>
                      <Typography variant='subtitle1' component='p'>
                        {format(addDays(new Date(), stakePeriod.periodInDays), 'PPpp')}
                      </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography variant='subtitle2' component='p'>
                        Earn Expectation
                      </Typography>
                      <Typography
                        variant='h6'
                        component='p'
                      >{`${fundBaseCurrencyProperties.symbol} ${getFormattedPriceUnit(
                        sftValue
                          ? getExpectInterestBalance(sftValue as bigint, stakePeriod.apy, stakePeriod.periodInDays) /
                              10 ** 18
                          : 0n
                      )} ${fundBaseCurrencyProperties.currency}`}</Typography>
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
                              onError: () => {
                                /* TODO: fix here later */
                                // toast.error('Failed to approve')
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
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PublicFundLiveOwnedSFTCard
