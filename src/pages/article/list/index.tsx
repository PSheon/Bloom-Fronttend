// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Layout Imports
import CommonLayout from 'src/layouts/CommonLayout'

// ** Custom Component Imports
import PublicArticleListHeaderGrid from 'src/views/article/list/grids/PublicArticleListHeaderGrid'
import PublicArticleListDataGrid from 'src/views/article/list/grids/PublicArticleListDataGrid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/article'

// ** Type Imports
import type { ReactNode } from 'react'

const ArticleListPage = () => {
  // ** States
  const [filteredCategory, setFilteredCategory] = useState<string>('all')

  // ** Hooks
  const { data: articlesData, isLoading: isArticleListLoading } = useFindQuery({
    filters: {
      ...(filteredCategory !== 'all' && { category: filteredCategory })
    },
    pagination: {
      page: 1,
      pageSize: 25
    }
  })

  // ** Vars
  const articles = articlesData?.data || []
  const totalRows = articlesData?.meta.pagination.total || 0

  // ** Logics
  const handleFilterCategoryChange = useCallback((newCategory: string) => {
    setFilteredCategory(newCategory)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PublicArticleListHeaderGrid
          filteredCategory={filteredCategory}
          handleFilterCategoryChange={handleFilterCategoryChange}
        />
      </Grid>
      <Grid item xs={12} sx={{ minHeight: theme => theme.spacing(80) }}>
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
ArticleListPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default ArticleListPage
