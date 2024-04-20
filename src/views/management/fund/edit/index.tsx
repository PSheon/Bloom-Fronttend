// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementFundEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementFundEditProfileHeaderCard from 'src/views/management/fund/edit/cards/ManagementFundEditProfileHeaderCard'
import ManagementFundEditTabContext from 'src/views/management/fund/edit/tabs/ManagementFundEditTabContext'

// ** Type Imports
import { FundType, TabIndex } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
  tab: TabIndex
}

const ManagementFundEditSection = (props: Props) => {
  // ** Props
  const { initFundEntity, tab } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementFundEditBreadcrumbs
          pageLevels={[{ title: '資金管理', href: '/management/fund/list' }, { title: '編輯資金' }]}
        />
      </Grid>
      <Grid item xs={12}>
        <ManagementFundEditProfileHeaderCard initFundEntity={initFundEntity} />
      </Grid>
      <Grid item xs={12}>
        <ManagementFundEditTabContext initFundEntity={initFundEntity} tab={tab} />
      </Grid>
    </Grid>
  )
}

export default ManagementFundEditSection
