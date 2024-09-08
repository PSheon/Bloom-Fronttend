// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useSession } from 'next-auth/react'
import { useAccount, useReadContract, useDisconnect } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import {
  getChainId,
  getGradientColors,
  getFundCurrencyProperties,
  getFormattedEthereumAddress,
  getFormattedPriceUnit
} from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultMyDepositStatisticsStack = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** States
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const session = useSession()
  const walletAccount = useAccount()
  const { disconnectAsync } = useDisconnect()

  const {
    data: meDepositInfo,
    isLoading: isMeDepositInfoLoading,
    isFetching: isMeDepositInfoFetching
  } = useReadContract({
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

  // ** Vars
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initDVFundEntity.baseCurrency)

  /* amount, initAmount, interestRate, startTime, principalDelayDays, durationDays, lastClaimTime */
  const [, initAmount, interestRate, , principalDelayDays, durationDays] = meDepositInfo as bigint[]

  // ** Logics
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsAddressCopied(() => true)
    setTimeout(() => {
      setIsAddressCopied(() => false)
    }, 2 * 1000)
  }

  const handleDisconnectWallet = async () => {
    await disconnectAsync()
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

  return (
    <Stack spacing={6}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={6}
        alignSelf='stretch'
        alignItems='space-between'
        justifyContent='space-between'
      >
        <Stack alignSelf='stretch' sx={{ overflow: 'hidden' }}>
          <Typography variant='h5' component='p' noWrap>
            {`Welcome back, ${session.data?.user.username} 👋🏻`}
          </Typography>
          <Typography variant='body2' component='p'>
            {`Your progress this week is Awesome.`}
          </Typography>
          <Typography variant='body2' component='p'>
            {`let's keep it up and get a lot of points reward!`}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={4} alignSelf='stretch' alignItems='center' justifyContent='space-between'>
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
            <Button variant='outlined' color='secondary' onClick={handleDisconnectWallet} sx={{ p: 1.5, minWidth: 38 }}>
              <Icon icon='mdi:link-variant-off' fontSize={20} />
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignSelf='stretch'
        alignItems={{ md: 'center' }}
        justifyContent='center'
      >
        <Stack direction='row' spacing={4} flex={1} alignItems='center' justifyContent='flex-start'>
          <CustomAvatar skin='light' variant='rounded' color='primary'>
            <Icon icon='mdi:safe' />
          </CustomAvatar>
          <Stack>
            {isMeDepositInfoLoading || isMeDepositInfoFetching ? (
              <Stack alignItems='center' justifyContent='center'>
                <Skeleton variant='text' width={100} height={32} />
              </Stack>
            ) : (
              <Typography variant='subtitle1' component='p'>
                {`${fundBaseCurrencyProperties.symbol} ${
                  typeof initAmount === 'bigint'
                    ? getFormattedPriceUnit(N(initAmount).div(N(10).pow(18)).toNumber())
                    : 0n
                } ${fundBaseCurrencyProperties.currency}`}
              </Typography>
            )}
            <Typography variant='subtitle2' component='p'>
              Deposit amount
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={4} flex={1} alignItems='center' justifyContent='flex-start'>
          <CustomAvatar skin='light' variant='rounded' color='warning'>
            <Icon icon='mdi:dollar' />
          </CustomAvatar>

          <Stack>
            {isMeDepositInfoLoading || isMeDepositInfoFetching ? (
              <Stack alignItems='center' justifyContent='center'>
                <Skeleton variant='text' width={100} height={32} />
              </Stack>
            ) : (
              <Typography variant='subtitle1' component='p'>
                {`${interestRate} %`}
              </Typography>
            )}
            <Typography variant='subtitle2' component='p'>
              Interest Rate
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={4} flex={1} alignItems='center' justifyContent='flex-start'>
          <CustomAvatar skin='light' variant='rounded' color='info'>
            <Icon icon='mdi:calendar-month-outline' />
          </CustomAvatar>

          <Stack>
            {isMeDepositInfoLoading || isMeDepositInfoFetching ? (
              <Stack alignItems='center' justifyContent='center'>
                <Skeleton variant='text' width={100} height={32} />
              </Stack>
            ) : (
              <Typography variant='subtitle1' component='p'>
                {`${durationDays} Days`}
              </Typography>
            )}
            <Typography variant='subtitle2' component='p'>
              Duration
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={4} flex={1} alignItems='center' justifyContent='flex-start'>
          <CustomAvatar skin='light' variant='rounded' color='secondary'>
            <Icon icon='mdi:calendar-month-outline' />
          </CustomAvatar>

          <Stack>
            {isMeDepositInfoLoading || isMeDepositInfoFetching ? (
              <Stack alignItems='center' justifyContent='center'>
                <Skeleton variant='text' width={100} height={32} />
              </Stack>
            ) : (
              <Typography variant='subtitle1' component='p'>
                {`${principalDelayDays} Days`}
              </Typography>
            )}
            <Typography variant='subtitle2' component='p'>
              Principal Delay
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PublicFundDefiVaultMyDepositStatisticsStack
