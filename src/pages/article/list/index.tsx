// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'

// ** Layout Imports
import CommonLayout from 'src/layouts/CommonLayout'

// ** Custom Component Imports
import PublicArticleListHeaderTabGrid from 'src/views/article/list/grids/PublicArticleListHeaderTabGrid'
import PublicArticleListHeaderTitleGrid from 'src/views/article/list/grids/PublicArticleListHeaderTitleGrid'
import PublicArticleListDataGrid from 'src/views/article/list/grids/PublicArticleListDataGrid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/article'

// ** Type Imports
import type { ReactNode } from 'react'
import type { GridProps } from '@mui/material/Grid'

const StyledRootGrid = styled(Grid)<GridProps>(({ theme }) => ({
  height: '100%',
  paddingBottom: theme.spacing(12)
}))

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
    <StyledRootGrid container spacing={6} alignItems='center' justifyContent='flex-start'>
      <PublicArticleListHeaderTabGrid
        filteredCategory={filteredCategory}
        handleFilterCategoryChange={handleFilterCategoryChange}
      />
      <PublicArticleListHeaderTitleGrid filteredCategory={filteredCategory} />
      <Grid item xs={12}>
        <Grid container spacing={6} className='match-height'>
          <PublicArticleListDataGrid
            articles={articles}
            totalRows={totalRows}
            isArticleListLoading={isArticleListLoading}
          />
        </Grid>
      </Grid>
    </StyledRootGrid>
  )
}

ArticleListPage.authGuard = false
ArticleListPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default ArticleListPage
