// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Custom Component Imports
import UserEditRequestSheetListCard from 'src/views/management/user/edit/cards/UserEditRequestSheetListCard'
import UserEditActivityLogListCard from 'src/views/management/user/edit/cards/UserEditActivityLogListCard'
import UserEditAccessLogListCard from 'src/views/management/user/edit/cards/UserEditAccessLogListCard'
import UserEditDangerZoneCard from 'src/views/management/user/edit/cards/UserEditDangerZoneCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { UserDataType } from 'src/context/types'

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

const UserEditTabContext = (props: Props) => {
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
              <UserEditRequestSheetListCard initUserEntity={initUserEntity} />
            </Grid>
            <Grid item xs={12}>
              <UserEditActivityLogListCard initUserEntity={initUserEntity} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <UserEditAccessLogListCard initUserEntity={initUserEntity} />
            </Grid>
            <Grid item xs={12}>
              <UserEditDangerZoneCard initUserEntity={initUserEntity} />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default UserEditTabContext
