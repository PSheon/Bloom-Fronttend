// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindMePointRecordsParamsType,
  FindMePointRecordsTransformResponseType,
  FindMePointRecordsResponseType,
  FindMeStatisticsPointRecordsParamsType,
  FindMeStatisticsPointRecordsTransformResponseType,
  FindMeStatisticsPointRecordsResponseType,
  FindPointRecordsParamsType,
  FindPointRecordsTransformResponseType,
  FindPointRecordsResponseType,
  UpdateOnePointRecordParamsType,
  UpdateOnePointRecordTransformResponseType,
  UpdateOnePointRecordResponseType
} from 'src/types/pointRecordTypes'

const POINT_RECORD_API_REDUCER_KEY = 'pointRecordApi'

export const pointRecordApi = createApi({
  reducerPath: POINT_RECORD_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['PointRecord'],
  endpoints: builder => ({
    findMe: builder.query<FindMePointRecordsResponseType, FindMePointRecordsParamsType>({
      query: params => ({
        url: `/api/point-records/me?${qs.stringify(params)}`,
        method: 'GET'
      }),
      providesTags: ['PointRecord'],
      transformResponse: (responseData: FindMePointRecordsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(pointRecord => ({
          id: pointRecord.id,
          ...pointRecord.attributes
        }))
      })
    }),
    findMeStatistics: builder.query<FindMeStatisticsPointRecordsResponseType, FindMeStatisticsPointRecordsParamsType>({
      query: () => ({
        url: `/api/point-records/me/statistics`,
        method: 'GET'
      }),
      providesTags: ['PointRecord'],
      transformResponse: (responseData: FindMeStatisticsPointRecordsTransformResponseType) => responseData
    }),
    find: builder.query<FindPointRecordsResponseType, FindPointRecordsParamsType>({
      query: params => ({
        url: `/api/point-records?${qs.stringify({
          ...params,
          populate: ['user', 'user.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindPointRecordsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(pointRecord => ({
          id: pointRecord.id,
          ...pointRecord.attributes
        }))
      })
    }),
    updateOne: builder.mutation<UpdateOnePointRecordResponseType, UpdateOnePointRecordParamsType>({
      query: params => ({
        url: `/api/point-records/${params.id}?${qs.stringify({
          populate: ['user', 'user.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['PointRecord'],
      transformResponse: (responseData: UpdateOnePointRecordTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindMeQuery, useFindMeStatisticsQuery, useFindQuery, useUpdateOneMutation } = pointRecordApi
export default pointRecordApi
