// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindOneArticleParamsType,
  FindOneArticleTransformResponseType,
  FindOneArticleResponseType,
  FindArticlesParamsType,
  FindArticlesTransformResponseType,
  FindArticlesResponseType,
  CreateArticleParamsType,
  CreateArticleTransformResponseType,
  CreateArticleResponseType,
  UpdateOneArticleParamsType,
  UpdateOneArticleTransformResponseType,
  UpdateOneArticleResponseType,
  DeleteOneArticleParamsType,
  DeleteOneArticleTransformResponseType,
  DeleteOneArticleResponseType
} from 'src/types/articleTypes'

const ARTICLE_API_REDUCER_KEY = 'articleApi'

export const articleApi = createApi({
  reducerPath: ARTICLE_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      if (session?.accessToken) {
        headers.set('Authorization', `Bearer ${session?.accessToken}`)
      }

      return headers
    }
  }),
  tagTypes: ['Article'],
  endpoints: builder => ({
    findOne: builder.query<FindOneArticleResponseType, FindOneArticleParamsType>({
      query: announceId => ({
        url: `/api/articles/${announceId}?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Article'],
      transformResponse: (responseData: FindOneArticleTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindArticlesResponseType, FindArticlesParamsType>({
      query: params => ({
        url: `/api/articles?${qs.stringify({
          ...params,
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Article'],
      transformResponse: (responseData: FindArticlesTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(article => ({
          id: article.id,
          ...article.attributes
        }))
      })
    }),
    create: builder.mutation<CreateArticleResponseType, CreateArticleParamsType>({
      query: params => ({
        url: `/api/articles?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: CreateArticleTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOneArticleResponseType, UpdateOneArticleParamsType>({
      query: params => ({
        url: `/api/articles/${params.id}?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Article'],
      transformResponse: (responseData: UpdateOneArticleTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteOne: builder.mutation<DeleteOneArticleResponseType, DeleteOneArticleParamsType>({
      query: announceId => ({
        url: `/api/articles/${announceId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Article'],
      transformResponse: (responseData: DeleteOneArticleTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindOneQuery, useFindQuery, useCreateMutation, useUpdateOneMutation, useDeleteOneMutation } =
  articleApi
export default articleApi
