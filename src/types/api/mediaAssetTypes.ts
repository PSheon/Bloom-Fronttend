import { BaseApiResponseType } from 'src/types/api/baseApiTypes'

type Format = {
  ext: string
  hash: string
  height: number
  mime: string
  name: string
  path?: string
  size: number
  url: string
}

export type MediaAssetType = {
  id: number
  caption?: string
  alternativeText?: string
  blurhash: string
  url: string
  ext: string
  formats?: {
    thumbnail?: Format
    small?: Format
    medium?: Format
    large?: Format
  }
  hash: string
  height?: number
  width?: number
  mime: string
  name: string
  previewUrl?: string
  provider: string
  provider_metadata?: Record<string, string>
  size: number
  updatedAt: string
  createdAt: string
}

// ** Find One
export type FindOneMediaAssetParamsType = number
export type FindOneMediaAssetTransformResponseType = MediaAssetType
export type FindOneMediaAssetResponseType = MediaAssetType

// ** Find
export type FindMediaAssetsParamsType = {
  filters: Partial<{
    $or: Partial<{
      name: Record<string, string>
    }>[]
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindMediaAssetsTransformResponseType = BaseApiResponseType<MediaAssetType[]>
export type findMediaAssetsResponseType = BaseApiResponseType<MediaAssetType[]>

// ** Upload
export type UploadMediaAssetsParamsType = FormData
export type UploadMediaAssetsTransformResponseType = MediaAssetType[]
export type UploadMediaAssetsResponseType = MediaAssetType[]

// ** Update One
export type UpdateOneMediaAssetParamsType = {
  id: number
  data: {
    fileInfo: Partial<{
      name: string
      alternativeText: string
      caption: string
    }>
  }
}
export type UpdateOneMediaAssetTransformResponseType = MediaAssetType
export type UpdateOneMediaAssetResponseType = MediaAssetType

// ** Delete One
export type DeleteOneMediaAssetsParamsType = number
export type DeleteOneMediaAssetsTransformResponseType = MediaAssetType
export type DeleteOneMediaAssetsResponseType = MediaAssetType
