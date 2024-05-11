// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { SettingsContext } from 'src/@core/context/settingsContext'

// ** Type Imports
import type { SettingsContextValue } from 'src/@core/context/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
