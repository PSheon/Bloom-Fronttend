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
export type FundType = {
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
  sft: {
    id: number
    contractName: string
    contractAddress: string
    contractRootSignerAddress?: string
    contractRootSignerPrivateKey?: string
    contractAbi: Abi
    version: string
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
  updatedAt: string
  createdAt: string
}

// ** Find One
export type FindOneFundParamsType = number
export type FindOneFundTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<FundType, 'id'>
}>
export type FindOneFundResponseType = FundType

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
    attributes: Omit<FundType, 'id'>
  }[]
>
export type FindFundsResponseType = BaseApiResponseType<FundType[]>

// ** Create
export type CreateFundParamsType = {
  data: {
    displayName: string
  }
}
export type CreateFundTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<FundType, 'id'>
}>
export type CreateFundResponseType = FundType

// ** Update One
export type UpdateOneFundParamsType = {
  id: number
  data: Partial<{
    banner: number | null
    displayName: string
    description: string
    saleStartTime: Date
    maturityDate: Date
    estimatedAPY: number
    performanceFeePercentage: number
    redemptionFrequencyInDays: number
    detail: Block[]
    defaultPackages: number[]
    isHighlighted: boolean
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
    }
    populate?: string[]
  }
}
export type UpdateOneFundTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<FundType, 'id'>
}>
export type UpdateOneFundResponseType = FundType

// ** Delete One
export type DeleteOneFundParamsType = number
export type DeleteOneFundTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<FundType, 'id'>
}>
export type DeleteOneFundResponseType = FundType

// ** SFT Sign Hash
export type SFTSignHashParamsType = {
  id: number
  data: {
    contractName: string
    minterAddress: string
    slotId: number
    value: string
  }
}
export type SFTSignHashTransformResponseType = {
  hash: string
}
export type SFTSignHashResponseType = {
  hash: string
}

// ** Vault Sign Hash
export type VaultSignHashParamsType = {
  id: number
  data: {
    contractName: string
    stakerAddress: string
    tokenId: string
    packageId: number
    balance: string
    periodInDays: number
    apy: number
  }
}
export type VaultSignHashTransformResponseType = {
  hash: string
  unlockTime: number
  interest: string
}
export type VaultSignHashResponseType = {
  hash: string
  unlockTime: number
  interest: string
}
