// ** MUI Imports
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { useReadContract } from 'wagmi'
import { ExactNumber as N } from 'exactnumber'

// ** Custom Component Imports
import CustomChip from 'src/@core/components/mui/chip'
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
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveVaultBalanceCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const { data: vaultBalance, isLoading: isVaultBalanceLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: getBaseCurrencyABI(initFundEntity.chain, initFundEntity.baseCurrency),
    address: getBaseCurrencyAddress(initFundEntity.chain, initFundEntity.baseCurrency),
    functionName: 'balanceOf',
    args: [initFundEntity.vault.contractAddress as string],
    query: {
      enabled: initFundEntity?.vault?.contractAddress !== undefined,
      placeholderData: 0n
    }
  })

  // ** Vars
  const fundBaseCurrencyProperties = getFundCurrencyProperties(initFundEntity.baseCurrency)

  return (
    <Card>
      <CardContent>
        <Stack spacing={4} alignItems='flex-start' justifyContent='center'>
          <Stack direction='row' alignSelf='stretch' alignItems='flex-start' justifyContent='space-between'>
            <CustomAvatar skin='light' variant='rounded' color='warning'>
              <Icon icon='mdi:account-balance' />
            </CustomAvatar>
            <Stack direction='row' sx={{ color: 'success.main' }}>
              <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
                +22%
              </Typography>
              <Icon icon='mdi:chevron-up' fontSize='1.25rem' />
            </Stack>
          </Stack>
          <Box sx={{ pt: 2 }}>
            {isVaultBalanceLoading ? (
              <Skeleton variant='text' width={100} height={32} />
            ) : (
              <Stack direction='row' sx={{ position: 'relative' }}>
                <Typography variant='h6' component='p'>
                  {`${fundBaseCurrencyProperties.symbol} ${
                    typeof vaultBalance === 'bigint'
                      ? getFormattedPriceUnit(
                          N(vaultBalance).div(N(10).pow(fundBaseCurrencyProperties.decimals)).toNumber()
                        )
                      : 0n
                  } ${fundBaseCurrencyProperties.currency}`}
                </Typography>
              </Stack>
            )}
            <Typography variant='body2' sx={{ mb: 2 }}>
              Value Balance
            </Typography>
          </Box>
          <CustomChip
            skin='light'
            size='small'
            label='Last 4 Month'
            rounded
            color='secondary'
            sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', alignSelf: 'flex-start', color: 'text.secondary' }}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PublicFundLiveVaultBalanceCard
