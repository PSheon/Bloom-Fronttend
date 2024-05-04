// ** React Imports
import { useState, useEffect, SyntheticEvent } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabContext from '@mui/lab/TabContext'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// ** Custom Component Imports
import ManagementFundEditOverviewTabPanel from 'src/views/management/fund/edit/tabs/ManagementFundEditOverviewTabPanel'
import ManagementFundEditDetailTabPanel from 'src/views/management/fund/edit/tabs/ManagementFundEditDetailTabPanel'
import ManagementFundEditTokenTabPanel from 'src/views/management/fund/edit/tabs/ManagementFundEditTokenTabPanel'
import ManagementFundEditVaultTabPanel from 'src/views/management/fund/edit/tabs/ManagementFundEditVaultTabPanel'
import ManagementFundEditSecurityTabPanel from 'src/views/management/fund/edit/tabs/ManagementFundEditSecurityTabPanel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { EditTabIndex, FundType } from 'src/types/api/fundTypes'

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

interface Props {
  initFundEntity: FundType
  tab: EditTabIndex
}

const ManagementFundEditTabContext = (props: Props) => {
  // ** Props
  const { initFundEntity, tab } = props

  // ** States
  const [activeTab, setActiveTab] = useState<EditTabIndex>(tab)
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  // ** Logics
  const handleChangeTab = (event: SyntheticEvent, newTabIndex: string) => {
    setIsTabLoading(true)
    router
      .push(`/management/fund/edit/${initFundEntity.id}/${newTabIndex.toLowerCase()}`)
      .then(() => setIsTabLoading(false))
  }

  // ** Side Effects
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChangeTab}
            aria-label='management fund edit tabs'
          >
            <Tab
              value='overview'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='mdi:chart-arc' />
                  總攬
                </Box>
              }
            />
            <Tab
              value='detail'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='mdi:format-list-text' />
                  細節
                </Box>
              }
            />
            <Tab
              value='token'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='mdi:alpha-t-circle-outline' />
                  憑證
                </Box>
              }
            />
            <Tab
              value='vault'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='ph:vault-bold' />
                  金庫
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='mdi:lock-outline' />
                  安全
                </Box>
              }
            />
          </TabList>
        </Grid>
        {isTabLoading ? (
          <Grid item xs={12}>
            <Box sx={{ py: 40, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress sx={{ mb: 4 }} />
              <Typography>Loading...</Typography>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <ManagementFundEditOverviewTabPanel initFundEntity={initFundEntity} />
            <ManagementFundEditDetailTabPanel initFundEntity={initFundEntity} />
            <ManagementFundEditTokenTabPanel initFundEntity={initFundEntity} />
            <ManagementFundEditVaultTabPanel initFundEntity={initFundEntity} />
            <ManagementFundEditSecurityTabPanel initFundEntity={initFundEntity} />
          </Grid>
        )}
      </Grid>
    </TabContext>
  )
}

export default ManagementFundEditTabContext
