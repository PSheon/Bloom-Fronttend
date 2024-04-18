// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementAnnouncementEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementAnnouncementEditProfileCard from 'src/views/management/announcement/edit/cards/ManagementAnnouncementEditProfileCard'
import ManagementAnnouncementEditMetadataCard from 'src/views/management/announcement/edit/cards/ManagementAnnouncementEditMetadataCard'
import ManagementAnnouncementEditTabContext from 'src/views/management/announcement/edit/tabs/ManagementAnnouncementEditTabContext'

// ** Type Imports
import { AnnouncementType } from 'src/types/api/announcementTypes'

interface Props {
  initAnnouncementEntity: AnnouncementType
}

const ManagementAnnouncementEditSection = (props: Props) => {
  // ** Props
  const { initAnnouncementEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementAnnouncementEditBreadcrumbs
          pageLevels={[{ title: '公告管理', href: '/management/announcement/list' }, { title: '編輯公告' }]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ManagementAnnouncementEditProfileCard initAnnouncementEntity={initAnnouncementEntity} />
          </Grid>
          <Grid item xs={12}>
            <ManagementAnnouncementEditMetadataCard initAnnouncementEntity={initAnnouncementEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ManagementAnnouncementEditTabContext initAnnouncementEntity={initAnnouncementEntity} />
      </Grid>
    </Grid>
  )
}

export default ManagementAnnouncementEditSection
