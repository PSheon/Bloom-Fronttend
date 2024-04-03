// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { MediaAssetType } from 'src/types/api/mediaAssetTypes'

// ** Styled Component
import MediaAssetEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import MediaAssetEditProfileCard from 'src/views/management/media-asset/edit/cards/MediaAssetEditProfileCard'
import MediaAssetEditMetadataCard from 'src/views/management/media-asset/edit/cards/MediaAssetEditMetadataCard'
import MediaAssetEditTabContext from 'src/views/management/media-asset/edit/tabs/MediaAssetEditTabContext'

interface Props {
  initMediaAssetEntity: MediaAssetType
}

const MediaAssetEditSection = (props: Props) => {
  // ** Props
  const { initMediaAssetEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MediaAssetEditBreadcrumbs
          pageLevels={[{ title: '檔案管理', href: '/management/media-asset/list' }, { title: '編輯檔案' }]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MediaAssetEditProfileCard initMediaAssetEntity={initMediaAssetEntity} />
          </Grid>
          <Grid item xs={12}>
            <MediaAssetEditMetadataCard initMediaAssetEntity={initMediaAssetEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <MediaAssetEditTabContext initMediaAssetEntity={initMediaAssetEntity} />
      </Grid>
    </Grid>
  )
}

export default MediaAssetEditSection
