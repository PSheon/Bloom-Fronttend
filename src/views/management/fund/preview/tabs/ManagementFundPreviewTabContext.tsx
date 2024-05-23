// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// ** Custom Component Imports
import ManagementFundPreviewOverviewTabPanel from 'src/views/management/fund/preview/tabs/ManagementFundPreviewOverviewTabPanel'
import ManagementFundPreviewVaultTabPanel from 'src/views/management/fund/preview/tabs/ManagementFundPreviewVaultTabPanel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { SyntheticEvent } from 'react'
import type { TabListProps } from '@mui/lab/TabList'
import type { PreviewTabIndex, FundType } from 'src/types/fundTypes'

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
  tab: PreviewTabIndex
}

const ManagementFundPreviewTabContext = (props: Props) => {
  // ** Props
  const { initFundEntity, tab } = props

  // ** States
  const [activeTab, setActiveTab] = useState<PreviewTabIndex>(tab)
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  // ** Logics
  const handleChangeTab = (event: SyntheticEvent, newTabIndex: string) => {
    setIsTabLoading(true)
    router
      .push(`/management/fund/preview/${initFundEntity.id}/${newTabIndex.toLowerCase()}`)
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
            aria-label='management fund preview tabs'
          >
            <Tab
              value='overview'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='mdi:view-dashboard-outline' />
                  Overview
                </Box>
              }
            />
            <Tab
              value='vault'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='ph:vault-bold' />
                  Vault
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
            <ManagementFundPreviewOverviewTabPanel initFundEntity={initFundEntity} />
            <ManagementFundPreviewVaultTabPanel initFundEntity={initFundEntity} />
          </Grid>
        )}
      </Grid>
    </TabContext>
  )
}

export default ManagementFundPreviewTabContext
