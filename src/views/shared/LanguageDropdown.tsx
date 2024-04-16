// ** React Imports
import { useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third-Party Imports
import { useTranslation } from 'react-i18next'

// ** Custom Component Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** Hooks
  const { i18n } = useTranslation()

  // ** Vars
  const { layout } = settings

  const handleLangItemClick = (lang: 'zh_TW' | 'en') => {
    i18n.changeLanguage(lang)
  }

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <OptionsMenu
      icon={<Icon icon='mdi:translate' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      iconButtonProps={{ color: 'inherit', sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) } }}
      options={[
        {
          text: '繁體中文',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'zh_TW',
            onClick: () => {
              handleLangItemClick('zh_TW')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: 'English',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
