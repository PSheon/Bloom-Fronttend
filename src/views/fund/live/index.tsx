// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import PublicFundLiveBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import PublicFundLiveProfileHeaderCard from 'src/views/fund/live/cards/PublicFundLiveProfileHeaderCard'
import PublicFundLiveTabContext from 'src/views/fund/live/tabs/PublicFundLiveTabContext'

// ** Type Imports
import type { FundType, LiveTabIndex } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
  tab: LiveTabIndex
}

const PublicFundLiveSection = (props: Props) => {
  // ** Props
  const { initFundEntity, tab } = props

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <PublicFundLiveBreadcrumbs
            pageLevels={[{ title: '公開資金列表', href: '/fund/list' }, { title: `資金 #${initFundEntity.id}` }]}
          />
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveProfileHeaderCard initFundEntity={initFundEntity} />
        </Grid>
        <Grid item xs={12}>
          <PublicFundLiveTabContext initFundEntity={initFundEntity} tab={tab} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default PublicFundLiveSection
