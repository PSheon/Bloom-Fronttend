// ** Third-Party Components
import { OutputData } from '@editorjs/editorjs'

// ** Type Imports
import { BaseApiResponseType, MediaAssetApiResponseType } from 'src/types/api/baseApiTypes'
import { PackageType } from 'src/types/api/packageTypes'

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
export type TabIndex = 'overview' | 'detail' | 'token' | 'vault' | 'security'
export type FundType = {
  id: number
  banner: MediaAssetApiResponseType
  chain: 'Ethereum' | 'Blast'
  baseCurrency: 'ETH' | 'USDT' | 'USDC' | 'DAI'
  category: CategoryType
  displayName: string
  description?: string
  fundSFTContractAddress: string
  detail: OutputData
  genesisDate: Date
  saleStartTime: Date
  maturityDate: Date
  performanceFeePercentage: number
  redemptionFrequencyInDays: number
  defaultPackages?: {
    data: {
      id: number
      attributes: Omit<PackageType, 'id'>
    }[]
  }
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
    detail: OutputData
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
