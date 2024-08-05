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
import LanguageSelectBox from 'src/views/settings/select-box/LanguageSelectBox'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'
import { t } from 'i18next'

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
      <CardHeader title={t('general-settings::Language Settings.CardTitle')} />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <LanguageSelectBox
                  selected={i18n.language}
                  value='en'
                  image='/images/settings/language/en.svg'
                  progressText='100%'
                  title={t('general-settings::Language Settings.Locale-en')}
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('en')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <LanguageSelectBox
                  selected={i18n.language}
                  value='zh_TW'
                  image='/images/settings/language/zh_TW.svg'
                  progressText='20%'
                  title={t('general-settings::Language Settings.Locale-zh_TW')}
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('zh_TW')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <LanguageSelectBox
                  selected={i18n.language}
                  value='zh_CN'
                  image='/images/settings/language/zh_CN.svg'
                  progressText='0%'
                  title={t('general-settings::Language Settings.Locale-zh_CN')}
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('zh_CN')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <LanguageSelectBox
                  selected={i18n.language}
                  value='es'
                  image='/images/settings/language/es.svg'
                  progressText='0%'
                  title={t('general-settings::Language Settings.Locale-es')}
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('es')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <LanguageSelectBox
                  selected={i18n.language}
                  value='es'
                  image='/images/settings/language/de.svg'
                  progressText='0%'
                  title={t('general-settings::Language Settings.Locale-de')}
                  color='primary'
                  handleClick={() => {
                    handleLangItemClick('de')
                    saveSettings({ ...settings, direction: 'ltr' })
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <LanguageSelectBox
                  selected={i18n.language}
                  value='it'
                  image='/images/settings/language/it.svg'
                  progressText='0%'
                  title={t('general-settings::Language Settings.Locale-it')}
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
