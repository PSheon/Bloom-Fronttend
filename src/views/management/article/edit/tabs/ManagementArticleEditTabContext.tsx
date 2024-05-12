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
import ManagementArticleEditOverviewStatisticsCard from 'src/views/management/article/edit/cards/ManagementArticleEditOverviewStatisticsCard'
import ManagementArticleEditOverviewStatusCard from 'src/views/management/article/edit/cards/ManagementArticleEditOverviewStatusCard'
import ManagementArticleEditOverviewContentEditorCard from 'src/views/management/article/edit/cards/ManagementArticleEditOverviewContentEditorCard'
import ManagementArticleEditSecurityActivityTimelineCard from 'src/views/management/article/edit/cards/ManagementArticleEditSecurityActivityTimelineCard'
import ManagementArticleEditSecurityDangerZoneCard from 'src/views/management/article/edit/cards/ManagementArticleEditSecurityDangerZoneCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { SyntheticEvent } from 'react'
import type { TabProps } from '@mui/material/Tab'
import type { ArticleType } from 'src/types/articleTypes'

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

interface Props {
  initArticleEntity: ArticleType
}

const ManagementArticleEditTabContext = (props: Props) => {
  // ** Props
  const { initArticleEntity } = props

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
            <Grid item xs={12} md={7}>
              <ManagementArticleEditOverviewStatisticsCard />
            </Grid>
            <Grid item xs={12} md={5}>
              <ManagementArticleEditOverviewStatusCard />
            </Grid>
            <Grid item xs={12}>
              <ManagementArticleEditOverviewContentEditorCard initArticleEntity={initArticleEntity} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ManagementArticleEditSecurityActivityTimelineCard initArticleEntity={initArticleEntity} />
            </Grid>
            <Grid item xs={12}>
              <ManagementArticleEditSecurityDangerZoneCard initArticleEntity={initArticleEntity} />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default ManagementArticleEditTabContext
