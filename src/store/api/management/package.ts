// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import toast from 'react-hot-toast'
import { getSession } from 'next-auth/react'

// ** API Imports
import { fundApi } from 'src/store/api/management/fund'

// ** Type Imports
import type {
  FindOnePackageParamsType,
  FindOnePackageTransformResponseType,
  FindOnePackageResponseType,
  FindPackagesParamsType,
  FindPackagesTransformResponseType,
  FindPackagesResponseType,
  CreatePackageParamsType,
  CreatePackageTransformResponseType,
  CreatePackageResponseType,
  UpdateOnePackageParamsType,
  UpdateOnePackageTransformResponseType,
  UpdateOnePackageResponseType,
  DeleteOnePackageParamsType,
  DeleteOnePackageTransformResponseType,
  DeleteOnePackageResponseType
} from 'src/types/packageTypes'

const PACKAGE_API_REDUCER_KEY = 'packageApi'

export const packageApi = createApi({
  reducerPath: PACKAGE_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['Package'],
  endpoints: builder => ({
    findOne: builder.query<FindOnePackageResponseType, FindOnePackageParamsType>({
      query: packageId => ({
        url: `/api/packages/${packageId}?${qs.stringify({
          populate: ['banner', 'slots']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Package'],
      transformResponse: (responseData: FindOnePackageTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindPackagesResponseType, FindPackagesParamsType>({
      query: params => ({
        url: `/api/packages?${qs.stringify({
          ...params,
          populate: ['banner']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Package'],
      transformResponse: (responseData: FindPackagesTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(pkg => ({
          id: pkg.id,
          ...pkg.attributes
        }))
      })
    }),
    create: builder.mutation<CreatePackageResponseType, CreatePackageParamsType>({
      query: params => ({
        url: `/api/packages?${qs.stringify({
          populate: ['banner']
        })}`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: CreatePackageTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOnePackageResponseType, UpdateOnePackageParamsType>({
      query: params => ({
        url: `/api/packages/${params.id}?${qs.stringify({
          populate: ['banner', 'slots']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Package'],
      transformResponse: (responseData: UpdateOnePackageTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(fundApi.util.invalidateTags(['Fund']))
        } catch (err) {
          toast.error('Error fetching post!')
        }
      }
    }),
    deleteOne: builder.mutation<DeleteOnePackageResponseType, DeleteOnePackageParamsType>({
      query: packageId => ({
        url: `/api/packages/${packageId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Package'],
      transformResponse: (responseData: DeleteOnePackageTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindOneQuery, useFindQuery, useCreateMutation, useUpdateOneMutation, useDeleteOneMutation } =
  packageApi
export default packageApi
