// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { TabIndex, FundType, CategoryType } from 'src/types/api/fundTypes'

interface FundStatusAttributeType {
  [key: string]: {
    icon: string
    color: ThemeColor
    displayName: string
  }
}

export const getValidEditTabIndex = (tab: string | string[] | undefined): TabIndex | undefined => {
  const validTabList = ['overview', 'detail', 'token', 'vault', 'security']

  if (typeof tab === 'string' && validTabList.includes(tab)) {
    return tab as TabIndex
  } else {
    return undefined
  }
}

export const getValidPreviewTabIndex = (tab: string | string[] | undefined): TabIndex | undefined => {
  const validTabList = ['overview', 'mint', 'vault']

  if (typeof tab === 'string' && validTabList.includes(tab)) {
    return tab as TabIndex
  } else {
    return undefined
  }
}

export const getValidLiveTabIndex = (tab: string | string[] | undefined): TabIndex | undefined => {
  const validTabList = ['overview', 'mint', 'vault']

  if (typeof tab === 'string' && validTabList.includes(tab)) {
    return tab as TabIndex
  } else {
    return undefined
  }
}

export const getNextValidPackageId = (fundEntity: FundType): number => {
  if (fundEntity?.defaultPackages?.data?.length) {
    const existedPackageIds = fundEntity.defaultPackages.data.map(pkg => pkg.attributes.packageId)
    const maxExistedPackageId = Math.max(...existedPackageIds)

    return maxExistedPackageId + 1
  } else {
    return 1
  }
}

export const getFundCurrencyProperties = (currency: 'ETH' | 'USDT' | 'USDC' | 'DAI') => {
  const currencyAttributes = {
    ETH: {
      icon: 'mdi:ethereum',
      imageUrl: '/images/funds/currencies/eth.svg',
      displayName: 'Ethereum',
      currency: 'ETH',
      symbol: 'Ξ'
    },
    USDT: {
      icon: 'mdi:currency-usd',
      imageUrl: '/images/funds/currencies/usdt.svg',
      displayName: 'Tether',
      currency: 'USDT',
      symbol: '$'
    },
    USDC: {
      icon: 'mdi:currency-usd',
      imageUrl: '/images/funds/currencies/usdc.svg',
      displayName: 'USD Coin',
      currency: 'USDC',
      symbol: '$'
    },
    DAI: {
      icon: 'mdi:currency-usd',
      imageUrl: '/images/funds/currencies/dai.svg',
      displayName: 'Dai',
      currency: 'DAI',
      symbol: '$'
    }
  }

  return currencyAttributes[currency]
}

export const getFundStatusProperties = (status: 'Draft' | 'Published' | 'Archived') => {
  const statusAttributes: FundStatusAttributeType = {
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

export const getFundCategoryProperties = (category: CategoryType) => {
  const categoryAttributes = {
    'Health and Medical': {
      displayName: '健康與醫療'
    },
    'Arts and Culture': {
      displayName: '藝術與文化'
    },
    'Finance and Technology': {
      displayName: '金融與科技'
    },
    'Social Enterprise': {
      displayName: '社會企業'
    },
    'Emerging Industries': {
      displayName: '新興產業'
    },
    'Environment and Sustainability': {
      displayName: '環保與可持續發展'
    },
    'Food and Agriculture': {
      displayName: '食品與農業'
    },
    'Education and Training': {
      displayName: '教育與培訓'
    },
    'Travel and Hospitality': {
      displayName: '旅遊與酒店'
    },
    'Entertainment and Recreation': {
      displayName: '娛樂與休閒'
    },
    'Fashion and Beauty': {
      displayName: '時尚與美容'
    },
    'Social and Communication': {
      displayName: '社交與溝通'
    },
    'Web3.0 and Blockchain': {
      displayName: 'Web3.0與區塊鏈'
    }
  }

  return categoryAttributes[category]
}
