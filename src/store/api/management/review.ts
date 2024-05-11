// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindMeOneReviewParamsType,
  FindMeOneReviewTransformResponseType,
  FindMeOneReviewResponseType,
  FindMeReviewParamsType,
  FindMeReviewTransformResponseType,
  FindMeReviewResponseType,
  FindOneReviewParamsType,
  FindOneReviewTransformResponseType,
  FindOneReviewResponseType,
  FindReviewsParamsType,
  FindReviewsTransformResponseType,
  FindReviewsResponseType,
  CreateReviewParamsType,
  CreateReviewTransformResponseType,
  CreateReviewResponseType,
  UpdateMeOneReviewParamsType,
  UpdateMeOneReviewTransformResponseType,
  UpdateMeOneReviewResponseType,
  UpdateOneReviewParamsType,
  UpdateOneReviewTransformResponseType,
  UpdateOneReviewResponseType,
  DeleteMeOneReviewParamsType,
  DeleteMeOneReviewTransformResponseType,
  DeleteMeOneReviewResponseType,
  DeleteOneReviewParamsType,
  DeleteOneReviewTransformResponseType,
  DeleteOneReviewResponseType
} from 'src/types/api/reviewTypes'

const REVIEW_API_REDUCER_KEY = 'reviewApi'

export const reviewApi = createApi({
  reducerPath: REVIEW_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['Review'],
  endpoints: builder => ({
    findMeOne: builder.query<FindMeOneReviewResponseType, FindMeOneReviewParamsType>({
      query: reviewId => ({
        url: `/api/reviews/me/${reviewId}?${qs.stringify({
          populate: ['requestSheet', 'reviewer', 'reviewer.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindMeOneReviewTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    findMe: builder.query<FindMeReviewResponseType, FindMeReviewParamsType>({
      query: params => ({
        url: `/api/reviews/me?${qs.stringify({
          ...params,
          populate: ['requestSheet', 'reviewer', 'reviewer.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindMeReviewTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(review => ({
          id: review.id,
          ...review.attributes
        }))
      })
    }),
    findOne: builder.query<FindOneReviewResponseType, FindOneReviewParamsType>({
      query: reviewId => ({
        url: `/api/reviews/${reviewId}?${qs.stringify({
          populate: ['requestSheet', 'reviewer', 'reviewer.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindOneReviewTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindReviewsResponseType, FindReviewsParamsType>({
      query: params => ({
        url: `/api/reviews?${qs.stringify({
          ...params,
          populate: ['requestSheet', 'reviewer', 'reviewer.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Review'],
      transformResponse: (responseData: FindReviewsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(review => ({
          id: review.id,
          ...review.attributes
        }))
      })
    }),
    create: builder.mutation<CreateReviewResponseType, CreateReviewParamsType>({
      query: params => ({
        url: `/api/reviews?${qs.stringify({
          populate: ['requestSheet', 'reviewer', 'reviewer.avatar']
        })}`,
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Review'],
      transformResponse: (responseData: CreateReviewTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateMeOne: builder.mutation<UpdateMeOneReviewResponseType, UpdateMeOneReviewParamsType>({
      query: params => ({
        url: `/api/reviews/me/${params.id}?${qs.stringify({
          populate: ['requestSheet', 'reviewer', 'reviewer.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Review'],
      transformResponse: (responseData: UpdateMeOneReviewTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOneReviewResponseType, UpdateOneReviewParamsType>({
      query: params => ({
        url: `/api/reviews/${params.id}?${qs.stringify({
          populate: ['requestSheet', 'reviewer', 'reviewer.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Review'],
      transformResponse: (responseData: UpdateOneReviewTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteMeOne: builder.mutation<DeleteMeOneReviewResponseType, DeleteMeOneReviewParamsType>({
      query: reviewId => ({
        url: `/api/reviews/me/${reviewId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Review'],
      transformResponse: (responseData: DeleteMeOneReviewTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteOne: builder.mutation<DeleteOneReviewResponseType, DeleteOneReviewParamsType>({
      query: reviewId => ({
        url: `/api/reviews/${reviewId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Review'],
      transformResponse: (responseData: DeleteOneReviewTransformResponseType) => ({
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
  useDeleteMeOneMutation,
  useDeleteOneMutation
} = reviewApi
export default reviewApi
