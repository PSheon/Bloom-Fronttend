// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
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
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'
import { Atropos } from 'atropos/react'
import format from 'date-fns/format'
import confetti from 'canvas-confetti'

// ** Core Component Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import PublicFundLiveStakedSFTSkeletonCard from 'src/views/fund/live/cards/staked-sft/PublicFundLiveStakedSFTSkeletonCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFundCurrencyProperties, getFormattedPriceUnit, getChainId } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

// ** Styled <sup> Component
const Sup = styled('sup')(({ theme }) => ({
  fontSize: '1.2rem',
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

type StakeRecordType = [string, bigint, bigint, number, number, bigint]
interface Props {
  initFundEntity: FundType
  sftIndex: number
}

const PublicFundLiveStakedSFTCard = (props: Props) => {
  // ** Props
  const { initFundEntity, sftIndex } = props

  // ** States
  const [isUnstakeSFTDialogOpen, setIsUnstakeSFTDialogOpen] = useState<boolean>(false)

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
  const sftSlot = initFundEntity.defaultPackages?.data.find(pkg => pkg.id === Number(sftSlotId))
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const stakeRecordStartDate = vaultStakeRecord
    ? format(new Date((vaultStakeRecord as StakeRecordType)[3] * 1_000), 'PPp')
    : '-'

  const stakeRecordUnlockDate = vaultStakeRecord
    ? format(new Date((vaultStakeRecord as StakeRecordType)[4] * 1_000), 'PPp')
    : '-'

  // ** Logics
  const handleOpenUnstakeSFTDialog = () => setIsUnstakeSFTDialogOpen(() => true)
  const handleCloseUnstakeSFTDialog = () => setIsUnstakeSFTDialogOpen(() => false)

  const handleUnstake = async () => {
    try {
      if (typeof sftId === 'bigint') {
        const tokenId = sftId.toString()

        unstakeSft(
          {
            chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
            abi: initFundEntity.vault.contractAbi,
            address: initFundEntity.vault.contractAddress as `0x${string}`,
            functionName: 'unstake',
            args: [[tokenId]],
            account: walletAccount.address!
          },
          {
            onError: () => {
              /* TODO: fix here later */
              // toast.error('Failed to unstake sft')
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
                Claim
              </Button>
              <Button fullWidth variant='contained' onClick={handleOpenUnstakeSFTDialog}>
                UnStake
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
          {`Unstake #${sftId}`}
          <DialogContentText id='unstake-view-description' variant='body2' component='p' sx={{ textAlign: 'center' }}>
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
                <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                  <LoadingButton
                    fullWidth
                    loading={isUnstakeSftPending || isUnstakeSftConfirming}
                    variant='contained'
                    onClick={handleUnstake}
                  >
                    <Stack spacing={2} alignItems='center' sx={{ py: 1 }}>
                      <Icon icon='mdi:hammer' fontSize={16} />
                      Unstake
                    </Stack>
                  </LoadingButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PublicFundLiveStakedSFTCard
