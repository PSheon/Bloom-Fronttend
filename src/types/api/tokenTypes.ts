// ** Type Imports
import { BaseApiResponseType } from 'src/types/api/baseApiTypes'
import { PackageType } from 'src/types/api/packageTypes'

type AttributeType = {
  traitType: string
  value: string
}

export type TokenType = {
  id: number
  tokenId: number
  displayName: string
  description?: string
  tokenAddress: string
  contractAddress: string
  package: PackageType
  attributes: AttributeType[]
  status: 'Draft' | 'Generating' | 'Published' | 'Archived'
  updatedAt: string
  createdAt: string
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
export type FindTokensTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<TokenType, 'id'>
  }[]
>
export type FindTokensResponseType = BaseApiResponseType<TokenType[]>

// ** Create
export type CreateTokenParamsType = {
  data: {
    displayName: string
  }
}
export type CreateTokenTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<TokenType, 'id'>
}>
export type CreateTokenResponseType = TokenType

// ** Update One
export type UpdateOneTokenParamsType = {
  id: number
  data: Partial<{
    displayName: string
    status: 'Draft' | 'Generating' | 'Published' | 'Archived'
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

// ** Delete One
export type DeleteOneTokenParamsType = number
export type DeleteOneTokenTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<TokenType, 'id'>
}>
export type DeleteOneTokenResponseType = TokenType
