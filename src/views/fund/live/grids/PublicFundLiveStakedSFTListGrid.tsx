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
import PublicFundLiveOwnedSFTSkeletonCard from 'src/views/fund/live/cards/owned-sft/PublicFundLiveOwnedSFTSkeletonCard'

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

  const { data: ownedStakedSFTBalance, isLoading: isOwnedStakedSFTBalanceLoading } = useReadContract({
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
      {isOwnedStakedSFTBalanceLoading ? (
        [...Array(3).keys()].map(index => (
          <Grid key={`public-fund-live-skeleton-${index}`} item xs={12} sm={6} md={4}>
            <PublicFundLiveOwnedSFTSkeletonCard />
          </Grid>
        ))
      ) : stakedSFTBalanceCount === 0 ? (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={4} alignItems='center' justifyContent='center'>
                <CustomAvatar skin='light' sx={{ width: 56, height: 56 }}>
                  <Icon icon='mdi:warning-circle-outline' fontSize='2rem' />
                </CustomAvatar>
                <Typography variant='h6' component='p'>
                  Do not have any SFT yet
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        [...Array(stakedSFTBalanceCount).keys()].map(sftIndex => (
          <Grid key={`staked-sft-token-${sftIndex}`} item xs={12} sm={6} md={4}>
            <PublicFundLiveStakedSFTCard initFundEntity={initFundEntity} sftIndex={sftIndex} />
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default PublicFundLiveStakedSFTListGrid
