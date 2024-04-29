// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'

interface AnnouncementStatusAttributeType {
  [key: string]: {
    icon: string
    color: ThemeColor
    displayName: string
  }
}

export const getAnnouncementStatusProperties = (status: 'Draft' | 'Published' | 'Archived') => {
  const statusAttributes: AnnouncementStatusAttributeType = {
    Draft: {
      icon: 'mdi:draft',
      color: 'warning',
      displayName: '草稿'
    },
    Published: {
      icon: 'mdi:publish',
      color: 'success',
      displayName: '已發行'
    },
    Archived: {
      icon: 'mdi:archive-outline',
      color: 'error',
      displayName: '已封存'
    }
  }

  return statusAttributes[status]
}
