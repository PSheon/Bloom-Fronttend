// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Third-Party Imports
import { useAccount, useReadContract } from 'wagmi'

// ** Core Component Imports
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Imports
import PublicFundLiveAwardCard from 'src/views/fund/live/cards/PublicFundLiveAwardCard'
import PublicFundLiveOwnedSFTCard from 'src/views/fund/live/cards/owned-sft/PublicFundLiveOwnedSFTCard'
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

const PublicFundLiveVaultTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const { data: sftTokenBalance, isLoading: isSftTokenBalanceLoading } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.sft.contractAbi,
    address: initFundEntity.sft.contractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [walletAccount.address!],
    account: walletAccount.address!
  })

  // ** Vars
  const sftTokenBalanceCount = Number(sftTokenBalance ?? 0)

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <PublicFundLiveAwardCard />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='155k'
            color='primary'
            trendNumber='+22%'
            title='Total Orders'
            chipText='Last 4 Month'
            icon={<Icon icon='mdi:cart-plus' />}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='$13.4k'
            color='success'
            trendNumber='+38%'
            title='Total Sales'
            chipText='Last Six Month'
            icon={<Icon icon='mdi:currency-usd' />}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>My SFT</Typography>
            <Typography variant='body2'>
              List of SFTs that you have staked in the fund. You can redeem the SFTs at any time
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6} className='match-height'>
            {isSftTokenBalanceLoading ? (
              [...Array(3).keys()].map(index => (
                <Grid key={`public-fund-live-skeleton-${index}`} item xs={12} sm={6} md={4}>
                  <PublicFundLiveOwnedSFTSkeletonCard />
                </Grid>
              ))
            ) : sftTokenBalanceCount === 0 ? (
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
              [...Array(sftTokenBalanceCount).keys()].map(sftTokenIndex => (
                <Grid key={`sft-token-${sftTokenIndex}`} item xs={12} sm={6} md={4}>
                  <PublicFundLiveOwnedSFTCard initFundEntity={initFundEntity} sftTokenIndex={sftTokenIndex} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default PublicFundLiveVaultTabPanel
