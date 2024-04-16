// ** Type Imports
import { ActivityLogType } from 'src/types/api/activityLogTypes'

type BaseActionAttributes = Record<string, { icon: string; color: 'success' | 'primary' | 'error'; title: string }>

export const getActivityLogActionAttributes = (action: ActivityLogType['action']) => {
  const baseActionAttributes: BaseActionAttributes = {
    Create: { icon: 'mdi:laptop', color: 'success', title: '建立' },
    Update: { icon: 'mdi:cog-outline', color: 'primary', title: '更新' },
    Delete: { icon: 'mdi:pencil-outline', color: 'error', title: '刪除' }
  }

  return Object.assign(baseActionAttributes['Create'], baseActionAttributes[action])
}
