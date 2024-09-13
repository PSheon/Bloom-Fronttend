// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import { useAccount, useReadContract, useWriteContract, useBalance, useWaitForTransactionReceipt } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'
import confetti from 'canvas-confetti'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import {
  getChainId,
  getFundCurrencyProperties,
  getFormattedPriceUnit,
  getBaseCurrencyABI,
  getBaseCurrencyAddress
} from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

const ASSET_MANAGER_ROLE_HASH = '0xb1fadd3142ab2ad7f1337ea4d97112bcc8337fc11ce5b20cb04ad038adf99819'

interface Props {
  initDVFundEntity: DVFundType
}

const ManagementFundDefiVaultEditOverviewVaultAssetManagementCard = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const {
    data: vaultPayTokenBalance,
    refetch: refetchVaultPayTokenBalance,
    isLoading: isVaultPayTokenBalanceLoading,
    isFetching: isVaultPayTokenBalanceFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: getBaseCurrencyABI(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
    address: getBaseCurrencyAddress(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
    functionName: 'balanceOf',
    args: [initDVFundEntity.vault.contractAddress],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: 0n
    }
  })

  const {
    data: meHasAssetManagerRole,
    refetch: refetchMeHasAssetManagerRole,
    isLoading: isMeHasAssetManagerRoleLoading,
    isFetching: isMeHasAssetManagerRoleFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'hasRole',
    args: [ASSET_MANAGER_ROLE_HASH, walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: false
    }
  })

  const {
    data: vaultEthBalanceData,
    refetch: refetchVaultEthBalanceData,
    isLoading: isVaultEthBalanceDataLoading,
    isFetching: isVaultEthBalanceDataFetching
  } = useBalance({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    address: initDVFundEntity.vault.contractAddress as `0x${string}`
  })

  const { data: withdrawHash, isPending: isWithdrawPending, writeContract: withdraw } = useWriteContract()

  const { isLoading: isWithdrawConfirming, isSuccess: isWithdrawSuccess } = useWaitForTransactionReceipt({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    hash: withdrawHash
  })

  // ** Vars
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initDVFundEntity.baseCurrency)
  const vaultEthBalance = vaultEthBalanceData?.value ?? 0n

  // ** Logics
  const handleReloadVaultBalance = () => {
    refetchVaultPayTokenBalance()
    refetchMeHasAssetManagerRole()
    refetchVaultEthBalanceData()
  }

  // ** Side Effects
  useEffect(() => {
    if (isWithdrawSuccess) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        zIndex: 9999
      })
      refetchVaultPayTokenBalance()
      refetchMeHasAssetManagerRole()
      refetchVaultEthBalanceData()
    }
  }, [isWithdrawSuccess, refetchVaultPayTokenBalance, refetchMeHasAssetManagerRole, refetchVaultEthBalanceData])

  return (
    <Card>
      <CardHeader
        title='Asset Management'
        subheader={
          <Typography variant='caption' sx={{ mr: 1.5 }}>
            Check vault balance and Withdraw
          </Typography>
        }
        action={
          <Button variant='outlined' color='secondary' onClick={handleReloadVaultBalance} sx={{ p: 1.5, minWidth: 38 }}>
            <Icon icon='mdi:reload' fontSize={20} />
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='primary'>
                <Icon icon='mdi:currency-usd' />
              </CustomAvatar>
              <Stack>
                {isVaultPayTokenBalanceLoading || isVaultPayTokenBalanceFetching ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={32} />
                  </Stack>
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {`${fundBaseCurrencyProperties.symbol} ${
                      typeof vaultPayTokenBalance === 'bigint'
                        ? getFormattedPriceUnit(N(vaultPayTokenBalance).div(N(10).pow(18)).toNumber())
                        : 0n
                    } ${fundBaseCurrencyProperties.currency}`}
                  </Typography>
                )}
                <Typography variant='caption'>USDT Balance</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='primary'>
                <Icon icon='mdi:ethereum' />
              </CustomAvatar>
              <Stack>
                {isVaultEthBalanceDataLoading || isVaultEthBalanceDataFetching ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={32} />
                  </Stack>
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {`${
                      typeof vaultEthBalance === 'bigint'
                        ? getFormattedPriceUnit(N(vaultEthBalance).div(N(10).pow(18)).toNumber())
                        : 0n
                    } ETH`}
                  </Typography>
                )}
                <Typography variant='caption'>ETH Balance</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='center'>
              <LoadingButton
                disabled={!meHasAssetManagerRole}
                loading={
                  isMeHasAssetManagerRoleLoading ||
                  isMeHasAssetManagerRoleFetching ||
                  isWithdrawPending ||
                  isWithdrawConfirming
                }
                variant='contained'
                onClick={() => {
                  withdraw({
                    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
                    abi: initDVFundEntity.vault.contractAbi,
                    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
                    functionName: 'withdraw',
                    args: [walletAccount.address!]
                  })
                }}
              >
                Withdraw
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManagementFundDefiVaultEditOverviewVaultAssetManagementCard
