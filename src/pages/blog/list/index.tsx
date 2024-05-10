// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

// ** Custom Component Imports
import PublicBlogListHeaderGrid from 'src/views/blog/list/grids/PublicBlogListHeaderGrid'
import PublicBlogListDataGrid from 'src/views/blog/list/grids/PublicBlogListDataGrid'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/blog'

const BlogListPage = () => {
  // ** Hooks
  const { data: blogsData, isLoading: isBlogListLoading } = useFindQuery({
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
  const blogs = blogsData?.data || []
  const totalRows = blogsData?.meta.pagination.total || 0

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PublicBlogListHeaderGrid />
      </Grid>
      <Grid item xs={12}>
        <PublicBlogListDataGrid blogs={blogs} totalRows={totalRows} isBlogListLoading={isBlogListLoading} />
      </Grid>
    </Grid>
  )
}

BlogListPage.authGuard = false
BlogListPage.getLayout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>

export default BlogListPage
