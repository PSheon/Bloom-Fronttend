// ** MUI Imports
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Core Component Imports
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Custom Component Imports
import ManagementFundPreviewAwardCard from 'src/views/management/fund/preview/cards/ManagementFundPreviewAwardCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ManagementFundPreviewVaultTabPanel = (props: Props) => {
  // ** Props
  const {
    /* initFundEntity */
  } = props

  return (
    <TabPanel sx={{ p: 0 }} value='vault'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <ManagementFundPreviewAwardCard />
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
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>My SFT</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>My SFT</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>My SFT</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>My SFT</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default ManagementFundPreviewVaultTabPanel
