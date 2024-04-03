// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import SettingsBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import SettingsSystemProfileCard from 'src/views/settings/cards/SettingsSystemProfileCard'
import SettingsThemingSettingCard from 'src/views/settings/cards/SettingsThemingSettingCard'
import SettingsLayoutSettingCard from 'src/views/settings/cards/SettingsLayoutSettingCard'
import SettingsMenuSettingCard from 'src/views/settings/cards/SettingsMenuSettingCard'

const SettingsPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SettingsBreadcrumbs pageLevels={[{ title: '網站設定' }]} />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <SettingsSystemProfileCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <SettingsThemingSettingCard />
          </Grid>
          <Grid item xs={12}>
            <SettingsLayoutSettingCard />
          </Grid>
          <Grid item xs={12}>
            <SettingsMenuSettingCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

SettingsPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default SettingsPage
