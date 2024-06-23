// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/article'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Styled component for the image
const Img = styled('img')(({ theme }) => ({
  width: '11rem',
  height: '11rem',
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover'
}))

const PublicFundListPinnedGrid = () => {
  // ** Hooks
  const router = useRouter()

  const { data: articlesData, isLoading: isArticleListLoading } = useFindQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 2
    }
  })

  // ** Vars
  const articles = articlesData?.data || []
  const totalRows = articlesData?.meta.pagination.total || 0

  // ** Logics
  const handleRedirectToArticle = (articleId: number) => {
    router.push(`/article/live/${articleId}`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          {`Discover what's new`}
        </Typography>
      </Grid>
      {isArticleListLoading ? (
        [...Array(2).keys()].map(index => (
          <Grid key={`article-skeleton-${index}`} item xs={12} md={6}>
            <Card
              sx={{
                border: '1px transparent solid',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                '&:hover': {
                  borderColor: theme => theme.palette.primary.main
                }
              }}
            >
              <CardContent sx={{ p: theme => `${theme.spacing(6)} !important` }}>
                <Stack
                  direction={{ xs: 'column-reverse', sm: 'row' }}
                  spacing={6}
                  alignItems={{ xs: 'reverse', sm: 'center' }}
                  justifyContent={{ xs: 'center', sm: 'space-between' }}
                >
                  <Stack>
                    <Skeleton variant='text' width={280} height={32} />
                    <Skeleton variant='text' width={120} height={18} />
                  </Stack>

                  <Stack alignItems='center'>
                    <Skeleton variant='rounded' width={160} height={160} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : totalRows === 0 ? (
        <Grid item xs={12}>
          <Card
            sx={{
              border: '1px transparent solid',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              '&:hover': {
                borderColor: theme => theme.palette.primary.main
              }
            }}
          >
            <CardContent sx={{ p: theme => `${theme.spacing(6)} !important` }}>
              We are working on something new. Stay tuned!
            </CardContent>
          </Card>
        </Grid>
      ) : (
        articles.map(article => (
          <Grid key={`article-${article.id}`} item xs={12} md={6}>
            <Card
              onClick={() => handleRedirectToArticle(1)}
              sx={{
                border: '1px transparent solid',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                '&:hover': {
                  borderColor: theme => theme.palette.primary.main
                }
              }}
            >
              <CardContent sx={{ p: theme => `${theme.spacing(6)} !important` }}>
                <Stack
                  direction={{ xs: 'column-reverse', sm: 'row' }}
                  spacing={6}
                  alignItems={{ xs: 'reverse', sm: 'center' }}
                  justifyContent={{ xs: 'center', sm: 'space-between' }}
                >
                  <Stack>
                    <Typography variant='h6' component='p' sx={{ mt: 4 }}>
                      {article.displayName}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      Learn more
                    </Typography>
                  </Stack>

                  <Stack alignItems='center'>
                    <Img alt={article.displayName} src={getPublicMediaAssetUrl(article.cover?.data?.attributes.url)} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default PublicFundListPinnedGrid
