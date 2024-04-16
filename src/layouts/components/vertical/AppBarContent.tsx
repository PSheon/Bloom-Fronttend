// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Custom Components
import UserDropdown from 'src/views/shared/UserDropdown'
import PageSearch from 'src/views/shared/PageSearch'
import NotificationDropdown from 'src/views/shared/notification-dropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, toggleNavVisibility } = props

  // ** Hooks
  const auth = useAuth()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        {auth.user && <PageSearch hidden={hidden} settings={settings} />}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {auth.user && (
          <Fragment>
            <NotificationDropdown settings={settings} />
            <UserDropdown settings={settings} />
          </Fragment>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
