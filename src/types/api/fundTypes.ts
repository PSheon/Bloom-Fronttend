import { OutputData } from '@editorjs/editorjs'

import { BaseApiResponseType } from 'src/types/api/baseApiTypes'

export type TabIndex = 'overview' | 'detail' | 'token' | 'vault' | 'security'
export type FundType = {
  id: number
  chain: 'Ethereum' | 'Blast'
  baseCurrency: 'ETH' | 'USDT' | 'USDC' | 'DAI'
  displayName: string
  description?: string
  fundSFTContractAddress: string
  detail: OutputData
  genesisDate: Date
  saleStartTime: Date
  maturityDate: Date
  performanceFeePercentage: number
  redemptionFrequencyInDays: number
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
    displayName: string
    description: string
    detail: OutputData
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
