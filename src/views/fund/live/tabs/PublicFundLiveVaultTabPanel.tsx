// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import PublicFundLiveVaultAverageAPYCard from 'src/views/fund/live/cards/PublicFundLiveVaultAverageAPYCard'
import PublicFundLiveVaultTVLCard from 'src/views/fund/live/cards/PublicFundLiveVaultTVLCard'
import PublicFundLiveVaultTotalStakedCard from 'src/views/fund/live/cards/PublicFundLiveVaultTotalStakedCard'
import PublicFundLiveVaultSFTListGrid from 'src/views/fund/live/grids/PublicFundLiveVaultSFTListGrid'

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
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={6}>
          <PublicFundLiveVaultAverageAPYCard />
        </Grid>
        <Grid item xs={6} md={3}>
          <PublicFundLiveVaultTVLCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={6} md={3}>
          <PublicFundLiveVaultTotalStakedCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveVaultSFTListGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default PublicFundLiveVaultTabPanel
