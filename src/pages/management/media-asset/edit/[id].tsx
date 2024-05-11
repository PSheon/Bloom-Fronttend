// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import ManagementMediaAssetEditLoadingSkeleton from 'src/views/management/media-asset/edit/ManagementMediaAssetEditLoadingSkeleton'
import ManagementMediaAssetEditSection from 'src/views/management/media-asset/edit'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/mediaAsset'

const ManagementMediaAssetEditPage = () => {
  // ** Hooks
  const router = useRouter()

  const {
    data: mediaAssetEntity,
    isError: isFindOneMediaAssetEntityError,
    isLoading: isFindOneMediaAssetEntityLoading
  } = useFindOneQuery(Number(router.query.id))

  if (router.query.id === undefined || isFindOneMediaAssetEntityError) {
    router.push('/management/media-asset/list')
  } else if (isFindOneMediaAssetEntityLoading) {
    return <ManagementMediaAssetEditLoadingSkeleton />
  } else {
    return <ManagementMediaAssetEditSection initMediaAssetEntity={mediaAssetEntity!} />
  }
}

ManagementMediaAssetEditPage.acl = {
  action: 'read',
  subject: 'planner-page'
}

export default ManagementMediaAssetEditPage
