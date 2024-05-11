// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { SyntheticEvent } from 'react'
import type { TabProps } from '@mui/material/Tab'

// ** Styled Tab component
const StyledTab = styled(Tab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const PublicBlogListHeaderGrid = () => {
  // ** States
  const [activeTab, setActiveTab] = useState<string>('All')

  // ** Logics
  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <Grid container spacing={6} alignItems='center' justifyContent='center' sx={{ mt: 6, mb: 12 }}>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='forced scroll tabs example'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <StyledTab value='All' label='All' icon={<Icon icon='mdi:account-outline' />} />
            <StyledTab value='Engineering' label='Engineering' icon={<Icon icon='mdi:lock-outline' />} />
            <StyledTab value='Community' label='Community' icon={<Icon icon='mdi:lock-outline' />} />
            <StyledTab value='Company News' label='Company News' icon={<Icon icon='mdi:lock-outline' />} />
            <StyledTab value='Customer Stories' label='Customer Stories' icon={<Icon icon='mdi:lock-outline' />} />
            <StyledTab value='Changelog' label='Changelog' icon={<Icon icon='mdi:lock-outline' />} />
            <StyledTab value='Press' label='Press' icon={<Icon icon='mdi:lock-outline' />} />
          </TabList>
        </TabContext>
      </Grid>
      <Grid item xs={12} sx={{ mt: 6 }}>
        <Typography variant='h3' sx={{ fontWeight: 600, lineHeight: 1.17 }}>
          {activeTab}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PublicBlogListHeaderGrid
