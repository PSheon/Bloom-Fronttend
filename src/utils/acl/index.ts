// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'
import type { Role } from 'src/types/authTypes'

interface UserRoleAttributeType {
  [key: string]: {
    icon: string
    color: ThemeColor
    displayName: string
    description: string
  }
}

export const getUserRoleAttributes = (role: Role) => {
  const userRoleAttributes: UserRoleAttributeType = {
    Admin: {
      icon: 'mdi:laptop',
      color: 'primary',
      displayName: 'Administrator',
      description: 'Monitor and ensure everything is running smoothly'
    },
    Planner: {
      icon: 'mdi:chart-donut',
      color: 'info',
      displayName: 'Planner',
      description: 'Plan and manage all funds'
    },
    'Asset Manager': {
      icon: 'mdi:rate-review',
      color: 'warning',
      displayName: 'Asset Manager',
      description: 'Manage and review all assets'
    },
    User: {
      icon: 'mdi:user-outline',
      color: 'success',
      displayName: 'User',
      description: 'View fund and information and pledge'
    },
    Public: {
      icon: 'mdi:public',
      color: 'secondary',
      displayName: 'Public',
      description: 'Limited access'
    }
  }

  return userRoleAttributes[role]
}
