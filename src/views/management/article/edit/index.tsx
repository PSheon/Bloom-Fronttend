// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementArticleEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementArticleEditProfileCard from 'src/views/management/article/edit/cards/ManagementArticleEditProfileCard'
import ManagementArticleEditMetadataCard from 'src/views/management/article/edit/cards/ManagementArticleEditMetadataCard'
import ManagementArticleEditTabContext from 'src/views/management/article/edit/tabs/ManagementArticleEditTabContext'

// ** Type Imports
import type { ArticleType } from 'src/types/articleTypes'

interface Props {
  initArticleEntity: ArticleType
}

const ManagementArticleEditSection = (props: Props) => {
  // ** Props
  const { initArticleEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementArticleEditBreadcrumbs
          pageLevels={[
            { title: 'PageBreadcrumb.Management.Articles.PageTitle', href: '/management/article/list' },
            { title: 'PageBreadcrumb.Management.Articles.Edit.PageTitle' }
          ]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ManagementArticleEditProfileCard initArticleEntity={initArticleEntity} />
          </Grid>
          <Grid item xs={12}>
            <ManagementArticleEditMetadataCard initArticleEntity={initArticleEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ManagementArticleEditTabContext initArticleEntity={initArticleEntity} />
      </Grid>
    </Grid>
  )
}

export default ManagementArticleEditSection
