// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

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

  // ** Vars
  const { mode, contentWidth, appBar = 'fixed' } = settings

  // ** Logics
  const handleChange = (field: keyof Settings, value: Settings[keyof Settings]): void => {
    saveSettings({ ...settings, [field]: value })
  }

  return (
    <Card>
      <CardHeader title='LAYOUT' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>Content Width</Typography>
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
                  title='Full'
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
                  title='Boxed'
                  color='primary'
                  handleClick={() => handleChange('contentWidth', 'boxed' as ContentWidth)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>AppBar Type</Typography>
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
                  title='Fixed'
                  color='primary'
                  handleClick={() => handleChange('appBar', 'fixed' as AppBar)}
                />
              </Grid>
              <Grid item xs={4} sm='auto'>
                <ThemeConfigSelectBox
                  selected={appBar}
                  value='static'
                  image={
                    mode === 'light' ? `/images/settings/layout/static.svg` : `/images/settings/layout/static-dark.svg`
                  }
                  title='Static'
                  color='primary'
                  handleClick={() => handleChange('appBar', 'static' as AppBar)}
                />
              </Grid>
              <Grid item xs={4} sm='auto'>
                <ThemeConfigSelectBox
                  selected={appBar}
                  value='hidden'
                  image={
                    mode === 'light' ? `/images/settings/layout/hidden.svg` : `/images/settings/layout/hidden-dark.svg`
                  }
                  title='Hidden'
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
