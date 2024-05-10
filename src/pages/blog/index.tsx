// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

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
