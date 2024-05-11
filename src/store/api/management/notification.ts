// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindMeOneNotificationParamsType,
  FindMeOneNotificationTransformResponseType,
  FindMeOneNotificationResponseType,
  FindMeNotificationParamsType,
  FindMeNotificationTransformResponseType,
  FindMeNotificationResponseType,
  FindOneNotificationParamsType,
  FindOneNotificationTransformResponseType,
  FindOneNotificationResponseType,
  FindNotificationsParamsType,
  FindNotificationsTransformResponseType,
  FindNotificationsResponseType,
  UpdateMeOneNotificationParamsType,
  UpdateMeOneNotificationTransformResponseType,
  UpdateMeOneNotificationResponseType,
  UpdateOneNotificationParamsType,
  UpdateOneNotificationTransformResponseType,
  UpdateOneNotificationResponseType,
  DeleteOneNotificationParamsType,
  DeleteOneNotificationTransformResponseType,
  DeleteOneNotificationResponseType
} from 'src/types/api/notificationTypes'

const NOTIFICATION_API_REDUCER_KEY = 'notificationApi'

export const notificationApi = createApi({
  reducerPath: NOTIFICATION_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['Notification'],
  endpoints: builder => ({
    findMeOne: builder.query<FindMeOneNotificationResponseType, FindMeOneNotificationParamsType>({
      query: notificationId => ({
        url: `/api/notifications/me/${notificationId}?${qs.stringify({
          populate: ['notifier', 'notifier.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Notification'],
      transformResponse: (responseData: FindMeOneNotificationTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    findMe: builder.query<FindMeNotificationResponseType, FindMeNotificationParamsType>({
      query: params => ({
        url: `/api/notifications/me?${qs.stringify({
          ...params,
          populate: ['notifier', 'notifier.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Notification'],
      transformResponse: (responseData: FindMeNotificationTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(announcement => ({
          id: announcement.id,
          ...announcement.attributes
        }))
      })
    }),
    findOne: builder.query<FindOneNotificationResponseType, FindOneNotificationParamsType>({
      query: notificationId => ({
        url: `/api/notifications/${notificationId}?${qs.stringify({
          populate: ['notifier', 'notifier.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindOneNotificationTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindNotificationsResponseType, FindNotificationsParamsType>({
      query: params => ({
        url: `/api/notifications?${qs.stringify({
          ...params,
          populate: ['notifier', 'notifier.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Notification'],
      transformResponse: (responseData: FindNotificationsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(notification => ({
          id: notification.id,
          ...notification.attributes
        }))
      })
    }),
    updateMeOne: builder.mutation<UpdateMeOneNotificationResponseType, UpdateMeOneNotificationParamsType>({
      query: params => ({
        url: `/api/notifications/me/${params.id}?${qs.stringify({
          populate: ['notifier', 'notifier.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Notification'],
      transformResponse: (responseData: UpdateMeOneNotificationTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOneNotificationResponseType, UpdateOneNotificationParamsType>({
      query: params => ({
        url: `/api/notifications/${params.id}?${qs.stringify({
          populate: ['notifier', 'notifier.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Notification'],
      transformResponse: (responseData: UpdateOneNotificationTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteOne: builder.mutation<DeleteOneNotificationResponseType, DeleteOneNotificationParamsType>({
      query: notificationId => ({
        url: `/api/notifications/${notificationId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Notification'],
      transformResponse: (responseData: DeleteOneNotificationTransformResponseType) => ({
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
  useUpdateMeOneMutation,
  useUpdateOneMutation,
  useDeleteOneMutation
} = notificationApi
export default notificationApi
