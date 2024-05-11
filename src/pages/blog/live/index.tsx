// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

// ** Type Imports
import type { ReactNode } from 'react'

const BlogLivePage = () => {
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    router.push('/blog/list')
  }, [router])
}

BlogLivePage.authGuard = false
BlogLivePage.getLayout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>

export default BlogLivePage
