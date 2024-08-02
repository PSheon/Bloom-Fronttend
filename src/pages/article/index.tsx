// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Layout Imports
import CommonLayout from 'src/layouts/CommonLayout'

// ** Type Imports
import type { ReactNode } from 'react'

const ArticlePage = () => {
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    router.push('/article/list')
  }, [router])
}

ArticlePage.authGuard = false
ArticlePage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default ArticlePage
