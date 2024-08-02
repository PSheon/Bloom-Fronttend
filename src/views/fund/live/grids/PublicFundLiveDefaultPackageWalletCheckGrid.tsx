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

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import WalletConnectCard from 'src/views/shared/wallet-connect-card'
import PublicFundLiveDefaultPackageListGrid from 'src/views/fund/live/grids/PublicFundLiveDefaultPackageListGrid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

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
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveDefaultPackageWalletCheckGrid = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

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
      chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
      hash: publicMintBaseCurrencyHash
    })

  const { data: walletsData } = useFindMeQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 3
    }
  })

  // ** Vars
  const wallets = walletsData?.data || []
  const requiredChainId = getChainId(initFundEntity.chain)
  const isCurrentChainSupported = requiredChainId === walletAccount.chainId
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  const isCurrentWalletVerified =
    walletAccount.status === 'connected' &&
    wallets.find(wallet => wallet.address.toLowerCase() === walletAccount.address.toLowerCase())

  // ** Logics
  const isFundBaseCurrencyAllowMint = () => {
    if (initFundEntity.chain === 'Ethereum Sepolia') {
      if (initFundEntity.baseCurrency === 'USDT') {
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

  // ** Renders
  if (initFundEntity.sft === null) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
            <Stack
              spacing={4}
              alignItems='center'
              justifyContent='center'
              sx={{ width: '100%', maxWidth: theme => theme.spacing(200), height: theme => theme.spacing(80) }}
            >
              <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
                <Icon icon='mdi:magnify-scan' fontSize='2rem' />
              </CustomAvatar>
              <Typography variant='h4' component='p' textAlign='center' sx={{ fontWeight: 600 }}>
                Fund SFT is under review
              </Typography>
              <Typography variant='subtitle1' component='p' textAlign='center'>
                {`This SFT is under review and not published yet. Please check back later.`}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    )
  }

  if (walletAccount.status === 'connected' && isCurrentChainSupported && isCurrentWalletVerified) {
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
                        ? getFormattedPriceUnit(N(payTokenBalance).div(N(10).pow(18)).toNumber())
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
                      chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
                      abi: getBaseCurrencyABI(initFundEntity.chain, initFundEntity.baseCurrency),
                      address: getBaseCurrencyAddress(initFundEntity.chain, initFundEntity.baseCurrency),
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
          <PublicFundLiveDefaultPackageListGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ py: 12 }}>
          <Stack
            spacing={4}
            alignItems='center'
            justifyContent='center'
            sx={{ width: '100%', maxWidth: theme => theme.spacing(200) }}
          >
            <Typography variant='h4' component='p' textAlign='center' sx={{ fontWeight: 600 }}>
              Use Money in your wallet
            </Typography>
            <Typography variant='subtitle1' component='p' textAlign='center'>
              Cryptocurrency is a digital form of currency that utilizes cryptography to secure transactions, control
              the creation of new units, and verify the transfer of assets.
            </Typography>
          </Stack>
          <Stack sx={{ width: '100%', maxWidth: theme => theme.spacing(120) }}>
            <WalletConnectCard requiredChain={initFundEntity.chain} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default PublicFundLiveDefaultPackageWalletCheckGrid
