// ** React Imports
import { SyntheticEvent } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import MuiTabs, { TabsProps } from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Stack from '@mui/material/Stack'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Utils Import
import { getRequestSheetTabListAttributes } from 'src/utils'

// ** Types Imports
import { TabIndex } from 'src/types/api/requestSheetTypes'

const Tabs = styled(MuiTabs)<TabsProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 35,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  },
  '& .MuiTabs-scrollButtons.Mui-disabled': {
    opacity: 0.3
  }
}))

interface Props {
  selectedTab: TabIndex
  handleChangeTab: (event: SyntheticEvent, newTabIndex: TabIndex) => void
}

const TabList = (props: Props) => {
  // ** Props
  const { selectedTab, handleChangeTab } = props

  // ** Hooks
  const bgColors = useBgColor()

  return (
    <Tabs
      value={selectedTab}
      variant='scrollable'
      scrollButtons
      allowScrollButtonsMobile
      aria-label='request-sheet-edit-tabs-list'
      onChange={handleChangeTab}
      sx={{
        '& .Mui-selected': {
          backgroundColor: bgColors['primaryLight'].backgroundColor,
          color: `${bgColors['primaryLight'].color} !important`
        }
      }}
    >
      <Tab
        value='details'
        label={
          <Stack direction='row' alignItems='center' sx={{ '& svg': { mr: 2 } }}>
            <Icon icon={getRequestSheetTabListAttributes('details').icon} />
            {getRequestSheetTabListAttributes('details').displayName}
          </Stack>
        }
      />
      <Tab
        value='initialReview'
        label={
          <Stack direction='row' alignItems='center' sx={{ '& svg': { mr: 2 } }}>
            <Icon icon={getRequestSheetTabListAttributes('initialReview').icon} />
            {getRequestSheetTabListAttributes('initialReview').displayName}
          </Stack>
        }
      />
      <Tab
        value='secondaryReview'
        label={
          <Stack direction='row' alignItems='center' sx={{ '& svg': { mr: 2 } }}>
            <Icon icon={getRequestSheetTabListAttributes('secondaryReview').icon} />
            {getRequestSheetTabListAttributes('secondaryReview').displayName}
          </Stack>
        }
      />
    </Tabs>
  )
}

export default TabList
