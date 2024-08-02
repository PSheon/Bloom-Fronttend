// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'
import type { ActivityLogType } from 'src/types/activityLogTypes'

interface ActivityLogStatusAttributes {
  [key: string]: {
    color: ThemeColor
    title: string
  }
}
interface ActivityLogActionAttributes {
  [key: string]: {
    icon: string
    color: ThemeColor
    title: string
  }
}

export const getActivityLogStatusProperties = (status: ActivityLogType['status']) => {
  const activityLogStatusAttributes: ActivityLogStatusAttributes = {
    Pending: { color: 'primary', title: 'Pending' },
    Fulfilled: { color: 'success', title: 'Succeed' },
    Rejected: { color: 'error', title: 'Failed' }
  }

  return Object.assign(activityLogStatusAttributes['Pending'], activityLogStatusAttributes[status])
}

export const getActivityLogActionProperties = (action: ActivityLogType['action']) => {
  const activityLogActionAttributes: ActivityLogActionAttributes = {
    Create: { icon: 'mdi:laptop', color: 'success', title: 'Create' },
    Update: { icon: 'mdi:cog-outline', color: 'primary', title: 'Update' },
    Delete: { icon: 'mdi:pencil-outline', color: 'error', title: 'Delete' }
  }

  return Object.assign(activityLogActionAttributes['Create'], activityLogActionAttributes[action])
}

export const getActivityLogRefContentLink = (activityLog: ActivityLogType) => {
  const { refContentType, refId } = activityLog

  switch (refContentType) {
    case 'Fund':
      return `/fund/live/${refId}/overview`
    case 'Article':
      return `/articles/live/${refId}`
    case 'Wallet':
    default:
      return '/'
  }
}
