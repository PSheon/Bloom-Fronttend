// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementMediaAssetEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementMediaAssetEditProfileCard from 'src/views/management/media-asset/edit/cards/ManagementMediaAssetEditProfileCard'
import ManagementMediaAssetEditMetadataCard from 'src/views/management/media-asset/edit/cards/ManagementMediaAssetEditMetadataCard'
import ManagementMediaAssetEditTabContext from 'src/views/management/media-asset/edit/tabs/ManagementMediaAssetEditTabContext'

// ** Type Imports
import type { MediaAssetType } from 'src/types/mediaAssetTypes'

interface Props {
  initMediaAssetEntity: MediaAssetType
}

const ManagementMediaAssetEditSection = (props: Props) => {
  // ** Props
  const { initMediaAssetEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementMediaAssetEditBreadcrumbs
          pageLevels={[{ title: 'Media Asset Management', href: '/management/media-asset/list' }, { title: 'Edit' }]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ManagementMediaAssetEditProfileCard initMediaAssetEntity={initMediaAssetEntity} />
          </Grid>
          <Grid item xs={12}>
            <ManagementMediaAssetEditMetadataCard initMediaAssetEntity={initMediaAssetEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ManagementMediaAssetEditTabContext initMediaAssetEntity={initMediaAssetEntity} />
      </Grid>
    </Grid>
  )
}

export default ManagementMediaAssetEditSection
