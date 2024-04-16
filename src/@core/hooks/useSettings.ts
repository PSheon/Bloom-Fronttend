// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { SettingsContext, SettingsContextValue } from 'src/@core/context/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
