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
import ManagementFundPreviewOwnedSFTCard from 'src/views/management/fund/preview/cards/owned-sft/ManagementFundPreviewOwnedSFTCard'
import ManagementFundPreviewOwnedSFTSkeletonCard from 'src/views/management/fund/preview/cards/owned-sft/ManagementFundPreviewOwnedSFTSkeletonCard'

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

const ManagementFundPreviewOwnedSFTListGrid = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const walletAccount = useAccount()

  const {
    data: sftBalance,
    isLoading: isSftBalanceLoading,
    isFetching: isSftBalanceFetching
  } = useReadContract({
    chainId: getChainId(initFundEntity.chain) as (typeof wagmiConfig)['chains'][number]['id'],
    abi: initFundEntity.sft.contractAbi,
    address: initFundEntity.sft.contractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [walletAccount.address!],
    account: walletAccount.address!
  })

  // ** Vars
  const sftBalanceCount = Number(sftBalance ?? 0)

  return (
    <Grid container spacing={6} className='match-height'>
      {isSftBalanceLoading || isSftBalanceFetching ? (
        [...Array(3).keys()].map(index => (
          <Grid key={`management-fund-preview-skeleton-${index}`} item xs={12} sm={6} md={4}>
            <ManagementFundPreviewOwnedSFTSkeletonCard />
          </Grid>
        ))
      ) : sftBalanceCount === 0 ? (
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
        [...Array(sftBalanceCount).keys()].map(sftIndex => (
          <Grid key={`sft-${sftIndex}`} item xs={12} sm={6} md={4}>
            <ManagementFundPreviewOwnedSFTCard initFundEntity={initFundEntity} sftIndex={sftIndex} />
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default ManagementFundPreviewOwnedSFTListGrid
