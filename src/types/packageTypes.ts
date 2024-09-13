// ** Type Imports
import type { BaseApiResponseType } from 'src/types/api/baseApiTypes'

export type SkinType = 'Green' | 'Purple' | 'Orange'
export type SlotType = {
  id: number
  propertyName: 'DisplayName' | 'APY' | 'MinimumStakingPeriod' | 'Duration' | 'PrincipalDelayDays'
  description?: string
  value: string
  displayValue?: string
  isIntrinsic: boolean
  order: number
  displayType: 'string' | 'number'
}
export type PackageType = {
  id: number
  packageId: number
  displayName: string
  description?: string
  skin: SkinType
  priceInUnit: number
  slots: SlotType[]
  status: 'Draft' | 'Published' | 'Archived'
}

// ** Find One
export type FindOnePackageParamsType = number
export type FindOnePackageTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<PackageType, 'id'>
}>
export type FindOnePackageResponseType = PackageType

// ** Find
export type FindPackagesParamsType = {
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
export type FindPackagesTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<PackageType, 'id'>
  }[]
>
export type FindPackagesResponseType = BaseApiResponseType<PackageType[]>

// ** Create
export type CreatePackageParamsType = {
  data: {
    packageId: number
    displayName: string
    description?: string
    skin: SkinType
  }
}
export type CreatePackageTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<PackageType, 'id'>
}>
export type CreatePackageResponseType = PackageType

// ** Update One
export type UpdateOnePackageParamsType = {
  id: number
  data: Partial<{
    displayName: string
    description: string
    skin: SkinType
    slots:
      | Partial<{
          propertyName: 'DisplayName' | 'APY' | 'MinimumStakingPeriod' | 'Duration' | 'PrincipalDelayDays'
          description: string
          value: string
          displayValue: string
          isIntrinsic: boolean
          order: number
          displayType: 'string' | 'number'
        }>[]
      | Partial<{
          id: number
          propertyName: 'DisplayName' | 'APY' | 'MinimumStakingPeriod' | 'Duration' | 'PrincipalDelayDays'
          description: string
          value: string
          displayValue: string
          order: number
          displayType: 'string' | 'number'
        }>
    priceInUnit: number
    status: 'Draft' | 'Published' | 'Archived'
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
    }
    populate?: string[]
  }
}
export type UpdateOnePackageTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<PackageType, 'id'>
}>
export type UpdateOnePackageResponseType = PackageType

// ** Delete One
export type DeleteOnePackageParamsType = number
export type DeleteOnePackageTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<PackageType, 'id'>
}>
export type DeleteOnePackageResponseType = PackageType
