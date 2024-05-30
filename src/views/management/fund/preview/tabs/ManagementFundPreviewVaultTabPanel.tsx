// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Component Imports
import ManagementFundPreviewVaultAverageAPYCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewVaultAverageAPYCard'
import ManagementFundPreviewVaultTVLCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewVaultTVLCard'
import ManagementFundPreviewVaultTotalStakedCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewVaultTotalStakedCard'
import ManagementFundPreviewVaultSFTListGrid from 'src/views/management/fund/preview/grids/ManagementFundPreviewVaultSFTListGrid'

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
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <ManagementFundPreviewVaultAverageAPYCard />
        </Grid>
        <Grid item xs={6} md={3}>
          <ManagementFundPreviewVaultTVLCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={6} md={3}>
          <ManagementFundPreviewVaultTotalStakedCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <ManagementFundPreviewVaultSFTListGrid initFundEntity={initFundEntity} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundPreviewVaultTabPanel
