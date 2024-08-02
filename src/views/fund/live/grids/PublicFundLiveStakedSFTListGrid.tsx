// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import PublicFundLiveStakedSFTCard from 'src/views/fund/live/cards/staked-sft/PublicFundLiveStakedSFTCard'
import PublicFundLiveStakedSFTSkeletonCard from 'src/views/fund/live/cards/staked-sft/PublicFundLiveStakedSFTSkeletonCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getChainId } from 'src/utils'

// ** Config Imports
import type { wagmiConfig } from 'src/configs/ethereum'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveStakedSFTListGrid = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const {
    data: ownedStakedSFTBalance,
    isLoading: isOwnedStakedSFTBalanceLoading,
    isFetching: isOwnedStakedSFTBalanceFetching
  } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.vault.contractAbi,
    address: initFundEntity.vault.contractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [walletAccount.address!],
    account: walletAccount.address!
  })

  // ** Vars
  const stakedSFTBalanceCount = Number(ownedStakedSFTBalance ?? 0)

  return (
    <Grid container spacing={6} className='match-height'>
      {isOwnedStakedSFTBalanceLoading || isOwnedStakedSFTBalanceFetching ? (
        [...Array(3).keys()].map(index => (
          <Grid key={`public-fund-live-staked-skeleton-${index}`} item xs={12} sm={6} md={4}>
            <PublicFundLiveStakedSFTSkeletonCard />
          </Grid>
        ))
      ) : stakedSFTBalanceCount === 0 ? (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={4} alignItems='center' justifyContent='center' sx={{ py: 12 }}>
                <CustomAvatar skin='light' color='warning' sx={{ width: 56, height: 56 }}>
                  <Icon icon='mdi:warning-circle-outline' fontSize='2rem' />
                </CustomAvatar>
                <Typography variant='h6' component='p'>
                  Do not have any staked SFT yet
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        [...Array(stakedSFTBalanceCount).keys()].map(sftIndex => (
          <Grid key={`public-fund-live-staked-sft-${sftIndex}`} item xs={12} md={6}>
            <PublicFundLiveStakedSFTCard initFundEntity={initFundEntity} sftIndex={sftIndex} />
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default PublicFundLiveStakedSFTListGrid
