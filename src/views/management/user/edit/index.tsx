// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { UserDataType } from 'src/context/types'

// ** Styled Component
import UserEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import UserEditProfileCard from 'src/views/management/user/edit/cards/UserEditProfileCard'
import UserEditRoleCard from 'src/views/management/user/edit/cards/UserEditRoleCard'
import UserEditMetadataCard from 'src/views/management/user/edit/cards/UserEditMetadataCard'
import UserEditTabContext from 'src/views/management/user/edit/tabs/UserEditTabContext'

interface Props {
  initUserEntity: UserDataType
}

const UserEditSection = (props: Props) => {
  // ** Props
  const { initUserEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserEditBreadcrumbs
          pageLevels={[{ title: '使用者管理', href: '/management/user/list' }, { title: '編輯使用者' }]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <UserEditProfileCard initUserEntity={initUserEntity} />
          </Grid>
          <Grid item xs={12}>
            <UserEditRoleCard initUserEntity={initUserEntity} />
          </Grid>
          <Grid item xs={12}>
            <UserEditMetadataCard initUserEntity={initUserEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserEditTabContext initUserEntity={initUserEntity} />
      </Grid>
    </Grid>
  )
}

export default UserEditSection
