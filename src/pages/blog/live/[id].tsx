'use client'

// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

// ** Custom Component Imports
import PublicBlogLiveLoadingSkeleton from 'src/views/blog/live/PublicBlogLiveLoadingSkeleton'
import PublicBlogLiveSection from 'src/views/blog/live'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/blog'

const BlogLivePage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: blogEntity,
    isError: isFindOneBlogEntityError,
    isLoading: isFindOneBlogEntityLoading
  } = useFindOneQuery(Number(router.query.id), {
    skip: router.query.id === undefined
  })

  if (router.query.id === undefined || isFindOneBlogEntityError) {
    router.isReady && router.push('/blog/list')
  } else if (isFindOneBlogEntityLoading) {
    return <PublicBlogLiveLoadingSkeleton />
  } else {
    return <PublicBlogLiveSection initBlogEntity={blogEntity!} />
  }
}

BlogLivePage.authGuard = false
BlogLivePage.getLayout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>

export default BlogLivePage
