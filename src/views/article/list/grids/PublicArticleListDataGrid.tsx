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

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Custom Component Imports
import PublicArticleListLoadingSkeletonCard from 'src/views/article/list/cards/PublicArticleListLoadingSkeletonCard'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { ArticleType } from 'src/types/articleTypes'

interface Props {
  articles: ArticleType[]
  totalRows: number
  isArticleListLoading: boolean
}

const PublicArticleListDataGrid = (props: Props) => {
  // ** Props
  const { articles, totalRows, isArticleListLoading } = props

  // ** Hooks
  const router = useRouter()

  // ** Logics
  const handleRedirectToArticle = (articleId: number) => {
    router.push(`/article/live/${articleId}`)
  }

  if (isArticleListLoading) {
    return [...Array(6).keys()].map(index => (
      <Grid key={`article-skeleton-${index}`} item xs={12} md={4}>
        <PublicArticleListLoadingSkeletonCard />
      </Grid>
    ))
  } else if (totalRows === 0) {
    return (
      <Grid item xs={12}>
        <Typography variant='h5' component='p' textAlign='center' sx={{ my: 12, fontSize: '1.5rem !important' }}>
          More articles are coming soon 🚀
        </Typography>
      </Grid>
    )
  } else {
    return articles.map(article => {
      return (
        <Grid key={`article-${article.id}`} item xs={12} md={4}>
          <Card
            onClick={() => handleRedirectToArticle(article.id)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px transparent solid',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              '&:hover': {
                borderColor: theme => theme.palette.primary.main
              }
            }}
          >
            <CardMedia sx={{ height: 201 }} image={getPublicMediaAssetUrl(article.cover?.data?.attributes.url)} />
            <CardContent sx={{ pt: 4 }}>
              <Typography variant='subtitle1' component='p' noWrap>
                {article.displayName}
              </Typography>
              <Typography variant='body2'>{article.description}</Typography>
            </CardContent>
            <CardContent sx={{ mt: 'auto' }}>
              <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
                <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
                  <Avatar
                    src={getPublicMediaAssetUrl(article?.author?.data?.attributes.avatar.data?.attributes.url)}
                    alt={article?.author?.data?.attributes.username ?? 'Paul'}
                    sx={{ width: 22, height: 22 }}
                  />

                  <Typography variant='caption'>
                    {article?.author?.data?.attributes.username ?? 'Custom Service Agent'}
                  </Typography>
                </Stack>

                <Typography variant='caption' sx={{ whiteSpace: 'nowrap' }}>
                  {format(new Date(article.updatedAt), 'E, LLLL do yyyy')}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      )
    })
  }
}

export default PublicArticleListDataGrid
