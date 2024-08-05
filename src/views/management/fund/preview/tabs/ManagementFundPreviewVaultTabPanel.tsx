// ** MUI Imports
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementFundPreviewVaultNotPublishedCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewVaultNotPublishedCard'
import ManagementFundPreviewVaultTotalStakedCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewVaultTotalStakedCard'
import ManagementFundPreviewVaultTVLCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewVaultTVLCard'
import ManagementFundPreviewVaultTVCCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewVaultTVCCard'
import ManagementFundPreviewVaultBalanceCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewVaultBalanceCard'
import ManagementFundPreviewVaultSFTWalletCheckGrid from 'src/views/management/fund/preview/grids/ManagementFundPreviewVaultSFTWalletCheckGrid'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundPreviewVaultTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      {initFundEntity.vault === null ? (
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            <ManagementFundPreviewVaultNotPublishedCard />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={6} md={3}>
            <ManagementFundPreviewVaultTotalStakedCard initFundEntity={initFundEntity} />
          </Grid>
          <Grid item xs={6} md={3}>
            <ManagementFundPreviewVaultTVLCard initFundEntity={initFundEntity} />
          </Grid>
          <Grid item xs={6} md={3}>
            <ManagementFundPreviewVaultTVCCard initFundEntity={initFundEntity} />
          </Grid>
          <Grid item xs={6} md={3}>
            <ManagementFundPreviewVaultBalanceCard initFundEntity={initFundEntity} />
          </Grid>
          <Grid item xs={12}>
            <ManagementFundPreviewVaultSFTWalletCheckGrid initFundEntity={initFundEntity} />
          </Grid>
        </Grid>
      )}
    </TabPanel>
  )
}

export default ManagementFundPreviewVaultTabPanel
