// ** React Imports
import { useEffect, useRef } from 'react'

// ** Custom Component Imports
import VerticalLayout from './VerticalLayout'
import HorizontalLayout from './HorizontalLayout'

// ** Type Imports
import { LayoutProps } from 'src/@core/layouts/types'

const Layout = (props: LayoutProps) => {
  // ** Props
  const { hidden, children, settings, saveSettings } = props

  // ** Refs
  const isCollapsed = useRef(settings.navCollapsed)

  useEffect(() => {
    if (hidden) {
      if (settings.navCollapsed) {
        saveSettings({ ...settings, navCollapsed: false, layout: 'vertical' })
        isCollapsed.current = true
      }
    } else {
      if (isCollapsed.current) {
        saveSettings({ ...settings, navCollapsed: true, layout: settings.lastLayout })
        isCollapsed.current = false
      } else {
        if (settings.lastLayout !== settings.layout) {
          saveSettings({ ...settings, layout: settings.lastLayout })
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden])

  if (settings.layout === 'horizontal') {
    return <HorizontalLayout {...props}>{children}</HorizontalLayout>
  }

  return <VerticalLayout {...props}>{children}</VerticalLayout>
}

export default Layout
