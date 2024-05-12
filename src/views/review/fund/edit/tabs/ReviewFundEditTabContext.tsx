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
import ReviewFundEditOverviewTabPanel from 'src/views/review/fund/edit/tabs/ReviewFundEditOverviewTabPanel'
import ReviewFundEditDetailTabPanel from 'src/views/review/fund/edit/tabs/ReviewFundEditDetailTabPanel'
import ReviewFundEditTokenTabPanel from 'src/views/review/fund/edit/tabs/ReviewFundEditTokenTabPanel'
import ReviewFundEditVaultTabPanel from 'src/views/review/fund/edit/tabs/ReviewFundEditVaultTabPanel'
import ReviewFundEditSecurityTabPanel from 'src/views/review/fund/edit/tabs/ReviewFundEditSecurityTabPanel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { SyntheticEvent } from 'react'
import type { TabListProps } from '@mui/lab/TabList'
import type { EditTabIndex, FundType } from 'src/types/fundTypes'

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

const ReviewFundEditTabContext = (props: Props) => {
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
      .push(`/review/fund/edit/${initFundEntity.id}/${newTabIndex.toLowerCase()}`)
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
            aria-label='customized tabs example'
          >
            <Tab
              value='overview'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Icon icon='mdi:view-dashboard-outline' />
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
              <Typography>載入中...</Typography>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <ReviewFundEditOverviewTabPanel initFundEntity={initFundEntity} />
            <ReviewFundEditDetailTabPanel initFundEntity={initFundEntity} />
            <ReviewFundEditTokenTabPanel initFundEntity={initFundEntity} />
            <ReviewFundEditVaultTabPanel initFundEntity={initFundEntity} />
            <ReviewFundEditSecurityTabPanel initFundEntity={initFundEntity} />
          </Grid>
        )}
      </Grid>
    </TabContext>
  )
}

export default ReviewFundEditTabContext
