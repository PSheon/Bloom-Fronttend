// ** Type Imports
import type { BaseApiResponseType } from 'src/types/api/baseApiTypes'
import type { FundType } from 'src/types/fundTypes'
import type { PackageType } from 'src/types/packageTypes'

type AttributeType = {
  traitType: string
  value: string
}

export type TokenType = {
  id: number
  belongToFund?: {
    data?: {
      id: number
      attributes: Omit<FundType, 'id'>
    }
  }
  package?: {
    data?: {
      id: number
      attributes: Omit<PackageType, 'id'>
    }
  }
  contractAddress: string
  owner: string
  tokenId: string
  tokenValue: string
  attributes: AttributeType[]
  status: 'Holding' | 'Staking' | 'Burned'
  updatedAt: Date
  createdAt: Date
}

// ** Find One
export type FindOneTokenParamsType = number
export type FindOneTokenTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<TokenType, 'id'>
}>
export type FindOneTokenResponseType = TokenType

// ** Find
export type FindTokensParamsType = {
  filters: Partial<{
    contractAddress: Record<string, string>
    owner: Record<string, string>
    $or: Partial<{
      status: Record<string, TokenType['status']>
    }>[]
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindTokensTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<TokenType, 'id'>
  }[]
>
export type FindTokensResponseType = BaseApiResponseType<TokenType[]>

// ** Update One
export type UpdateOneTokenParamsType = {
  id: number
  data: Partial<{
    owner: string
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
    }
    populate?: string[]
  }
}
export type UpdateOneTokenTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<TokenType, 'id'>
}>
export type UpdateOneTokenResponseType = TokenType
