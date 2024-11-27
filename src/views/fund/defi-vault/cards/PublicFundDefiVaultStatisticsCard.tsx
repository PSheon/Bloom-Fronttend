// ** MUI Imports
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getChainId, getFundCurrencyProperties, getFormattedPriceUnit } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultStatisticsCard = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const {
    data: vaultVersion,
    isLoading: isVaultVersionLoading,
    isFetching: isVaultVersionFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'contractVersion',
    args: [],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: 0n
    }
  })

  const {
    data: vaultTotalDeposits,
    isLoading: isVaultTotalDepositsLoading,
    isFetching: isVaultTotalDepositsFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getTotalDeposits',
    args: [],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: 0n
    }
  })

  const {
    data: vaultTotalInterestPaid,
    isLoading: isVaultTotalInterestPaidLoading,
    isFetching: isVaultTotalInterestPaidFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'getTotalInterestPaid',
    args: [],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: 0n
    }
  })

  // ** Vars
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initDVFundEntity.baseCurrency)

  return (
    <Card>
      <CardHeader
        title='Vault Statistics'
        action={
          <Stack alignItems='flex-end' justifyContent='flex-end'>
            <Typography variant='caption'>Vault version</Typography>
            <Stack direction='row' spacing={2} alignItems='center' color='success.main'>
              {isVaultVersionLoading || isVaultVersionFetching ? (
                <Stack alignItems='center' justifyContent='center'>
                  <Skeleton variant='text' width={100} height={22} />
                </Stack>
              ) : (
                <Typography variant='subtitle2' color='success.main'>
                  {typeof vaultVersion === 'string' ? vaultVersion : 'v1.0.0'}
                </Typography>
              )}
              <Icon icon='mdi:shield-check-outline' fontSize={16} />
            </Stack>
          </Stack>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='primary'>
                <Icon icon='mdi:safe' />
              </CustomAvatar>
              <Stack>
                {isVaultTotalDepositsLoading || isVaultTotalDepositsFetching ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={32} />
                  </Stack>
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {`${fundBaseCurrencyProperties.symbol} ${
                      typeof vaultTotalDeposits === 'bigint'
                        ? getFormattedPriceUnit(
                            N(vaultTotalDeposits).div(N(10).pow(fundBaseCurrencyProperties.decimals)).toNumber()
                          )
                        : 0n
                    } ${fundBaseCurrencyProperties.currency}`}
                  </Typography>
                )}
                <Typography variant='caption'>Total deposits</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='warning'>
                <Icon icon='mdi:dollar' />
              </CustomAvatar>
              <Stack>
                {isVaultTotalInterestPaidLoading || isVaultTotalInterestPaidFetching ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={32} />
                  </Stack>
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {`${fundBaseCurrencyProperties.symbol} ${
                      typeof vaultTotalInterestPaid === 'bigint'
                        ? getFormattedPriceUnit(
                            N(vaultTotalInterestPaid).div(N(10).pow(fundBaseCurrencyProperties.decimals)).toNumber()
                          )
                        : 0n
                    } ${fundBaseCurrencyProperties.currency}`}
                  </Typography>
                )}
                <Typography variant='caption'>Total interest paid</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='info'>
                <Icon icon='mdi:calendar-month-outline' />
              </CustomAvatar>
              <Stack>
                {/* NOTE: Fix here later */}
                {isVaultTotalInterestPaidLoading ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={32} />
                  </Stack>
                ) : (
                  <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                    {`≈ ${18} %`}
                  </Typography>
                )}
                <Typography variant='caption'>Average APY.</Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* <Grid item xs={12} sm={4}>
            <Stack direction='row' spacing={6} alignItems='center'>
              <CustomAvatar skin='light' variant='rounded' color='info'>
                <Icon icon='mdi:calendar-month-outline' />
              </CustomAvatar>
              <Stack>
                <Typography variant='h6' component='p' sx={{ fontWeight: 600 }}>
                  {`${differenceInDays(new Date(), new Date(initDVFundEntity.saleStartTime))} Days`}
                </Typography>
                <Typography variant='caption'>Vault lasted</Typography>
              </Stack>
            </Stack>
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PublicFundDefiVaultStatisticsCard
