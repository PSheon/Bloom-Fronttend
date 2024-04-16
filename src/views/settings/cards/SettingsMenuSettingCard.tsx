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
import { Settings } from 'src/@core/context/settingsContext'

const SettingsMenuSettingCard = () => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  // ** Vars
  const { mode, navCollapsed } = settings

  // ** Logics
  const handleChange = (field: keyof Settings, value: Settings[keyof Settings]): void => {
    saveSettings({ ...settings, [field]: value })
  }

  return (
    <Card>
      <CardHeader title='選單' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>選單開合</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={6} sm='auto'>
                <ThemeConfigSelectBox
                  selected={navCollapsed ? 'collapsed' : 'notCollapsed'}
                  value='collapsed'
                  image={
                    mode === 'light'
                      ? `/images/settings/layout/collapsed.svg`
                      : `/images/settings/layout/collapsed-dark.svg`
                  }
                  title='收起選單'
                  color='primary'
                  handleClick={() => handleChange('navCollapsed', true)}
                />
              </Grid>
              <Grid item xs={6} sm='auto'>
                <ThemeConfigSelectBox
                  selected={navCollapsed ? 'collapsed' : 'expanded'}
                  value='expanded'
                  image={
                    mode === 'light'
                      ? `/images/settings/layout/expanded.svg`
                      : `/images/settings/layout/expanded-dark.svg`
                  }
                  title='打開選單'
                  color='primary'
                  handleClick={() => handleChange('navCollapsed', false)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SettingsMenuSettingCard
