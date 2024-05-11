// ** Type Imports
import type { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'

export type WalletType = {
  id: number
  user: UserApiResponseType
  chain: 'Ethereum'
  address: string
  connector?: string
  isConnected: boolean
  updatedAt: string
  createdAt: string
}

// ** Find Me
export type FindMeWalletsParamsType = {
  filters: Partial<{
    $or: Partial<{
      address: Record<string, string>
    }>[]
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindMeWalletsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<WalletType, 'id'>
  }[]
>
export type FindMeWalletsResponseType = BaseApiResponseType<WalletType[]>

// ** Find
export type FindWalletsParamsType = {
  filters: Partial<{
    $or: Partial<{
      address: Record<string, string>
    }>[]
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindWalletsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<WalletType, 'id'>
  }[]
>
export type FindWalletsResponseType = BaseApiResponseType<WalletType[]>

// ** Get Nonce
export type GetWalletNonceParamsType = null
export type GetWalletNonceTransformResponseType = {
  nonce: string
}
export type GetWalletNonceResponseType = {
  nonce: string
}

// ** Verify
export type VerifyWalletParamsType = {
  data: {
    message: string
    signature: string
    address: string
    connector: string
  }
}
export type VerifyWalletTransformResponseType = {
  ok: boolean
}
export type VerifyWalletResponseType = {
  ok: boolean
}

// ** Create
export type CreateWalletParamsType = {
  data: {
    displayName: string
  }
}
export type CreateWalletTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<WalletType, 'id'>
}>
export type CreateWalletResponseType = WalletType

// ** Update One
export type UpdateOneWalletParamsType = {
  id: number
  data: Partial<{
    isConnected: boolean
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
    }
    populate?: string[]
  }
}
export type UpdateOneWalletTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<WalletType, 'id'>
}>
export type UpdateOneWalletResponseType = WalletType

// ** Delete One
export type DeleteOneWalletParamsType = number
export type DeleteOneWalletTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<WalletType, 'id'>
}>
export type DeleteOneWalletResponseType = WalletType
