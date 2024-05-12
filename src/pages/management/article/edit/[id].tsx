// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/article'

// ** Custom Component Imports
import ManagementArticleEditLoadingSkeleton from 'src/views/management/article/edit/ManagementArticleEditLoadingSkeleton'
import ManagementArticleEditSection from 'src/views/management/article/edit'

const ManagementArticleEditPage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: articleEntity,
    isError: isFindOneArticleEntityError,
    isLoading: isFindOneArticleEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneArticleEntityError) {
    router.push('/management/article/list')
  } else if (isFindOneArticleEntityLoading) {
    return <ManagementArticleEditLoadingSkeleton />
  } else {
    return <ManagementArticleEditSection initArticleEntity={articleEntity!} />
  }
}

ManagementArticleEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementArticleEditPage
