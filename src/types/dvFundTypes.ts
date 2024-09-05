// ** Type Imports
import type { Abi } from 'viem'
import type { Block } from '@blocknote/core'
import type { BaseApiResponseType, MediaAssetApiResponseType } from 'src/types/api/baseApiTypes'
import type { PackageType } from 'src/types/packageTypes'

export type CategoryType =
  | 'Health and Medical'
  | 'Arts and Culture'
  | 'Finance and Technology'
  | 'Social Enterprise'
  | 'Emerging Industries'
  | 'Environment and Sustainability'
  | 'Food and Agriculture'
  | 'Education and Training'
  | 'Travel and Hospitality'
  | 'Entertainment and Recreation'
  | 'Fashion and Beauty'
  | 'Social and Communication'
  | 'Web3.0 and Blockchain'
export type EditTabIndex = 'overview' | 'detail' | 'token' | 'vault' | 'security'
export type PreviewTabIndex = 'overview' | 'mint' | 'vault'
export type LiveTabIndex = 'overview' | 'mint' | 'vault'
export type DVFundType = {
  id: number
  banner: MediaAssetApiResponseType
  chain: 'Ethereum' | 'Ethereum Sepolia' | 'Blast'
  baseCurrency: 'ETH' | 'USDT' | 'USDC' | 'DAI' | 'BLT'
  category: CategoryType
  displayName: string
  description?: string
  detail: Block[]
  genesisDate: Date
  saleStartTime: Date
  maturityDate: Date
  estimatedAPY: number
  performanceFeePercentage: number
  redemptionFrequencyInDays: number
  defaultPackages?: {
    data: {
      id: number
      attributes: Omit<PackageType, 'id'>
    }[]
  }
  vault: {
    id: number
    contractName: string
    contractAddress: string
    contractRootSignerAddress?: string
    contractRootSignerPrivateKey?: string
    contractAbi: Abi
    version: string
  }
  twitterUrl?: string
  discordUrl?: string
  isHighlighted: boolean
  status: 'Draft' | 'Published' | 'Archived'
  updatedAt: Date
  createdAt: Date
}

// ** Find One
export type FindOneFundParamsType = null
export type FindOneFundTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<DVFundType, 'id'>
}>
export type FindOneFundResponseType = DVFundType

// ** Find
export type FindFundsParamsType = {
  filters: Partial<{
    $or: Partial<{
      displayName: Record<string, string>
    }>[]
    status: string
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindFundsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<DVFundType, 'id'>
  }[]
>
export type FindFundsResponseType = BaseApiResponseType<DVFundType[]>

// ** Deposit Sign Hash
export type DepositSignHashParamsType = {
  packageId: number
  data: {
    contractAddress: string
    user: string
    amount: string
    interestRate: string
    principalDelayDays: string
    durationDays: string
  }
}
export type DepositSignHashTransformResponseType = {
  hash: string
}
export type DepositSignHashResponseType = {
  hash: string
}

// ** Claim Sign Hash
export type ClaimSignHashParamsType = {
  id: number
  data: {
    contractAddress: string
    owner: string
  }
}
export type ClaimSignHashTransformResponseType = {
  hash: string
  unlockTime: number
  interest: string
}
export type ClaimSignHashResponseType = {
  hash: string
  unlockTime: number
  interest: string
}
