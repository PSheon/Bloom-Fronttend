import { MediaAssetType } from 'src/types/api/mediaAssetTypes'

export type BaseApiResponseType<T> = {
  data: T
  meta: {
    pagination: {
      page: number
      pageCount: number
      pageSize: number
      total: number
    }
  }
}

export type MediaAssetApiResponseType = {
  data?: {
    id: number
    attributes: Omit<MediaAssetType, 'id'>
  }
}

export type UserApiResponseType = {
  data?: {
    id: number
    attributes: {
      avatar?: MediaAssetApiResponseType
      role?: {
        id: number
        name: string
        description: string
        type: string
        createdAt: string
        updatedAt: string
      }
      provider: string
      username: string
      email: string
      blocked: boolean
      confirmed: boolean
      createdAt: string
      updatedAt: string
    }
  }
}
