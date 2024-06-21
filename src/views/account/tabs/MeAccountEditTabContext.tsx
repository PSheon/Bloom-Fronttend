// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MuiTab from '@mui/material/Tab'

// ** Custom Component Imports
import WalletConnectCard from 'src/views/shared/wallet-connect-card'
import MeAccountOverviewSocialAccountCard from 'src/views/account/cards/MeAccountOverviewSocialAccountCard'
import MeAccountOverviewActivityLogListCard from 'src/views/account/cards/MeAccountOverviewActivityLogListCard'
import MeAccountSecurityChangePasswordCard from 'src/views/account/cards/MeAccountSecurityChangePasswordCard'
import MeAccountSecurityAccessLogListCard from 'src/views/account/cards/MeAccountSecurityAccessLogListCard'
import MeAccountSecurityDangerZoneCard from 'src/views/account/cards/MeAccountSecurityDangerZoneCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { SyntheticEvent } from 'react'
import type { TabProps } from '@mui/material/Tab'

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const MeAccountEditTabContext = () => {
  // ** States
  const [activeTab, setActiveTab] = useState<string>('overview')

  // ** Logics
  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='overview' label='Overview' icon={<Icon icon='mdi:view-dashboard-outline' />} />
        <Tab value='security' label='Security' icon={<Icon icon='mdi:lock-outline' />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='overview'>
          <Grid container spacing={6} className='match-height'>
            <Grid item xs={12} sm={7}>
              <WalletConnectCard />
            </Grid>
            <Grid item xs={12} sm={5}>
              <MeAccountOverviewSocialAccountCard />
            </Grid>
            <Grid item xs={12}>
              <MeAccountOverviewActivityLogListCard />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <MeAccountSecurityChangePasswordCard />
            </Grid>
            <Grid item xs={12}>
              <MeAccountSecurityAccessLogListCard />
            </Grid>
            <Grid item xs={12}>
              <MeAccountSecurityDangerZoneCard />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default MeAccountEditTabContext
