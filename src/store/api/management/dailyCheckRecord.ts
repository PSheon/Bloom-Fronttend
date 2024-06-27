// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import toast from 'react-hot-toast'
import { getSession } from 'next-auth/react'

// ** API Imports
import { userApi } from 'src/store/api/management/user'
import { pointRecordApi } from 'src/store/api/management/pointRecord'

// ** Type Imports
import type {
  DailyCheckParamsType,
  DailyCheckTransformResponseType,
  DailyCheckResponseType,
  FindMeDailyCheckRecordsParamsType,
  FindMeDailyCheckRecordsTransformResponseType,
  FindMeDailyCheckRecordsResponseType,
  FindDailyCheckRecordsParamsType,
  FindDailyCheckRecordsTransformResponseType,
  FindDailyCheckRecordsResponseType,
  UpdateOneDailyCheckRecordParamsType,
  UpdateOneDailyCheckRecordTransformResponseType,
  UpdateOneDailyCheckRecordResponseType
} from 'src/types/dailyCheckRecordTypes'

const DAILY_CHECK_RECORD_API_REDUCER_KEY = 'dailyCheckRecordApi'

export const dailyCheckRecordApi = createApi({
  reducerPath: DAILY_CHECK_RECORD_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['DailyCheckRecord'],
  endpoints: builder => ({
    dailyCheck: builder.mutation<DailyCheckResponseType, DailyCheckParamsType>({
      query: () => ({
        url: '/api/daily-check-records/check',
        method: 'POST'
      }),
      invalidatesTags: ['DailyCheckRecord'],
      transformResponse: (responseData: DailyCheckTransformResponseType) => responseData,
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(userApi.util.invalidateTags(['Me']))
          dispatch(pointRecordApi.util.invalidateTags(['PointRecord']))
        } catch (err) {
          toast.error('Error fetching post!')
        }
      }
    }),
    findMe: builder.query<FindMeDailyCheckRecordsResponseType, FindMeDailyCheckRecordsParamsType>({
      query: params => ({
        url: `/api/daily-check-records/me?${qs.stringify(params)}`,
        method: 'GET'
      }),
      providesTags: ['DailyCheckRecord'],
      transformResponse: (responseData: FindMeDailyCheckRecordsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(dailyCheckRecord => ({
          id: dailyCheckRecord.id,
          ...dailyCheckRecord.attributes
        }))
      })
    }),
    find: builder.query<FindDailyCheckRecordsResponseType, FindDailyCheckRecordsParamsType>({
      query: params => ({
        url: `/api/daily-check-records?${qs.stringify({
          ...params,
          populate: ['user', 'user.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindDailyCheckRecordsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(pointRecord => ({
          id: pointRecord.id,
          ...pointRecord.attributes
        }))
      })
    }),
    updateOne: builder.mutation<UpdateOneDailyCheckRecordResponseType, UpdateOneDailyCheckRecordParamsType>({
      query: params => ({
        url: `/api/daily-check-records/${params.id}?${qs.stringify({
          populate: ['user', 'user.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['DailyCheckRecord'],
      transformResponse: (responseData: UpdateOneDailyCheckRecordTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useDailyCheckMutation, useFindMeQuery, useFindQuery, useUpdateOneMutation } = dailyCheckRecordApi
export default dailyCheckRecordApi
