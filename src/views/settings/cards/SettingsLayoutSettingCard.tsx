// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// ** Third-Party Imports
import { useTranslation } from 'react-i18next'

// ** Custom Component Imports
import ThemeConfigSelectBox from 'src/views/settings/select-box/ThemeConfigSelectBox'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Type Imports
import type { Settings } from 'src/@core/context/settingsContext'
import type { ContentWidth, AppBar } from 'src/@core/layouts/types'

const SettingsLayoutSettingCard = () => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const { t } = useTranslation()

  // ** Vars
  const { mode, contentWidth, appBar = 'fixed' } = settings

  // ** Logics
  const handleChange = (field: keyof Settings, value: Settings[keyof Settings]): void => {
    saveSettings({ ...settings, [field]: value })
  }

  return (
    <Card>
      <CardHeader title={t('general-settings::Layout Settings.CardTitle')} />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>
              {t('general-settings::Layout Settings.Content Width.SectionTitle')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={6} sm='auto'>
                <ThemeConfigSelectBox
                  selected={contentWidth}
                  value='full'
                  image={
                    mode === 'light' ? `/images/settings/layout/full.svg` : `/images/settings/layout/full-dark.svg`
                  }
                  title={t('general-settings::Layout Settings.Content Width.Full')}
                  color='primary'
                  handleClick={() => handleChange('contentWidth', 'full' as ContentWidth)}
                />
              </Grid>
              <Grid item xs={6} sm='auto'>
                <ThemeConfigSelectBox
                  selected={contentWidth}
                  value='boxed'
                  image={
                    mode === 'light' ? `/images/settings/layout/boxed.svg` : `/images/settings/layout/boxed-dark.svg`
                  }
                  title={t('general-settings::Layout Settings.Content Width.Boxed')}
                  color='primary'
                  handleClick={() => handleChange('contentWidth', 'boxed' as ContentWidth)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>
              {t('general-settings::Layout Settings.AppBar Type.SectionTitle')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={4} sm='auto'>
                <ThemeConfigSelectBox
                  selected={appBar}
                  value='fixed'
                  image={
                    mode === 'light' ? `/images/settings/layout/fixed.svg` : `/images/settings/layout/fixed-dark.svg`
                  }
                  title={t('general-settings::Layout Settings.AppBar Type.Fixed')}
                  color='primary'
                  handleClick={() => handleChange('appBar', 'fixed' as AppBar)}
                />
              </Grid>
              <Grid item xs={4} sm='auto'>
                <ThemeConfigSelectBox
                  selected={appBar}
                  value='hidden'
                  image={
                    mode === 'light' ? `/images/settings/layout/hidden.svg` : `/images/settings/layout/hidden-dark.svg`
                  }
                  title={t('general-settings::Layout Settings.AppBar Type.Hidden')}
                  color='primary'
                  handleClick={() => handleChange('appBar', 'hidden' as AppBar)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SettingsLayoutSettingCard
