// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'
import fromUnixTime from 'date-fns/fromUnixTime'
import confetti from 'canvas-confetti'

// ** Core Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Component Imports
import PublicFundDefiVaultPackageDepositRevenueChart from 'src/views/fund/defi-vault/charts/PublicFundDefiVaultPackageDepositRevenueChart'
import PublicFundLiveTransactionErrorDrawer from 'src/views/fund/live/drawers/PublicFundLiveTransactionErrorDrawer'

// ** API Imports
import { useClaimSignHashMutation } from 'src/store/api/management/dvFund'

// ** Util Imports
import { getChainId, getFundCurrencyProperties, getFormattedPriceUnit } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'
import type { BaseError } from 'wagmi'

type TransactionErrorType = {
  from: string
  to: string
  chainInformation: string
  message: string
}
interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultMyDepositClaimCard = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** States
  const [transactionError, setTransactionError] = useState<TransactionErrorType | null>(null)

  // ** Hooks
  const walletAccount = useAccount()

  const { data: meDepositInfo } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getDepositInfo',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: false
    }
  })

  const {
    data: meVerifiedClaimInfo,
    refetch: refetchMeVerifiedClaimInfo,
    isLoading: isMeVerifiedClaimInfoLoading,
    isFetching: isMeVerifiedClaimInfoFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getVerifiedClaim',
    args: [],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: [0n, 0n] as unknown as bigint[]
    }
  })

  const {
    data: meReferralInfo,
    refetch: refetchMeReferralInfo,
    isLoading: isMeReferralInfoLoading,
    isFetching: isMeReferralInfoFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'referralInfoOf',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: false,
      placeholderData: [0n, 0n, 0n] as unknown as bigint[]
    }
  })

  const { data: claimHash, isPending: isClaimPending, writeContract: claim } = useWriteContract()

  const { isLoading: isClaimConfirming, isSuccess: isClaimSuccess } = useWaitForTransactionReceipt({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    hash: claimHash
  })

  const [claimSignHash, { isLoading: isClaimSignHashLoading }] = useClaimSignHashMutation()

  // ** Vars
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initDVFundEntity.baseCurrency)

  /* amount, initAmount, interestRate, startTime, principalDelayDays, durationDays, lastClaimTime */
  const [, initAmount, interestRate, startTime, principalDelayDays, durationDays] = meDepositInfo as bigint[]

  /* principalToClaim, interestToClaim */
  const [principalToClaim, interestToClaim] = meVerifiedClaimInfo as bigint[]
  const totalPrincipalAndInterestToClaim = BigInt(principalToClaim ?? 0) + BigInt(interestToClaim ?? 0)
  const ableToClaimPrincipalAndInterest = totalPrincipalAndInterestToClaim > 0n

  /* reward, totalReferrals, totalReferralDeposits */
  const [reward] = meReferralInfo as bigint[]
  const totalReward = BigInt(reward ?? 0)
  const ableToClaimReward = totalReward > 0n

  // ** Logics
  const handleCloseTransactionErrorDrawer = () => setTransactionError(() => null)

  const handleClaimPrincipalAndInterest = async () => {
    try {
      const { hash } = await claimSignHash({
        data: {
          contractAddress: initDVFundEntity.vault.contractAddress,
          sender: walletAccount.address!
        }
      }).unwrap()

      claim(
        {
          chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
          abi: initDVFundEntity.vault.contractAbi,
          address: initDVFundEntity.vault.contractAddress as `0x${string}`,
          functionName: 'claim',
          args: [hash],
          account: walletAccount.address!
        },
        {
          onError: error => {
            setTransactionError(() => ({
              from: walletAccount.address!,
              to: initDVFundEntity.vault.contractAddress as `0x${string}`,
              chainInformation: `${initDVFundEntity.chain} (${getChainId(initDVFundEntity.chain)})`,
              message: (error as BaseError)?.shortMessage || 'Failed to claim'
            }))
          }
        }
      )
    } catch {
      setTransactionError(() => ({
        from: walletAccount.address!,
        to: initDVFundEntity.vault.contractAddress as `0x${string}`,
        chainInformation: `${initDVFundEntity.chain} (${getChainId(initDVFundEntity.chain)})`,
        message: 'Failed to claim'
      }))
    }
  }

  const handleClaimReferralReward = async () => {
    try {
      const { hash } = await claimSignHash({
        data: {
          contractAddress: initDVFundEntity.vault.contractAddress,
          sender: walletAccount.address!
        }
      }).unwrap()

      claim(
        {
          chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
          abi: initDVFundEntity.vault.contractAbi,
          address: initDVFundEntity.vault.contractAddress as `0x${string}`,
          functionName: 'claimReferralReward',
          args: [hash],
          account: walletAccount.address!
        },
        {
          onError: error => {
            setTransactionError(() => ({
              from: walletAccount.address!,
              to: initDVFundEntity.vault.contractAddress as `0x${string}`,
              chainInformation: `${initDVFundEntity.chain} (${getChainId(initDVFundEntity.chain)})`,
              message: (error as BaseError)?.shortMessage || 'Failed to claim referral reward'
            }))
          }
        }
      )
    } catch {
      setTransactionError(() => ({
        from: walletAccount.address!,
        to: initDVFundEntity.vault.contractAddress as `0x${string}`,
        chainInformation: `${initDVFundEntity.chain} (${getChainId(initDVFundEntity.chain)})`,
        message: 'Failed to claim'
      }))
    }
  }

  // ** Side Effects
  useEffect(() => {
    if (isClaimSuccess) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        zIndex: 9999
      })
      refetchMeVerifiedClaimInfo()
      refetchMeReferralInfo()
    }
  }, [isClaimSuccess, refetchMeVerifiedClaimInfo, refetchMeReferralInfo])

  return (
    <Card>
      <CardContent>
        <Stack spacing={6}>
          <Stack>
            <Typography variant='subtitle1' component='p'>
              My Deposit Information
            </Typography>
          </Stack>

          <Stack alignSelf='stretch'>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Stack spacing={4}>
                  <Typography>Principal back + Interest earning</Typography>

                  <Stack spacing={4}>
                    <Stack direction='row' spacing={2} alignItems='flex-end' justifyContent='center'>
                      {isMeVerifiedClaimInfoLoading || isMeVerifiedClaimInfoFetching ? (
                        <Stack alignItems='center' justifyContent='center'>
                          <Skeleton variant='text' width={100} height={40} />
                        </Stack>
                      ) : (
                        <Typography variant='h4' component='p'>
                          {`${fundBaseCurrencyProperties.symbol} ${
                            typeof totalPrincipalAndInterestToClaim === 'bigint'
                              ? getFormattedPriceUnit(N(totalPrincipalAndInterestToClaim).div(N(10).pow(18)).toNumber())
                              : 0n
                          }`}
                        </Typography>
                      )}
                      <Typography component='sub' color='text.secondary'>
                        {fundBaseCurrencyProperties.currency}
                      </Typography>
                    </Stack>
                    <LoadingButton
                      size='medium'
                      loading={isClaimSignHashLoading || isClaimPending || isClaimConfirming}
                      variant='contained'
                      disabled={!ableToClaimPrincipalAndInterest}
                      onClick={handleClaimPrincipalAndInterest}
                    >
                      Claim
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack spacing={4}>
                  <Typography>Referral reward</Typography>

                  <Stack spacing={4}>
                    <Stack direction='row' spacing={2} alignItems='flex-end' justifyContent='center'>
                      {isMeReferralInfoLoading || isMeReferralInfoFetching ? (
                        <Stack alignItems='center' justifyContent='center'>
                          <Skeleton variant='text' width={100} height={40} />
                        </Stack>
                      ) : (
                        <Typography variant='h4' component='p'>
                          {`${fundBaseCurrencyProperties.symbol} ${
                            typeof totalReward === 'bigint'
                              ? getFormattedPriceUnit(N(totalReward).div(N(10).pow(18)).toNumber())
                              : 0n
                          }`}
                        </Typography>
                      )}
                      <Typography component='sub' color='text.secondary'>
                        {fundBaseCurrencyProperties.currency}
                      </Typography>
                    </Stack>
                    <LoadingButton
                      size='medium'
                      loading={isClaimSignHashLoading || isClaimPending || isClaimConfirming}
                      variant='contained'
                      disabled={!ableToClaimReward}
                      onClick={handleClaimReferralReward}
                    >
                      Claim
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          <Stack spacing={2}>
            <Stack alignSelf='stretch' sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
              <ApexChartWrapper>
                <PublicFundDefiVaultPackageDepositRevenueChart
                  startDate={typeof startTime === 'bigint' ? fromUnixTime(N(startTime).toNumber()) : new Date()}
                  amount={typeof initAmount === 'bigint' ? N(initAmount).div(N(10).pow(18)).toNumber() : 0}
                  interestRate={typeof interestRate === 'bigint' ? N(interestRate).toNumber() : 0}
                  duration={typeof durationDays === 'bigint' ? N(durationDays).toNumber() : 0}
                  principalDelayInDays={typeof principalDelayDays === 'bigint' ? N(principalDelayDays).toNumber() : 0}
                />
              </ApexChartWrapper>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>

      <PublicFundLiveTransactionErrorDrawer
        transactionError={transactionError}
        onClose={handleCloseTransactionErrorDrawer}
      />
    </Card>
  )
}

export default PublicFundDefiVaultMyDepositClaimCard
