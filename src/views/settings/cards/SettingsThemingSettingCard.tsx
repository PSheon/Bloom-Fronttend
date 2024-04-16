// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Component Imports
import ThemeConfigSelectBox from 'src/views/settings/select-box/ThemeConfigSelectBox'
import ThemeColorSelectBox from 'src/views/settings/select-box/ThemeColorSelectBox'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { Skin, Mode, ThemeColor } from 'src/@core/layouts/types'

const SettingsThemingSettingCard = () => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  // ** Vars
  const { mode, skin, themeColor } = settings

  // ** Logics
  const handleChange = (field: keyof Settings, value: Settings[keyof Settings]): void => {
    saveSettings({ ...settings, [field]: value })
  }

  return (
    <Card>
      <CardHeader title='主題' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>外框</Typography>
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
                  title='無邊框'
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
                  title='有邊框'
                  color='primary'
                  handleClick={() => handleChange('skin', 'bordered' as Skin)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>模式</Typography>
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
                  title='明亮'
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
                  title='黑暗'
                  color='primary'
                  handleClick={() => handleChange('mode', 'dark' as Mode)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>主色</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='primary'
                  handleClick={() => handleChange('themeColor', 'primary' as ThemeColor)}
                  sx={{ backgroundColor: '#666CFF' }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='secondary'
                  handleClick={() => handleChange('themeColor', 'secondary' as ThemeColor)}
                  sx={{ backgroundColor: 'secondary.main' }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='success'
                  handleClick={() => handleChange('themeColor', 'success' as ThemeColor)}
                  sx={{ backgroundColor: 'success.main' }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='error'
                  handleClick={() => handleChange('themeColor', 'error' as ThemeColor)}
                  sx={{ backgroundColor: 'error.main' }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='warning'
                  handleClick={() => handleChange('themeColor', 'warning' as ThemeColor)}
                  sx={{ backgroundColor: 'warning.main' }}
                />
              </Grid>
              <Grid item xs={3} sm='auto'>
                <ThemeColorSelectBox
                  selected={themeColor}
                  value='info'
                  handleClick={() => handleChange('themeColor', 'info' as ThemeColor)}
                  sx={{ backgroundColor: 'info.main' }}
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
