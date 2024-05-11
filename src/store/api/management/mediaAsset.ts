// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindOneMediaAssetParamsType,
  FindOneMediaAssetTransformResponseType,
  FindOneMediaAssetResponseType,
  FindMediaAssetsParamsType,
  FindMediaAssetsTransformResponseType,
  findMediaAssetsResponseType,
  UploadMediaAssetsParamsType,
  UploadMediaAssetsTransformResponseType,
  UploadMediaAssetsResponseType,
  UpdateOneMediaAssetParamsType,
  UpdateOneMediaAssetTransformResponseType,
  UpdateOneMediaAssetResponseType,
  DeleteOneMediaAssetsParamsType,
  DeleteOneMediaAssetsTransformResponseType,
  DeleteOneMediaAssetsResponseType
} from 'src/types/mediaAssetTypes'

const MEDIA_ASSET_API_REDUCER_KEY = 'mediaAssetApi'

export const mediaAssetApi = createApi({
  reducerPath: MEDIA_ASSET_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['MediaAsset'],
  endpoints: builder => ({
    findOne: builder.query<FindOneMediaAssetResponseType, FindOneMediaAssetParamsType>({
      query: fileId => ({
        url: `/api/upload/files/${fileId}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindOneMediaAssetTransformResponseType) => responseData
    }),
    find: builder.query<findMediaAssetsResponseType, FindMediaAssetsParamsType>({
      query: params => ({
        url: `/api/upload/files?${qs.stringify({
          ...params
        })}`,
        method: 'GET'
      }),
      providesTags: ['MediaAsset'],
      transformResponse: (responseData: FindMediaAssetsTransformResponseType) => responseData
    }),
    upload: builder.mutation<UploadMediaAssetsResponseType, UploadMediaAssetsParamsType>({
      query: params => ({
        url: `/api/upload`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['MediaAsset'],
      transformResponse: (responseData: UploadMediaAssetsTransformResponseType) => responseData
    }),
    updateOne: builder.mutation<UpdateOneMediaAssetResponseType, UpdateOneMediaAssetParamsType>({
      query: params => ({
        url: `/api/upload/files/${params.id}`,
        method: 'PUT',
        body: params.data
      }),
      transformResponse: (responseData: UpdateOneMediaAssetTransformResponseType) => responseData
    }),
    deleteOne: builder.mutation<DeleteOneMediaAssetsResponseType, DeleteOneMediaAssetsParamsType>({
      query: mediaAssetId => ({
        url: `/api/upload/files/${mediaAssetId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['MediaAsset'],
      transformResponse: (responseData: DeleteOneMediaAssetsTransformResponseType) => responseData
    })
  })
})

export const { useFindOneQuery, useFindQuery, useUploadMutation, useUpdateOneMutation, useDeleteOneMutation } =
  mediaAssetApi
export default mediaAssetApi
