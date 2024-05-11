// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

// ** Type Imports
import type { ReactNode } from 'react'

const BlogPage = () => {
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    router.push('/blog/list')
  }, [router])
}

BlogPage.authGuard = false
BlogPage.getLayout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>

export default BlogPage
