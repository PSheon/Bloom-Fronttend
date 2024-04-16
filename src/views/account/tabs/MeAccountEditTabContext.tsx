// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Custom Component Imports
import MeAccountActivityLogListCard from 'src/views/account/cards/MeAccountActivityLogListCard'
import MeAccountChangePasswordCard from 'src/views/account/cards/MeAccountChangePasswordCard'
import MeAccountAccessLogListCard from 'src/views/account/cards/MeAccountAccessLogListCard'
import MeAccountDangerZoneCard from 'src/views/account/cards/MeAccountDangerZoneCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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
        <Tab value='overview' label='概覽' icon={<Icon icon='mdi:account-outline' />} />
        <Tab value='security' label='安全' icon={<Icon icon='mdi:lock-outline' />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='overview'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <MeAccountActivityLogListCard />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <MeAccountChangePasswordCard />
            </Grid>
            <Grid item xs={12}>
              <MeAccountAccessLogListCard />
            </Grid>
            <Grid item xs={12}>
              <MeAccountDangerZoneCard />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default MeAccountEditTabContext
