// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindOneBlogParamsType,
  FindOneBlogTransformResponseType,
  FindOneBlogResponseType,
  FindBlogsParamsType,
  FindBlogsTransformResponseType,
  FindBlogsResponseType,
  CreateBlogParamsType,
  CreateBlogTransformResponseType,
  CreateBlogResponseType,
  UpdateOneBlogParamsType,
  UpdateOneBlogTransformResponseType,
  UpdateOneBlogResponseType,
  DeleteOneBlogParamsType,
  DeleteOneBlogTransformResponseType,
  DeleteOneBlogResponseType
} from 'src/types/api/blogTypes'

const BLOG_API_REDUCER_KEY = 'blogApi'

export const blogApi = createApi({
  reducerPath: BLOG_API_REDUCER_KEY,
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
  tagTypes: ['Blog'],
  endpoints: builder => ({
    findOne: builder.query<FindOneBlogResponseType, FindOneBlogParamsType>({
      query: blogId => ({
        url: `/api/blogs/${blogId}?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Blog'],
      transformResponse: (responseData: FindOneBlogTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindBlogsResponseType, FindBlogsParamsType>({
      query: params => ({
        url: `/api/blogs?${qs.stringify({
          ...params,
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Blog'],
      transformResponse: (responseData: FindBlogsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(blog => ({
          id: blog.id,
          ...blog.attributes
        }))
      })
    }),
    create: builder.mutation<CreateBlogResponseType, CreateBlogParamsType>({
      query: params => ({
        url: `/api/blogs?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: CreateBlogTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOneBlogResponseType, UpdateOneBlogParamsType>({
      query: params => ({
        url: `/api/blogs/${params.id}?${qs.stringify({
          populate: ['cover', 'author', 'author.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Blog'],
      transformResponse: (responseData: UpdateOneBlogTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteOne: builder.mutation<DeleteOneBlogResponseType, DeleteOneBlogParamsType>({
      query: blogId => ({
        url: `/api/blogs/${blogId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Blog'],
      transformResponse: (responseData: DeleteOneBlogTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindOneQuery, useFindQuery, useCreateMutation, useUpdateOneMutation, useDeleteOneMutation } = blogApi
export default blogApi
