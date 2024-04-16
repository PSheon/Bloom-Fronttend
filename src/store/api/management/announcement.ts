// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third Party Imports
import qs from 'qs'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  FindOneAnnouncementParamsType,
  FindOneAnnouncementTransformResponseType,
  FindOneAnnouncementResponseType,
  FindAnnouncementsParamsType,
  FindAnnouncementsTransformResponseType,
  FindAnnouncementsResponseType,
  CreateAnnouncementParamsType,
  CreateAnnouncementTransformResponseType,
  CreateAnnouncementResponseType,
  UpdateOneAnnouncementParamsType,
  UpdateOneAnnouncementTransformResponseType,
  UpdateOneAnnouncementResponseType,
  DeleteOneAnnouncementParamsType,
  DeleteOneAnnouncementTransformResponseType,
  DeleteOneAnnouncementResponseType
} from 'src/types/api/announcementTypes'

const ANNOUNCEMENT_API_REDUCER_KEY = 'announcementApi'
export const announcementApi = createApi({
  reducerPath: ANNOUNCEMENT_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: headers => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      headers.set('Authorization', `Bearer ${storedToken}`)

      return headers
    }
  }),
  tagTypes: ['Announcement'],
  endpoints: builder => ({
    findOne: builder.query<FindOneAnnouncementResponseType, FindOneAnnouncementParamsType>({
      query: announceId => ({
        url: `/api/announcements/${announceId}?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Announcement'],
      transformResponse: (responseData: FindOneAnnouncementTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindAnnouncementsResponseType, FindAnnouncementsParamsType>({
      query: params => ({
        url: `/api/announcements?${qs.stringify({
          ...params,
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Announcement'],
      transformResponse: (responseData: FindAnnouncementsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(announcement => ({
          id: announcement.id,
          ...announcement.attributes
        }))
      })
    }),
    create: builder.mutation<CreateAnnouncementResponseType, CreateAnnouncementParamsType>({
      query: params => ({
        url: `/api/announcements?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: CreateAnnouncementTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOneAnnouncementResponseType, UpdateOneAnnouncementParamsType>({
      query: params => ({
        url: `/api/announcements/${params.id}?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Announcement'],
      transformResponse: (responseData: UpdateOneAnnouncementTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteOne: builder.mutation<DeleteOneAnnouncementResponseType, DeleteOneAnnouncementParamsType>({
      query: announceId => ({
        url: `/api/announcements/${announceId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Announcement'],
      transformResponse: (responseData: DeleteOneAnnouncementTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindOneQuery, useFindQuery, useCreateMutation, useUpdateOneMutation, useDeleteOneMutation } =
  announcementApi
export default announcementApi
