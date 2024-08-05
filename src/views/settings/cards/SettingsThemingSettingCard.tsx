// ** MUI Imports
import { lighten } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// ** Third-Party Imports
import { useTranslation } from 'react-i18next'

// ** Custom Component Imports
import ThemeConfigSelectBox from 'src/views/settings/select-box/ThemeConfigSelectBox'
import ThemeColorSelectBox from 'src/views/settings/select-box/ThemeColorSelectBox'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Type Imports
import type { Settings } from 'src/@core/context/settingsContext'
import type { Skin, Mode, ThemeColor } from 'src/@core/layouts/types'

const SettingsThemingSettingCard = () => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const { t } = useTranslation()

  // ** Vars
  const { mode, skin, themeColor } = settings

  // ** Logics
  const handleChange = (field: keyof Settings, value: Settings[keyof Settings]): void => {
    saveSettings({ ...settings, [field]: value })
  }

  return (
    <Card>
      <CardHeader title={t('general-settings::Theme Settings.CardTitle')} />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>{t('general-settings::Theme Settings.Skin.SectionTitle')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={6} sm='auto'>
                <ThemeConfigSelectBox
                  selected={skin}
                  value='default'
                  image={
                    mode === 'light'
                      ? `/images/settings/theming/default.svg`
                      : `/images/settings/theming/default-dark.svg`
                  }
                  title={t('general-settings::Theme Settings.Skin.Default')}
                  color='primary'
                  handleClick={() => handleChange('skin', 'default' as Skin)}
                />
              </Grid>
              <Grid item xs={6} sm='auto'>
                <ThemeConfigSelectBox
                  selected={skin}
                  value='bordered'
                  image={
                    mode === 'light'
                      ? `/images/settings/theming/bordered.svg`
                      : `/images/settings/theming/bordered-dark.svg`
                  }
                  title={t('general-settings::Theme Settings.Skin.Bordered')}
                  color='primary'
                  handleClick={() => handleChange('skin', 'bordered' as Skin)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>{t('general-settings::Theme Settings.Mode.SectionTitle')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={6} sm='auto'>
                <ThemeConfigSelectBox
                  selected={mode}
                  value='light'
                  image={
                    mode === 'light' ? `/images/settings/theming/light.svg` : `/images/settings/theming/light-dark.svg`
                  }
                  title={t('general-settings::Theme Settings.Mode.Light')}
                  color='primary'
                  handleClick={() => handleChange('mode', 'light' as Mode)}
                />
              </Grid>
              <Grid item xs={6} sm='auto'>
                <ThemeConfigSelectBox
                  selected={mode}
                  value='dark'
                  image={
                    mode === 'light' ? `/images/settings/theming/dark.svg` : `/images/settings/theming/dark-dark.svg`
                  }
                  title={t('general-settings::Theme Settings.Mode.Dark')}
                  color='primary'
                  handleClick={() => handleChange('mode', 'dark' as Mode)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>
              {t('general-settings::Theme Settings.Primary Color.SectionTitle')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='primary'
                  handleClick={() => handleChange('themeColor', 'primary' as ThemeColor)}
                  sx={{
                    backgroundColor: '#666CFF',
                    border: `5px solid ${lighten('#666CFF', 0.1)}`
                  }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='secondary'
                  handleClick={() => handleChange('themeColor', 'secondary' as ThemeColor)}
                  sx={{
                    backgroundColor: 'secondary.main',
                    border: theme => `5px solid ${lighten(theme.palette.secondary.main, 0.1)}`
                  }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='success'
                  handleClick={() => handleChange('themeColor', 'success' as ThemeColor)}
                  sx={{
                    backgroundColor: 'success.main',
                    border: theme => `5px solid ${lighten(theme.palette.success.main, 0.1)}`
                  }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='error'
                  handleClick={() => handleChange('themeColor', 'error' as ThemeColor)}
                  sx={{
                    backgroundColor: 'error.main',
                    border: theme => `5px solid ${lighten(theme.palette.error.main, 0.1)}`
                  }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='warning'
                  handleClick={() => handleChange('themeColor', 'warning' as ThemeColor)}
                  sx={{
                    backgroundColor: 'warning.main',
                    border: theme => `5px solid ${lighten(theme.palette.warning.main, 0.1)}`
                  }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='info'
                  handleClick={() => handleChange('themeColor', 'info' as ThemeColor)}
                  sx={{
                    backgroundColor: 'info.main',
                    border: theme => `5px solid ${lighten(theme.palette.info.main, 0.1)}`
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SettingsThemingSettingCard
