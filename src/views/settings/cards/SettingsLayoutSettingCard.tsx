// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Components Imports
import ThemeConfigSelectBox from 'src/views/settings/select-box/ThemeConfigSelectBox'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import { ContentWidth, AppBar } from 'src/@core/layouts/types'

const SettingsLayoutSettingCard = () => {
  // ** Hook
  const { settings, saveSettings } = useSettings()

  // ** Vars
  const { mode, contentWidth, appBar = 'fixed' } = settings

  // ** Logics
  const handleChange = (field: keyof Settings, value: Settings[keyof Settings]): void => {
    saveSettings({ ...settings, [field]: value })
  }

  return (
    <Card>
      <CardHeader title='佈景' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>內框大小</Typography>
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
                  title='全螢幕寬度'
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
                  title='固定寬度'
                  color='primary'
                  handleClick={() => handleChange('contentWidth', 'boxed' as ContentWidth)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle2'>工具列顯示</Typography>
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
                  title='固定'
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
                  title='置頂'
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
                  title='隱藏'
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
