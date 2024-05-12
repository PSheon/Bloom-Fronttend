// ** Type Imports
import type { NotificationType } from 'src/types/notificationTypes'
import type { ThemeColor } from 'src/@core/layouts/types'

type BaseTabListAttributes = Record<NotificationType['category'], { icon: string; color: ThemeColor }>

export const getNotificationAttributes = (category: NotificationType['category']) => {
  const baseTabListAttributes: BaseTabListAttributes = {
    System: { icon: 'mdi:bell-outline', color: 'primary' },
    Fund: { icon: 'mdi:newspaper-variant-multiple-outline', color: 'primary' }
  }

  return Object.assign(baseTabListAttributes['System'], baseTabListAttributes[category])
}
