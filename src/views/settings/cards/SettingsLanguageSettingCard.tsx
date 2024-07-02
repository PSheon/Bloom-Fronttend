// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// ** Third-Party Imports
import { useTranslation } from 'react-i18next'

// ** Custom Component Imports
import ThemeConfigSelectBox from 'src/views/settings/select-box/ThemeConfigSelectBox'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

const SettingsLanguageSettingCard = () => {
  // ** Hooks
  const { i18n } = useTranslation()
  const { settings, saveSettings } = useSettings()

  // ** Logics
  const handleLangItemClick = (lang: 'en' | 'zh_TW' | 'zh_CN' | 'es' | 'de' | 'it') => {
    i18n.changeLanguage(lang)
  }

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <Card>
      <CardHeader title='Language' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={4} sm={3}>
                <ThemeConfigSelectBox
                  selected={i18n.language}
                  value='en'
                  image='/images/settings/language/en.svg'
                  title='English'
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('en')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <ThemeConfigSelectBox
                  selected={i18n.language}
                  value='zh_TW'
                  image='/images/settings/language/zh_TW.svg'
                  title='繁體中文'
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('zh_TW')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <ThemeConfigSelectBox
                  selected={i18n.language}
                  value='zh_CN'
                  image='/images/settings/language/zh_CN.svg'
                  title='简体中文'
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('zh_CN')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <ThemeConfigSelectBox
                  selected={i18n.language}
                  value='es'
                  image='/images/settings/language/es.svg'
                  title='Spanish'
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('es')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <ThemeConfigSelectBox
                  selected={i18n.language}
                  value='es'
                  image='/images/settings/language/de.svg'
                  title='Deutsch'
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('de')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <ThemeConfigSelectBox
                  selected={i18n.language}
                  value='it'
                  image='/images/settings/language/it.svg'
                  title='Italian'
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('it')
                    saveSettings({ ...settings, direction: 'ltr' })
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

export default SettingsLanguageSettingCard
