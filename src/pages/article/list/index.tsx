// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

// ** Custom Component Imports
import PublicArticleListHeaderGrid from 'src/views/article/list/grids/PublicArticleListHeaderGrid'
import PublicArticleListDataGrid from 'src/views/article/list/grids/PublicArticleListDataGrid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/article'

// ** Type Imports
import type { ReactNode } from 'react'

const ArticleListPage = () => {
  // ** Hooks
  const { data: articlesData, isLoading: isArticleListLoading } = useFindQuery({
    filters: {
      // ...(filteredStatus !== 'all' && { status: filteredStatus })
      // ...(filteredIsHighlighted !== 'all' && { isHighlighted: filteredIsHighlighted === 'isHighlighted' })
    },
    pagination: {
      page: 1,
      pageSize: 25
    }
  })

  // ** Vars
  const articles = articlesData?.data || []
  const totalRows = articlesData?.meta.pagination.total || 0

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PublicArticleListHeaderGrid />
      </Grid>
      <Grid item xs={12}>
        <PublicArticleListDataGrid
          articles={articles}
          totalRows={totalRows}
          isArticleListLoading={isArticleListLoading}
        />
      </Grid>
    </Grid>
  )
}

ArticleListPage.authGuard = false
ArticleListPage.getLayout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>

export default ArticleListPage
