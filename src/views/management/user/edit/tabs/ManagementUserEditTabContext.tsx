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
import ManagementUserEditActivityLogListCard from 'src/views/management/user/edit/cards/ManagementUserEditActivityLogListCard'
import ManagementUserEditAccessLogListCard from 'src/views/management/user/edit/cards/ManagementUserEditAccessLogListCard'
import ManagementUserEditDangerZoneCard from 'src/views/management/user/edit/cards/ManagementUserEditDangerZoneCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { SyntheticEvent } from 'react'
import type { TabProps } from '@mui/material/Tab'
import type { UserDataType } from 'src/types/authTypes'

// ** Styled Tab Component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

interface Props {
  initUserEntity: UserDataType
}

const ManagementUserEditTabContext = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

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
              {/* TODO */}
              Positions Card
            </Grid>
            <Grid item xs={12}>
              <ManagementUserEditActivityLogListCard initUserEntity={initUserEntity} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementUserEditAccessLogListCard initUserEntity={initUserEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementUserEditDangerZoneCard initUserEntity={initUserEntity} />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default ManagementUserEditTabContext
