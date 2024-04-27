// ** Type Imports
import { MediaAssetType } from 'src/types/api/mediaAssetTypes'
import { UserDataType } from 'src/types/api/authTypes'

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

export type BaseApiResponseErrorType<T> = {
  data: T
  error: {
    status: number
    name: string
    message: string
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
    attributes: Omit<UserDataType, 'id' | 'avatar'> & {
      avatar: MediaAssetApiResponseType
    }
  }
}
