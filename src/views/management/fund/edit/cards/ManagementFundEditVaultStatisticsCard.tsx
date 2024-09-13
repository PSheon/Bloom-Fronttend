// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'
import formatDistance from 'date-fns/formatDistance'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import {
  getFundCurrencyProperties,
  getFormattedPriceUnit,
  getChainId,
  getBaseCurrencyABI,
  getBaseCurrencyAddress
} from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundEditVaultStatisticsCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** States
  const [updatedAtDate, setUpdatedAtDate] = useState<Date>(new Date())

  // ** Hooks
  const walletAccount = useAccount()
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const {
    data: totalValueLocked,
    refetch: refetchTotalValueLocked,
    isLoading: isTotalValueLockedLoading,
    isFetching: isTotalValueLockedFetching
  } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'totalValueLocked',
    args: [],
    account: walletAccount.address!,
    query: {
      refetchOnWindowFocus: false
    }
  })

  const {
    data: totalValueClaimed,
    refetch: refetchTotalValueClaimed,
    isLoading: isTotalValueClaimedLoading,
    isFetching: isTotalValueClaimedFetching
  } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'totalValueClaimed',
    args: [],
    account: walletAccount.address!,
    query: {
      refetchOnWindowFocus: false
    }
  })

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
    args: [initFundEntity.vault.contractAddress],
    account: walletAccount.address!,
    query: {
      refetchOnWindowFocus: false
    }
  })

  // ** Logics
  const handleReload = () => {
    // refetchTotalStaked()
    refetchTotalValueLocked()
    refetchTotalValueClaimed()
    refetchPayTokenBalance()

    setUpdatedAtDate(() => new Date())
  }

  return (
    <Card>
      <CardHeader
        title='Vault Statics'
        titleTypographyProps={{ variant: 'h6', component: 'p' }}
        subheader={
          <Stack direction='row' alignItems='center'>
            <Typography variant='caption'>
              Updated at{' '}
              <Typography variant='subtitle2' component='span' sx={{ fontWeight: 600 }}>
                {formatDistance(updatedAtDate, new Date(), { addSuffix: true })}
              </Typography>
            </Typography>
            <IconButton onClick={handleReload}>
              <Icon icon='mdi:reload' fontSize={16} />
            </IconButton>
          </Stack>
        }
        action={
          <Stack direction='row' alignItems='center'>
            <Typography variant='caption'>Specification</Typography>
            <IconButton
              component={Link}
              href={`${walletAccount?.chain?.blockExplorers?.default.url}/address/${initFundEntity.vault.contractAddress}#readContract`}
              target='_blank'
            >
              <Icon icon='mdi:external-link' fontSize={16} />
            </IconButton>
          </Stack>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={4} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='primary'>
                <Icon icon='mdi:chart-bar' />
              </CustomAvatar>
              {/* {isTotalStakedLoading || isTotalStakedFetching ? (
                <Stack alignItems='flex-start' justifyContent='center'>
                  <Skeleton width={120} height={28} />
                  <Skeleton variant='text' width={180} height={20} />
                </Stack>
              ) : (
                <Stack alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {typeof totalStaked === 'bigint' ? getFormattedPriceUnit(totalStaked) : '0'}
                  </Typography>
                  <Typography variant='caption'>Total Staked</Typography>
                </Stack>
              )} */}
              {isTotalValueLockedLoading || isTotalValueLockedFetching ? (
                <Stack alignItems='flex-start' justifyContent='center'>
                  <Skeleton width={120} height={28} />
                  <Skeleton variant='text' width={180} height={20} />
                </Stack>
              ) : (
                <Stack alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {/* {typeof totalValueLocked === 'bigint' ? getFormattedPriceUnit(totalValueLocked) : '0'} */}

                    {`${fundBaseCurrencyProperties.symbol} ${
                      typeof totalValueLocked === 'bigint'
                        ? getFormattedPriceUnit(
                            N(totalValueLocked).div(N(10).pow(fundBaseCurrencyProperties.decimals)).toNumber()
                          )
                        : 0n
                    } ${fundBaseCurrencyProperties.currency}`}
                  </Typography>
                  <Typography variant='caption'>Total Value Locked</Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={4} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='warning'>
                <Icon icon='mdi:hand-coin-outline' />
              </CustomAvatar>
              {isTotalValueClaimedLoading || isTotalValueClaimedFetching ? (
                <Stack alignItems='flex-start' justifyContent='center'>
                  <Skeleton width={120} height={28} />
                  <Skeleton variant='text' width={180} height={20} />
                </Stack>
              ) : (
                <Stack alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {`${fundBaseCurrencyProperties.symbol} ${
                      typeof totalValueClaimed === 'bigint'
                        ? getFormattedPriceUnit(
                            N(totalValueClaimed).div(N(10).pow(fundBaseCurrencyProperties.decimals)).toNumber()
                          )
                        : 0n
                    } ${fundBaseCurrencyProperties.currency}`}
                  </Typography>
                  <Typography variant='caption'>Total Value Claimed</Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={4} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='info'>
                <Icon icon='ph:vault-bold' />
              </CustomAvatar>
              {isPayTokenBalanceLoading || isPayTokenBalanceFetching ? (
                <Stack alignItems='flex-start' justifyContent='center'>
                  <Skeleton width={120} height={28} />
                  <Skeleton variant='text' width={180} height={20} />
                </Stack>
              ) : (
                <Stack alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {`${fundBaseCurrencyProperties.symbol} ${
                      typeof payTokenBalance === 'bigint'
                        ? getFormattedPriceUnit(
                            N(payTokenBalance).div(N(10).pow(fundBaseCurrencyProperties.decimals)).toNumber()
                          )
                        : 0n
                    } ${fundBaseCurrencyProperties.currency}`}
                  </Typography>
                  <Typography variant='caption'>Balance</Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManagementFundEditVaultStatisticsCard
