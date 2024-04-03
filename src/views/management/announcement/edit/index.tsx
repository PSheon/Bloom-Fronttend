// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { AnnouncementType } from 'src/types/api/announcementTypes'

// ** Styled Component
import AnnouncementEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import AnnouncementEditProfileCard from 'src/views/management/announcement/edit/cards/AnnouncementEditProfileCard'
import AnnouncementEditMetadataCard from 'src/views/management/announcement/edit/cards/AnnouncementEditMetadataCard'
import AnnouncementEditTabContext from 'src/views/management/announcement/edit/tabs/AnnouncementEditTabContext'

interface Props {
  initAnnouncementEntity: AnnouncementType
}

const AnnouncementEditSection = (props: Props) => {
  // ** Props
  const { initAnnouncementEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AnnouncementEditBreadcrumbs
          pageLevels={[{ title: '公告管理', href: '/management/announcement/list' }, { title: '編輯公告' }]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AnnouncementEditProfileCard initAnnouncementEntity={initAnnouncementEntity} />
          </Grid>
          <Grid item xs={12}>
            <AnnouncementEditMetadataCard initAnnouncementEntity={initAnnouncementEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <AnnouncementEditTabContext initAnnouncementEntity={initAnnouncementEntity} />
      </Grid>
    </Grid>
  )
}

export default AnnouncementEditSection
