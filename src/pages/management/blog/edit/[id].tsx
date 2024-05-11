// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/blog'

// ** Custom Component Imports
import ManagementBlogEditLoadingSkeleton from 'src/views/management/blog/edit/ManagementBlogEditLoadingSkeleton'
import ManagementBlogEditSection from 'src/views/management/blog/edit'

const ManagementBlogEditPage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: blogEntity,
    isError: isFindOneBlogEntityError,
    isLoading: isFindOneBlogEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneBlogEntityError) {
    router.push('/management/blog/list')
  } else if (isFindOneBlogEntityLoading) {
    return <ManagementBlogEditLoadingSkeleton />
  } else {
    return <ManagementBlogEditSection initBlogEntity={blogEntity!} />
  }
}

ManagementBlogEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementBlogEditPage
