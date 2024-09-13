// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'
import confetti from 'canvas-confetti'

// ** Custom Component Imports
import PublicFundDefiVaultDefaultPackageListGrid from 'src/views/fund/defi-vault/grids/PublicFundDefiVaultDefaultPackageListGrid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import {
  getChainId,
  getBaseCurrencyAddress,
  getFundCurrencyProperties,
  getBaseCurrencyABI,
  getFormattedPriceUnit
} from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultDefaultPackageGrid = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

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
      enabled: walletAccount.status === 'connected',
      placeholderData: 0n
    }
  })

  const {
    data: publicMintBaseCurrencyHash,
    isPending: isPublicMintBaseCurrencyPending,
    writeContract: publicMintBaseCurrency
  } = useWriteContract()

  const { isLoading: isPublicMintBaseCurrencyConfirming, isSuccess: isPublicMintBaseCurrencySuccess } =
    useWaitForTransactionReceipt({
      chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
      hash: publicMintBaseCurrencyHash
    })

  // ** Vars
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initDVFundEntity.baseCurrency)

  // ** Logics
  const isFundBaseCurrencyAllowMint = () => {
    if (initDVFundEntity.chain === 'Ethereum Sepolia') {
      if (initDVFundEntity.baseCurrency === 'USDT') {
        return true
      }

      return false
    }

    return false
  }

  // ** Side Effects
  useEffect(() => {
    if (isPublicMintBaseCurrencySuccess) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        zIndex: 9999
      })
      refetchPayTokenBalance()
    }
  }, [isPublicMintBaseCurrencySuccess, refetchPayTokenBalance])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent={{ xs: 'flex-start', md: 'space-between' }}
        >
          <Stack>
            <Typography variant='h5' component='p'>
              Packages
            </Typography>
            <Typography variant='body2' component='p'>
              You can learn how the fund works and what rights you will have after casting the fund
            </Typography>
          </Stack>
          <Stack direction='row' spacing={4} alignSelf='center' justifyContent='center'>
            <Stack alignItems='flex-end' justifyContent='center'>
              <Typography variant='caption' color='text.secondary' noWrap sx={{ fontWeight: 600 }}>
                My Total Position
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ fontWeight: 600 }}
              >{`(${fundBaseCurrencyProperties.currency})`}</Typography>
            </Stack>
            {isPayTokenBalanceLoading || isPayTokenBalanceFetching ? (
              <Stack alignItems='center' justifyContent='center'>
                <Skeleton variant='text' width={100} height={40} />
              </Stack>
            ) : (
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <Typography variant='h6' component='p' noWrap>
                  {`${fundBaseCurrencyProperties.symbol} ${
                    typeof payTokenBalance === 'bigint'
                      ? getFormattedPriceUnit(
                          N(payTokenBalance).div(N(10).pow(fundBaseCurrencyProperties.decimals)).toNumber()
                        )
                      : 0n
                  }`}
                </Typography>
                <IconButton
                  component={Link}
                  href={`${walletAccount?.chain?.blockExplorers?.default.url}/address/${walletAccount.address}`}
                  target='_blank'
                >
                  <Icon icon='mdi:arrow-top-right-thin-circle-outline' fontSize={16} />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Grid>
      {isFundBaseCurrencyAllowMint() && (
        <Grid item xs={12}>
          <Alert
            severity='info'
            action={
              <LoadingButton
                loading={isPublicMintBaseCurrencyPending || isPublicMintBaseCurrencyConfirming}
                color='inherit'
                size='small'
                onClick={() => {
                  const mintValue = 1n * 10n ** 16n

                  publicMintBaseCurrency({
                    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
                    abi: getBaseCurrencyABI(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
                    address: getBaseCurrencyAddress(initDVFundEntity.chain, initDVFundEntity.baseCurrency),
                    functionName: 'publicMint',
                    args: [],
                    account: walletAccount.address!,
                    value: mintValue
                  })
                }}
              >
                {`Get ${fundBaseCurrencyProperties.currency}`}
              </LoadingButton>
            }
          >
            {`You need ${fundBaseCurrencyProperties.currency} to mint the SFT, currently rate is 0.01 eth = 1,000 ${fundBaseCurrencyProperties.currency}.`}
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <PublicFundDefiVaultDefaultPackageListGrid initDVFundEntity={initDVFundEntity} />
      </Grid>
    </Grid>
  )
}

export default PublicFundDefiVaultDefaultPackageGrid
