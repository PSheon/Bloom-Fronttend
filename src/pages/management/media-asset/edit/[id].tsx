// ** Next Imports
import { useRouter } from 'next/router'

// ** Custom Component Imports
import MediaAssetEditLoadingSkeleton from 'src/views/management/media-asset/edit/LoadingSkeleton'
import MediaAssetEditSection from 'src/views/management/media-asset/edit'

// ** API Imports
import { useFindOneQuery } from 'src/store/api/management/mediaAsset'

const MediaAssetEditPage = () => {
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
    return <MediaAssetEditLoadingSkeleton />
  } else {
    return <MediaAssetEditSection initMediaAssetEntity={mediaAssetEntity!} />
  }
}

MediaAssetEditPage.acl = {
  action: 'read',
  subject: 'manager-page'
}

export default MediaAssetEditPage
