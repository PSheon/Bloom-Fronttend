// ** MUI Imports
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'
import { zeroAddress } from 'viem'
import { ExactNumber as N } from 'exactnumber'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getChainId, getFundCurrencyProperties, getFormattedEthereumAddress, getFormattedPriceUnit } from 'src/utils'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

const PublicFundDefiVaultMyReferralInformationStack = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

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
      enabled: walletAccount.status === 'connected',
      placeholderData: [0n, 0n, 0n] as unknown as bigint[]
    }
  })

  const {
    data: meReferrer,
    refetch: refetchMeReferrer,
    isLoading: isMeReferrerLoading,
    isFetching: isMeReferrerFetching
  } = useReadContract({
    chainId: getChainId(initDVFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initDVFundEntity.vault.contractAbi,
    address: initDVFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'referrerOf',
    args: [walletAccount.address!],
    account: walletAccount.address!,
    query: {
      enabled: walletAccount.status === 'connected',
      placeholderData: zeroAddress
    }
  })

  // ** Vars
  const DEFAULT_REFERRER = '0x9f88194D0Ca48523A828e7535c35Ab5Ed50c2776'
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initDVFundEntity.baseCurrency)

  /* reward, totalReferrals, totalReferralDeposits */
  const [, totalReferrals, totalReferralDeposits] = meReferralInfo as bigint[]

  // ** Logics
  const handleReloadMeReferralInfo = () => {
    refetchMeReferralInfo()
    refetchMeReferrer()
  }

  return (
    <Stack spacing={6}>
      <Stack spacing={4}>
        <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
          <Stack>
            <Typography variant='subtitle1' component='p'>
              My Referral Information
            </Typography>
            <Typography variant='subtitle2' component='p'>
              Your all-time referral record
            </Typography>
          </Stack>

          <Stack alignSelf='stretch' alignItems='center' justifyContent='center'>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleReloadMeReferralInfo}
              sx={{ p: 1.5, minWidth: 38 }}
            >
              <Icon icon='mdi:reload' fontSize={20} />
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={4}>
          <Stack
            direction='row'
            alignSelf='stretch'
            alignItems='center'
            justifyContent='center'
            divider={
              <Divider flexItem sx={{ m: 0 }} orientation='vertical'>
                <CustomAvatar
                  skin='light'
                  color='secondary'
                  sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
                >
                  <Icon icon='mdi:plus-box-outline' />
                </CustomAvatar>
              </Divider>
            }
          >
            <Stack spacing={4} flex={1} alignItems='center' sx={{ py: 6 }}>
              <CustomAvatar skin='light' color='success' variant='rounded'>
                <Icon icon='mdi:users-group-outline' />
              </CustomAvatar>
              <Stack alignItems='center'>
                {isMeReferralInfoFetching || isMeReferralInfoLoading ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={24} />
                  </Stack>
                ) : (
                  <Typography sx={{ fontWeight: 600 }}>{`x ${totalReferrals}`}</Typography>
                )}
                <Typography variant='body2'>Total referee</Typography>
              </Stack>
            </Stack>

            <Stack spacing={4} flex={1} alignItems='center' sx={{ py: 6 }}>
              <CustomAvatar skin='light' color='success' variant='rounded'>
                <Icon icon='mdi:database-arrow-down-outline' />
              </CustomAvatar>
              <Stack alignItems='center'>
                {isMeReferralInfoFetching || isMeReferralInfoLoading ? (
                  <Stack alignItems='center' justifyContent='center'>
                    <Skeleton variant='text' width={100} height={24} />
                  </Stack>
                ) : (
                  <Typography sx={{ fontWeight: 600 }}>
                    {`${fundBaseCurrencyProperties.symbol} ${
                      typeof totalReferralDeposits === 'bigint'
                        ? getFormattedPriceUnit(N('20000000').div(N(10).pow(18)).toNumber())
                        : 0n
                    } ${fundBaseCurrencyProperties.currency}`}
                  </Typography>
                )}
                <Typography variant='body2'>{`Total referee's deposit`}</Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          <Stack alignItems='center'>
            {isMeReferrerLoading || isMeReferrerFetching ? (
              <Stack alignItems='center' justifyContent='center'>
                <Skeleton variant='text' width={100} height={24} />
              </Stack>
            ) : (
              <Typography sx={{ fontWeight: 600 }}>
                {meReferrer === zeroAddress
                  ? 'Not Linked'
                  : meReferrer === DEFAULT_REFERRER
                    ? `${themeConfig.templateName} Team`
                    : typeof meReferrer === 'string'
                      ? getFormattedEthereumAddress(meReferrer as string)
                      : 'Unknown'}
              </Typography>
            )}
            <Typography variant='body2'>My referrer</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={4}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Refer & Earn
        </Typography>

        <Stack
          spacing={2}
          alignItems='flex-start'
          justifyContent='center'
          divider={
            <Divider flexItem>
              <CustomAvatar
                skin='light'
                color='secondary'
                sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
              >
                <Icon icon='mdi:keyboard-arrow-down' />
              </CustomAvatar>
            </Divider>
          }
        >
          <Stack direction='row' spacing={4} alignItems='flex-start' justifyContent='center'>
            <CustomAvatar skin='light' color='success' variant='rounded'>
              <Icon icon='mdi:number-1-box-outline' />
            </CustomAvatar>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Send Invitation 👍🏻</Typography>
              <Typography variant='body2'>Send your referral link to your friend</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={4} alignItems='flex-start' justifyContent='center'>
            <CustomAvatar skin='light' color='success' variant='rounded'>
              <Icon icon='mdi:number-2-box-outline' />
            </CustomAvatar>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Registration 😎</Typography>
              <Typography variant='body2'>Let them register to our services</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={4} alignItems='flex-start' justifyContent='center'>
            <CustomAvatar skin='light' color='success' variant='rounded'>
              <Icon icon='mdi:number-3-box-outline' />
            </CustomAvatar>
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Gain 25% of Referee Interest 😇</Typography>
              <Typography variant='body2'>You can share 25% of the interest reward</Typography>
              <Typography variant='body2'>once your referee claims it.</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PublicFundDefiVaultMyReferralInformationStack
