// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLiveVaultTabPanel = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  console.log(
    '🚀 ~ src/views/management/fund/preview/tabs/ManagementFundPreviewMintTabPanel.tsx:16 > initFundEntity',
    initFundEntity
  )

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack>
            <Typography variant='h5'>Staking Information</Typography>
            <Typography variant='body2'>
              You can learn about the operation of funds from the following plans, and you will have the corresponding
              fund rights after minting
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          Vault
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
          My SFT List
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default PublicFundLiveVaultTabPanel
