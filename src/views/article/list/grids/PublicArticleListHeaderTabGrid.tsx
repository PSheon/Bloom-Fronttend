// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'

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

interface Props {
  filteredCategory: string
  handleFilterCategoryChange: (newCategory: string) => void
}

const PublicArticleListHeaderTabGrid = (props: Props) => {
  // ** Props
  const { filteredCategory, handleFilterCategoryChange } = props

  // ** States
  const [activeTab, setActiveTab] = useState<string>(filteredCategory)

  // ** Logics
  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
    handleFilterCategoryChange(value)
  }

  return (
    <Grid item xs={12}>
      <TabContext value={activeTab}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='forced scroll tabs example'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <StyledTab value='all' label='All' />
          <StyledTab value='Engineering' label='Engineering' />
          <StyledTab value='Community' label='Community' />
          <StyledTab value='Company News' label='Company News' />
          <StyledTab value='Customer Stories' label='Customer Stories' />
          <StyledTab value='Changelog' label='Changelog' />
          <StyledTab value='Press' label='Press' />
        </TabList>
      </TabContext>
    </Grid>
  )
}

export default PublicArticleListHeaderTabGrid
