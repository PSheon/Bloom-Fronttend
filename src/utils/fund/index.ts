// ** Third-Party Imports
import { ExactNumber as N } from 'exactnumber'
import {
  format,
  addMonths,
  differenceInDays,
  setDate,
  isAfter,
  startOfDay,
  setMilliseconds,
  setSeconds,
  setMinutes,
  setHours,
  addDays,
  subDays
} from 'date-fns'

// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'
import type { EditTabIndex, PreviewTabIndex, LiveTabIndex, FundType, CategoryType } from 'src/types/fundTypes'

interface FundStatusAttributeType {
  [key: string]: {
    icon: string
    color: ThemeColor
    displayName: string
  }
}

export const getValidEditTabIndex = (tab: string | string[] | undefined): EditTabIndex | undefined => {
  const validTabList = ['overview', 'detail', 'token', 'vault', 'security']

  if (typeof tab === 'string' && validTabList.includes(tab)) {
    return tab as EditTabIndex
  } else {
    return undefined
  }
}

export const getValidPreviewTabIndex = (tab: string | string[] | undefined): PreviewTabIndex | undefined => {
  const validTabList = ['overview', 'mint', 'vault']

  if (typeof tab === 'string' && validTabList.includes(tab)) {
    return tab as PreviewTabIndex
  } else {
    return undefined
  }
}

export const getValidLiveTabIndex = (tab: string | string[] | undefined): LiveTabIndex | undefined => {
  const validTabList = ['overview', 'mint', 'vault']

  if (typeof tab === 'string' && validTabList.includes(tab)) {
    return tab as LiveTabIndex
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

export const getExpectInterestBalanceString = (balance: bigint, apy: number, periodInDays: number): string => {
  const formattedApy = 1 + Math.min(Math.max(apy, 1), 24) / 100
  const interestRatePerDay = Math.pow(formattedApy, 1 / 365)
  const multiplier = Math.pow(interestRatePerDay, periodInDays)

  return N(balance)
    .mul(N(multiplier.toFixed(6)).sub(1))
    .toString()
}

export const getContractTypeProperties = (contractType: unknown) => {
  const contractTypeAttributes = {
    TokenERC20: {
      color: 'success',
      displayName: 'Token Drop',
      description: 'Release collection of unique NFTs for a set price'
    },
    TokenERC3525: {
      color: 'success',
      displayName: 'SFT Drop',
      description: 'Release collection of unique NFTs for a set price'
    },
    VaultRWA: {
      color: 'success',
      displayName: 'RWA Vault',
      description: 'Release collection of unique NFTs for a set price'
    }
  }

  switch (contractType) {
    case 'TokenERC20':
      return contractTypeAttributes['TokenERC20']
    case 'TokenERC3525':
      return contractTypeAttributes['TokenERC3525']
    case 'VaultRWA':
    default:
      return contractTypeAttributes['VaultRWA']
  }
}

export const getFundCurrencyProperties = (currency: FundType['baseCurrency']) => {
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
    },
    BLT: {
      icon: 'mdi:currency-usd',
      imageUrl: '/images/funds/currencies/blt.svg',
      displayName: 'Blt',
      currency: 'BLT',
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
      // displayName: '健康與醫療'
      displayName: 'Health & Medical'
    },
    'Arts and Culture': {
      // displayName: '藝術與文化'
      displayName: 'Arts & Culture'
    },
    'Finance and Technology': {
      // displayName: '金融與科技'
      displayName: 'Finance & Technology'
    },
    'Social Enterprise': {
      // displayName: '社會企業'
      displayName: 'Social Enterprise'
    },
    'Emerging Industries': {
      // displayName: '新興產業'
      displayName: 'Emerging Industries'
    },
    'Environment and Sustainability': {
      // displayName: '環保與可持續發展'
      displayName: 'Environment & Sustainability'
    },
    'Food and Agriculture': {
      // displayName: '食品與農業'
      displayName: 'Food & Agriculture'
    },
    'Education and Training': {
      // displayName: '教育與培訓'
      displayName: 'Education & Training'
    },
    'Travel and Hospitality': {
      // displayName: '旅遊與酒店'
      displayName: 'Travel & Hospitality'
    },
    'Entertainment and Recreation': {
      // displayName: '娛樂與休閒'
      displayName: 'Entertainment & Recreation'
    },
    'Fashion and Beauty': {
      // displayName: '時尚與美容'
      displayName: 'Fashion & Beauty'
    },
    'Social and Communication': {
      // displayName: '社交與溝通'
      displayName: 'Social & Communication'
    },
    'Web3.0 and Blockchain': {
      // displayName: 'Web3.0與區塊鏈'
      displayName: 'Web3.0 & Blockchain'
    }
  }

  return categoryAttributes[category]
}

export const getNextFifthDate = () => {
  const today = new Date()
  const thisMonthFifth = setDate(today, 5)
  const nextMonthFifth = setDate(addMonths(today, 1), 5)

  const nextFifth = isAfter(startOfDay(today), startOfDay(thisMonthFifth)) ? nextMonthFifth : thisMonthFifth

  return setMilliseconds(setSeconds(setMinutes(setHours(nextFifth, 0), 0), 0), 0)
}

export const getDepositRevenueSeriesData = (
  startDate: Date = new Date(),
  amount: number = 2000,
  interestRate: number = 24,
  duration: number = 730,
  principalDelayInDays: number = 0
) => {
  const endDate = addDays(startDate, duration)
  const round = Math.ceil(duration / 31)
  const principalEachDay = amount / (duration - principalDelayInDays)
  const interestEachDay = (amount * interestRate) / (365 * 100)

  const principalArray: number[] = []
  const interestArray: number[] = []
  const totalArray: number[] = []
  const categoriesArray: string[] = []

  for (let i = 0; i < round; i++) {
    let destDate = addDays(startDate, (i + 1) * 31)
    let diffDays = 31

    if (isAfter(destDate, endDate)) {
      diffDays = differenceInDays(endDate, subDays(destDate, 31))
      destDate = endDate
    }

    const inRoundPrincipal = (i + 1) * 31 > principalDelayInDays ? diffDays * principalEachDay : 0
    const principal = i > 0 ? principalArray[i - 1] + inRoundPrincipal : inRoundPrincipal
    const inRoundInterest = diffDays * interestEachDay
    const interest = i > 0 ? interestArray[i - 1] + inRoundInterest : inRoundInterest
    const total = principal + interest

    principalArray.push(principal)
    interestArray.push(interest)
    totalArray.push(total)
    categoriesArray.push(format(destDate, 'MM/dd'))
  }

  return { principalArray, interestArray, totalArray, categoriesArray }
}
