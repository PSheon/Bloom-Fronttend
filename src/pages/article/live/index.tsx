// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

// ** Type Imports
import type { ReactNode } from 'react'

const ArticleLivePage = () => {
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    router.push('/article/list')
  }, [router])
}

ArticleLivePage.authGuard = false
ArticleLivePage.getLayout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>

export default ArticleLivePage
