// ** Type Imports
import type { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'
import type { MediaAssetType } from 'src/types/api/mediaAssetTypes'

export type TabIndex = 'details' | 'initialReview' | 'secondaryReview'
export type RequestSheetType = {
  id: number
  applicant: UserApiResponseType
  title: string
  type:
    | 'Newly Established'
    | 'Existing And Reevaluation'
    | 'Regular Student'
    | 'Overseas Student'
    | 'Second Generation New Immigrant'
    | 'Continuation'
  referenceCaseNumber?: string
  schoolOrInstitution: string
  operationalMethod:
    | 'Technical High School + Junior College'
    | 'Technical High School + Junior College + Associate Degree'
    | "Technical High School + Bachelor's Degree"
    | "Junior High School + Technical High School + Bachelor's Degree"
    | 'Associate Degree with a Two-Year Technical Program'
    | 'Associate Degree with a Five-Year Technical Program'
    | "Bachelor's Degree in Technology"
  cooperationIndustries:
    | 'Intelligent Machinery'
    | 'Semiconductor'
    | 'Data Services'
    | 'Shipbuilding'
    | 'Smart Agriculture'
    | 'Information and Digital'
    | 'Cybersecurity Excellence Technology'
    | 'Precision Health'
    | 'Green Energy and Renewable Resources'
    | 'Defense and Strategic'
    | 'Civilian Livelihood and Preparedness'
    | 'Others'
  cooperationIndustriesOthers?: string
  programStartedAt: string
  programCompletedAt: string
  firstEntryAt: string
  proposalFile?: BaseApiResponseType<{
    id: number
    attributes: Omit<MediaAssetType, 'id'>
  }>
  processStatus:
    | 'Abandoned'
    | 'Filling out the sheet'
    | 'Initial review'
    | 'Initial review modification'
    | 'Secondary review'
    | 'Secondary review modification'
    | 'Completed'
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Find Me One
export type FindMeOneRequestSheetParamsType = number
export type FindMeOneRequestSheetTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<RequestSheetType, 'id'>
}>
export type FindMeOneRequestSheetResponseType = RequestSheetType

// ** Find Me
export type FindMeRequestSheetParamsType = {
  filters: Partial<{
    $or: Partial<{
      title: Record<string, string>
    }>[]
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindMeRequestSheetTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<RequestSheetType, 'id'>
  }[]
>
export type FindMeRequestSheetResponseType = BaseApiResponseType<RequestSheetType[]>

// ** Find One
export type FindOneRequestSheetParamsType = number
export type FindOneRequestSheetTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<RequestSheetType, 'id'>
}>
export type FindOneRequestSheetResponseType = RequestSheetType

// ** Find
export type FindRequestSheetsParamsType = {
  filters: Partial<{
    $and: Partial<{
      processStatus: Record<string, string | string[]>
    }>[]
    $or: Partial<{
      title: Record<string, string>
    }>[]
    applicant: number
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindRequestSheetsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<RequestSheetType, 'id'>
  }[]
>
export type FindRequestSheetsResponseType = BaseApiResponseType<RequestSheetType[]>

// ** Create
export type CreateRequestSheetParamsType = {
  data: {
    applicant: number
    title: string
    type: string
    referenceCaseNumber?: string
    schoolOrInstitution: string
    operationalMethod: string
    cooperationIndustries: string
    cooperationIndustriesOthers?: string
    programStartedAt: Date
    programCompletedAt: Date
    firstEntryAt: Date
  }
}
export type CreateRequestSheetTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<RequestSheetType, 'id'>
}>
export type CreateRequestSheetResponseType = RequestSheetType

// ** Update Me One
export type UpdateMeOneRequestSheetParamsType = {
  id: number
  data: Partial<{
    schoolOrInstitution: string
    operationalMethod: string
    cooperationIndustries: string
    cooperationIndustriesOthers: string
    programStartedAt: Date
    programCompletedAt: Date
    firstEntryAt: Date
    proposalFile: number | null
    processStatus: RequestSheetType['processStatus']
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
export type UpdateMeOneRequestSheetTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<RequestSheetType, 'id'>
}>
export type UpdateMeOneRequestSheetResponseType = RequestSheetType

// ** Update One
export type UpdateOneRequestSheetParamsType = {
  id: number
  data: Partial<{
    schoolOrInstitution: string
    operationalMethod: string
    cooperationIndustries: string
    cooperationIndustriesOthers: string
    programStartedAt: Date
    programCompletedAt: Date
    firstEntryAt: Date
    proposalFile: number | null
    processStatus: RequestSheetType['processStatus']
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
export type UpdateOneRequestSheetTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<RequestSheetType, 'id'>
}>
export type UpdateOneRequestSheetResponseType = RequestSheetType

// ** Delete One
export type DeleteOneRequestSheetParamsType = number
export type DeleteOneRequestSheetTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<RequestSheetType, 'id'>
}>
export type DeleteOneRequestSheetResponseType = RequestSheetType
