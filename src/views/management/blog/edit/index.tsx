// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementBlogEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementBlogEditProfileCard from 'src/views/management/blog/edit/cards/ManagementBlogEditProfileCard'
import ManagementBlogEditMetadataCard from 'src/views/management/blog/edit/cards/ManagementBlogEditMetadataCard'
import ManagementBlogEditTabContext from 'src/views/management/blog/edit/tabs/ManagementBlogEditTabContext'

// ** Type Imports
import type { BlogType } from 'src/types/blogTypes'

interface Props {
  initBlogEntity: BlogType
}

const ManagementBlogEditSection = (props: Props) => {
  // ** Props
  const { initBlogEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementBlogEditBreadcrumbs
          pageLevels={[{ title: '文章管理', href: '/management/blog/list' }, { title: '編輯文章' }]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ManagementBlogEditProfileCard initBlogEntity={initBlogEntity} />
          </Grid>
          <Grid item xs={12}>
            <ManagementBlogEditMetadataCard initBlogEntity={initBlogEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ManagementBlogEditTabContext initBlogEntity={initBlogEntity} />
      </Grid>
    </Grid>
  )
}

export default ManagementBlogEditSection
