// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third Party Imports
import qs from 'qs'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  FindMeOneUserParamsType,
  FindMeOneUserTransformResponseType,
  FindMeOneUserResponseType,
  FindOneUserParamsType,
  FindOneUserTransformResponseType,
  FindOneUserResponseType,
  FindUsersParamsType,
  FindUsersTransformResponseType,
  FindUsersResponseType,
  UpdateOneUserParamsType,
  UpdateOneUserTransformResponseType,
  UpdateOneUserResponseType,
  UpdateMeOneUserParamsType,
  UpdateMeOneUserTransformResponseType,
  UpdateMeOneUserResponseType
} from 'src/types/api/userTypes'

const USER_API_REDUCER_KEY = 'userApi'
export const userApi = createApi({
  reducerPath: USER_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: headers => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      headers.set('Authorization', `Bearer ${storedToken}`)

      return headers
    }
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    findMeOne: builder.query<FindMeOneUserResponseType, FindMeOneUserParamsType>({
      query: () => ({
        url: `/api/users/me?${qs.stringify({
          populate: ['avatar', 'role']
        })}`,
        method: 'GET'
      }),
      providesTags: ['User'],
      transformResponse: (responseData: FindMeOneUserTransformResponseType) => responseData
    }),
    findOne: builder.query<FindOneUserResponseType, FindOneUserParamsType>({
      query: userId => ({
        url: `/api/users/${userId}?${qs.stringify({
          populate: ['avatar', 'role']
        })}`,
        method: 'GET'
      }),
      providesTags: ['User'],
      transformResponse: (responseData: FindOneUserTransformResponseType) => responseData
    }),
    find: builder.query<FindUsersResponseType, FindUsersParamsType>({
      query: params => ({
        url: `/api/users?${qs.stringify({
          ...params,
          populate: ['avatar', 'role']
        })}`,
        method: 'GET'
      }),
      providesTags: ['User'],
      transformResponse: (responseData: FindUsersTransformResponseType) => responseData
    }),
    updateOne: builder.mutation<UpdateOneUserResponseType, UpdateOneUserParamsType>({
      query: params => ({
        url: `/api/users/${params.id}?${qs.stringify({
          populate: ['avatar', 'role']
        })}`,
        method: 'PUT',
        body: params.data
      }),
      invalidatesTags: ['User'],
      transformResponse: (responseData: UpdateOneUserTransformResponseType) => responseData
    }),
    updateMeOne: builder.mutation<UpdateMeOneUserResponseType, UpdateMeOneUserParamsType>({
      query: params => ({
        url: `/api/users/me?${qs.stringify({
          populate: ['avatar', 'role']
        })}`,
        method: 'PUT',
        body: params.data
      }),
      invalidatesTags: ['User'],
      transformResponse: (responseData: UpdateMeOneUserTransformResponseType) => responseData
    })
  })
})

export const { useFindMeOneQuery, useFindOneQuery, useFindQuery, useUpdateOneMutation, useUpdateMeOneMutation } =
  userApi
