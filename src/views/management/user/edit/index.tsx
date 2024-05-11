// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementUserEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementUserEditProfileCard from 'src/views/management/user/edit/cards/ManagementUserEditProfileCard'
import ManagementUserEditRoleCard from 'src/views/management/user/edit/cards/ManagementUserEditRoleCard'
import ManagementUserEditMetadataCard from 'src/views/management/user/edit/cards/ManagementUserEditMetadataCard'
import ManagementUserEditTabContext from 'src/views/management/user/edit/tabs/ManagementUserEditTabContext'

// ** Type Imports
import type { UserDataType } from 'src/types/api/authTypes'

interface Props {
  initUserEntity: UserDataType
}

const ManagementUserEditSection = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementUserEditBreadcrumbs
          pageLevels={[{ title: '使用者管理', href: '/management/user/list' }, { title: '編輯使用者' }]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ManagementUserEditProfileCard initUserEntity={initUserEntity} />
          </Grid>
          <Grid item xs={12}>
            <ManagementUserEditRoleCard initUserEntity={initUserEntity} />
          </Grid>
          <Grid item xs={12}>
            <ManagementUserEditMetadataCard initUserEntity={initUserEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ManagementUserEditTabContext initUserEntity={initUserEntity} />
      </Grid>
    </Grid>
  )
}

export default ManagementUserEditSection
