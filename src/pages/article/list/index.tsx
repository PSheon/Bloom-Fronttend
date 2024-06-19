// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'

// ** Layout Imports
import CommonLayout from 'src/layouts/CommonLayout'

// ** Custom Component Imports
import PublicArticleListHeaderGrid from 'src/views/article/list/grids/PublicArticleListHeaderGrid'
import PublicArticleListDataGrid from 'src/views/article/list/grids/PublicArticleListDataGrid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/article'

// ** Type Imports
import type { ReactNode } from 'react'
import type { StackProps } from '@mui/material/Stack'

const StyledRootStack = styled(Stack)<StackProps>({
  height: '100%'
})

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
    <StyledRootStack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='flex-start'>
      <PublicArticleListHeaderGrid
        filteredCategory={filteredCategory}
        handleFilterCategoryChange={handleFilterCategoryChange}
      />
      <PublicArticleListDataGrid
        articles={articles}
        totalRows={totalRows}
        isArticleListLoading={isArticleListLoading}
      />
    </StyledRootStack>
  )
}

ArticleListPage.authGuard = false
ArticleListPage.getLayout = (page: ReactNode) => <CommonLayout>{page}</CommonLayout>

export default ArticleListPage
