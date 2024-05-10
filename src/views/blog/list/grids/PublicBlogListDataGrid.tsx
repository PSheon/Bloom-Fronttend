// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import PublicBlogListLoadingSkeletonCard from 'src/views/blog/list/cards/PublicBlogListLoadingSkeletonCard'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import { BlogType } from 'src/types/api/blogTypes'

interface Props {
  blogs: BlogType[]
  totalRows: number
  isBlogListLoading: boolean
}

const PublicBlogListDataGrid = (props: Props) => {
  // ** Props
  const { blogs, totalRows, isBlogListLoading } = props

  // ** Hooks
  const router = useRouter()

  // ** Logics
  const handleRedirectToBlog = (blogId: number) => {
    router.push(`/blog/live/${blogId}`)
  }

  // ** Renders
  const renderTableDataGrid = () => {
    if (isBlogListLoading) {
      return (
        <Grid container spacing={6}>
          {[...Array(6).keys()].map(index => (
            <Grid key={`blog-skeleton-${index}`} item xs={12} md={6}>
              <PublicBlogListLoadingSkeletonCard />
            </Grid>
          ))}
        </Grid>
      )
    } else if (totalRows === 0) {
      return (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='h5' textAlign='center' sx={{ my: 12, fontSize: '1.5rem !important' }}>
              We are launching soon 🚀
            </Typography>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container spacing={6}>
          {blogs.map(blog => {
            return (
              <Grid key={`blog-${blog.id}`} item xs={12} md={4}>
                <Card
                  onClick={() => handleRedirectToBlog(blog.id)}
                  sx={{
                    border: '1px transparent solid',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    '&:hover': {
                      borderColor: theme => theme.palette.primary.main
                    }
                  }}
                >
                  <CardMedia sx={{ height: 201 }} image={getPublicMediaAssetUrl(blog.cover?.data?.attributes.url)} />
                  <CardContent sx={{ pt: 4 }}>
                    <Typography variant='h6' sx={{ mb: 2 }}>
                      {blog.displayName}
                    </Typography>
                    <Typography variant='body2'>{blog.description}</Typography>
                  </CardContent>
                  <CardContent>
                    <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
                      <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
                        <Avatar
                          src={getPublicMediaAssetUrl(blog.author.data?.attributes.avatar.data?.attributes.url)}
                          alt={blog.author.data?.attributes.username}
                          sx={{ width: 22, height: 22 }}
                        />

                        <Typography variant='caption'>{blog.author?.data?.attributes.username}</Typography>
                      </Stack>

                      <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>
                        18 mutual friends
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {renderTableDataGrid()}
      </Grid>
    </Grid>
  )
}

export default PublicBlogListDataGrid
