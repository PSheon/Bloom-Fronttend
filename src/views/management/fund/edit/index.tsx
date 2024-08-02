// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementFundEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementFundEditProfileHeaderCard from 'src/views/management/fund/edit/cards/ManagementFundEditProfileHeaderCard'
import ManagementFundEditTabContext from 'src/views/management/fund/edit/tabs/ManagementFundEditTabContext'

// ** Type Imports
import type { FundType, EditTabIndex } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
  tab: EditTabIndex
}

const ManagementFundEditSection = (props: Props) => {
  // ** Props
  const { initFundEntity, tab } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementFundEditBreadcrumbs
          pageLevels={[
            { title: 'PageBreadcrumb.Management.Funds.PageTitle', href: '/management/fund/list' },
            { title: 'PageBreadcrumb.Management.Funds.Edit.PageTitle' }
          ]}
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
