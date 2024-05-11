// ** React Imports
import { useEffect, useState } from 'react'

// ** Third-Party Imports
import axios from 'axios'

// ** Type Imports
import type { HorizontalNavItemsType } from 'src/@core/layouts/types'

const ServerSideNavItems = () => {
  // ** States
  const [menuItems, setMenuItems] = useState<HorizontalNavItemsType>([])

  // ** Side Effects
  useEffect(() => {
    axios.get('/api/horizontal-nav/data').then(response => {
      const menuArray = response.data

      setMenuItems(menuArray)
    })
  }, [])

  return { menuItems }
}

export default ServerSideNavItems
