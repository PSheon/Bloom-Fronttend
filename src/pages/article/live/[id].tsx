// ** Next Imports
import { useRouter } from 'next/router'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

// ** Custom Component Imports
import PublicArticleLiveLoadingSkeleton from 'src/views/article/live/PublicArticleLiveLoadingSkeleton'
import PublicArticleLiveSection from 'src/views/article/live'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/article'

// ** Type Imports
import type { ReactNode } from 'react'

const ArticleLivePage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: articleEntity,
    isError: isFindOneArticleEntityError,
    isLoading: isFindOneArticleEntityLoading
  } = useFindOneQuery(Number(router.query.id), {
    skip: router.query.id === undefined
  })

  if (router.query.id === undefined || isFindOneArticleEntityError) {
    router.isReady && router.push('/article/list')
  } else if (isFindOneArticleEntityLoading) {
    return <PublicArticleLiveLoadingSkeleton />
  } else {
    return <PublicArticleLiveSection initArticleEntity={articleEntity!} />
  }
}

ArticleLivePage.authGuard = false
ArticleLivePage.getLayout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>

export default ArticleLivePage
