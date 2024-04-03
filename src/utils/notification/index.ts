// ** Types Imports
import { NotificationType } from 'src/types/api/notificationTypes'
import { ThemeColor } from 'src/@core/layouts/types'

type BaseTabListAttributes = Record<NotificationType['catalog'], { icon: string; color: ThemeColor }>

export const getNotificationAttributes = (catalog: NotificationType['catalog']) => {
  const baseTabListAttributes: BaseTabListAttributes = {
    System: { icon: 'mdi:bell-outline', color: 'primary' },
    'Request Sheet': { icon: 'mdi:newspaper-variant-multiple-outline', color: 'primary' }
  }

  return Object.assign(baseTabListAttributes['System'], baseTabListAttributes[catalog])
}
