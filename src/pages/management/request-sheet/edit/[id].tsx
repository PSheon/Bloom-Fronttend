// ** Next Imports
import { useRouter } from 'next/router'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/requestSheet'

// ** Custom Component Imports
import RequestSheetEditLoadingSkeleton from 'src/views/management/request-sheet/edit/LoadingSkeleton'
import RequestSheetEditSection from 'src/views/management/request-sheet/edit'

const RequestSheetEditPage = () => {
  // ** Hooks
  const router = useRouter()
  const {
    data: requestSheetEntity,
    isError: isFindOneRequestSheetEntityError,
    isLoading: isFindOneRequestSheetEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneRequestSheetEntityError) {
    router.push('/management/request-sheet/list')
  } else if (isFindOneRequestSheetEntityLoading) {
    return <RequestSheetEditLoadingSkeleton />
  } else {
    return <RequestSheetEditSection initRequestSheetEntity={requestSheetEntity!} />
  }
}

RequestSheetEditPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default RequestSheetEditPage
