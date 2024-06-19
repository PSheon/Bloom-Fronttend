// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import AccountBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import MeAccountEditProfileCard from 'src/views/account/cards/MeAccountEditProfileCard'
import MeAccountEditRoleCard from 'src/views/account/cards/MeAccountEditRoleCard'
import MeAccountEditMetadataCard from 'src/views/account/cards/MeAccountEditMetadataCard'
import MeAccountEditTabContext from 'src/views/account/tabs/MeAccountEditTabContext'

// ** Type Imports
import type { UserDataType } from 'src/types/authTypes'

interface Props {
  initMeUserEntity: UserDataType
}

const AccountSection = (props: Props) => {
  // ** Props
  const { initMeUserEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AccountBreadcrumbs pageLevels={[{ title: 'My Account' }]} />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MeAccountEditProfileCard initMeUserEntity={initMeUserEntity} />
          </Grid>
          <Grid item xs={12}>
            <MeAccountEditRoleCard initMeUserEntity={initMeUserEntity} />
          </Grid>
          <Grid item xs={12}>
            <MeAccountEditMetadataCard initMeUserEntity={initMeUserEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <MeAccountEditTabContext />
      </Grid>
    </Grid>
  )
}

export default AccountSection
