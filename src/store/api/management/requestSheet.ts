// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third Party Imports
import qs from 'qs'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  FindMeOneRequestSheetParamsType,
  FindMeOneRequestSheetTransformResponseType,
  FindMeOneRequestSheetResponseType,
  FindMeRequestSheetParamsType,
  FindMeRequestSheetTransformResponseType,
  FindMeRequestSheetResponseType,
  FindOneRequestSheetParamsType,
  FindOneRequestSheetTransformResponseType,
  FindOneRequestSheetResponseType,
  FindRequestSheetsParamsType,
  FindRequestSheetsTransformResponseType,
  FindRequestSheetsResponseType,
  CreateRequestSheetParamsType,
  CreateRequestSheetTransformResponseType,
  CreateRequestSheetResponseType,
  UpdateMeOneRequestSheetParamsType,
  UpdateMeOneRequestSheetTransformResponseType,
  UpdateMeOneRequestSheetResponseType,
  UpdateOneRequestSheetParamsType,
  UpdateOneRequestSheetTransformResponseType,
  UpdateOneRequestSheetResponseType,
  DeleteOneRequestSheetParamsType,
  DeleteOneRequestSheetTransformResponseType,
  DeleteOneRequestSheetResponseType
} from 'src/types/api/requestSheetTypes'

const REQUEST_SHEET_API_REDUCER_KEY = 'requestSheetApi'
export const requestSheetApi = createApi({
  reducerPath: REQUEST_SHEET_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: headers => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      headers.set('Authorization', `Bearer ${storedToken}`)

      return headers
    }
  }),
  tagTypes: ['RequestSheet'],
  endpoints: builder => ({
    findMeOne: builder.query<FindMeOneRequestSheetResponseType, FindMeOneRequestSheetParamsType>({
      query: requestSheetId => ({
        url: `/api/request-sheets/me/${requestSheetId}?${qs.stringify({
          populate: ['applicant', 'applicant.avatar', 'proposalFile']
        })}`,
        method: 'GET'
      }),
      providesTags: ['RequestSheet'],
      transformResponse: (responseData: FindMeOneRequestSheetTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    findMe: builder.query<FindMeRequestSheetResponseType, FindMeRequestSheetParamsType>({
      query: params => ({
        url: `/api/request-sheets/me?${qs.stringify({
          ...params,
          populate: ['applicant', 'applicant.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['RequestSheet'],
      transformResponse: (responseData: FindMeRequestSheetTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(requestSheet => ({
          id: requestSheet.id,
          ...requestSheet.attributes
        }))
      })
    }),
    findOne: builder.query<FindOneRequestSheetResponseType, FindOneRequestSheetParamsType>({
      query: requestSheetId => ({
        url: `/api/request-sheets/${requestSheetId}?${qs.stringify({
          populate: ['applicant', 'applicant.avatar', 'proposalFile']
        })}`,
        method: 'GET'
      }),
      providesTags: ['RequestSheet'],
      transformResponse: (responseData: FindOneRequestSheetTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindRequestSheetsResponseType, FindRequestSheetsParamsType>({
      query: params => ({
        url: `/api/request-sheets?${qs.stringify({
          ...params,
          populate: ['applicant', 'applicant.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['RequestSheet'],
      transformResponse: (responseData: FindRequestSheetsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(requestSheet => ({
          id: requestSheet.id,
          ...requestSheet.attributes
        }))
      })
    }),
    create: builder.mutation<CreateRequestSheetResponseType, CreateRequestSheetParamsType>({
      query: params => ({
        url: `/api/request-sheets?${qs.stringify({
          populate: ['applicant', 'applicant.avatar', 'proposalFile']
        })}`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['RequestSheet'],
      transformResponse: (responseData: CreateRequestSheetTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateMeOne: builder.mutation<UpdateMeOneRequestSheetResponseType, UpdateMeOneRequestSheetParamsType>({
      query: params => ({
        url: `/api/request-sheets/me/${params.id}?${qs.stringify({
          populate: ['applicant', 'applicant.avatar', 'proposalFile']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['RequestSheet'],
      transformResponse: (responseData: UpdateMeOneRequestSheetTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOneRequestSheetResponseType, UpdateOneRequestSheetParamsType>({
      query: params => ({
        url: `/api/request-sheets/${params.id}?${qs.stringify({
          populate: ['applicant', 'applicant.avatar', 'proposalFile']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['RequestSheet'],
      transformResponse: (responseData: UpdateOneRequestSheetTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteOne: builder.mutation<DeleteOneRequestSheetResponseType, DeleteOneRequestSheetParamsType>({
      query: requestSheetId => ({
        url: `/api/request-sheets/${requestSheetId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['RequestSheet'],
      transformResponse: (responseData: DeleteOneRequestSheetTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const {
  useFindMeOneQuery,
  useFindMeQuery,
  useFindOneQuery,
  useFindQuery,
  useCreateMutation,
  useUpdateMeOneMutation,
  useUpdateOneMutation,
  useDeleteOneMutation
} = requestSheetApi
