// ** MUI Imports
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import PublicFundLiveVaultNotPublishedCard from 'src/views/fund/live/cards/PublicFundLiveVaultNotPublishedCard'
import PublicFundLiveVaultTotalStakedCard from 'src/views/fund/live/cards/PublicFundLiveVaultTotalStakedCard'
import PublicFundLiveVaultTVLCard from 'src/views/fund/live/cards/PublicFundLiveVaultTVLCard'
import PublicFundLiveVaultTVCCard from 'src/views/fund/live/cards/PublicFundLiveVaultTVCCard'
import PublicFundLiveVaultBalanceCard from 'src/views/fund/live/cards/PublicFundLiveVaultBalanceCard'
import PublicFundLiveVaultSFTWalletCheckGrid from 'src/views/fund/live/grids/PublicFundLiveVaultSFTWalletCheckGrid'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveVaultTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      {initFundEntity.vault === null ? (
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <PublicFundLiveVaultNotPublishedCard />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={6} md={3}>
            <PublicFundLiveVaultTotalStakedCard initFundEntity={initFundEntity} />
          </Grid>
          <Grid item xs={6} md={3}>
            <PublicFundLiveVaultTVLCard initFundEntity={initFundEntity} />
          </Grid>
          <Grid item xs={6} md={3}>
            <PublicFundLiveVaultTVCCard initFundEntity={initFundEntity} />
          </Grid>
          <Grid item xs={6} md={3}>
            <PublicFundLiveVaultBalanceCard initFundEntity={initFundEntity} />
          </Grid>
          <Grid item xs={12}>
            <PublicFundLiveVaultSFTWalletCheckGrid initFundEntity={initFundEntity} />
          </Grid>
        </Grid>
      )}
    </TabPanel>
  )
}

export default PublicFundLiveVaultTabPanel
