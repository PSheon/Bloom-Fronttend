// ** Types
import { TabIndex } from 'src/types/api/fundTypes'

export const getValidTabIndex = (tab: string | string[] | undefined): TabIndex | undefined => {
  const validTabList = ['overview', 'detail', 'token', 'vault', 'security']

  if (typeof tab === 'string' && validTabList.includes(tab)) {
    return tab as TabIndex
  } else {
    return undefined
  }
}
