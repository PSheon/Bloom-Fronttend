// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'

interface TokenStatusAttributeType {
  [key: string]: {
    icon: string
    color: ThemeColor
    displayName: string
  }
}

export const getTokenStatusProperties = (status: 'Holding' | 'Staking' | 'Burned') => {
  const statusAttributes: TokenStatusAttributeType = {
    Holding: {
      icon: 'mdi:draft',
      color: 'primary',
      displayName: '持有中'
    },
    Staking: {
      icon: 'mdi:publish',
      color: 'success',
      displayName: '質押中'
    },
    Burned: {
      icon: 'mdi:archive-outline',
      color: 'error',
      displayName: '已燒毀'
    }
  }

  return statusAttributes[status]
}
