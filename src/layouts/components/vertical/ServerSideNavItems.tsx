// ** React Imports
import { useEffect, useState } from 'react'

// ** Third-Party Imports
import axios from 'axios'

// ** Type Imports
import type { VerticalNavItemsType } from 'src/@core/layouts/types'

const ServerSideNavItems = () => {
  // ** States
  const [menuItems, setMenuItems] = useState<VerticalNavItemsType>([])

  // ** Side Effects
  useEffect(() => {
    axios.get('/api/vertical-nav/data').then(response => {
      const menuArray = response.data

      setMenuItems(menuArray)
    })
  }, [])

  return { menuItems }
}

export default ServerSideNavItems
