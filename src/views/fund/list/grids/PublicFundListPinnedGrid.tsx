// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Styled component for the image
const Img = styled('img')(({ theme }) => ({
  height: '11rem',
  borderRadius: theme.shape.borderRadius
}))

const PublicFundListPinnedGrid = () => {
  // ** Hooks
  const router = useRouter()

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
      <Grid item xs={12} md={6}>
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
                  What are RWAs - Real World Assets?
                </Typography>
                <Typography variant='body2' component='p'>
                  Learn more
                </Typography>
              </Stack>

              <Stack alignItems='center'>
                <Img alt='Stumptown Roasters' src='/images/cards/analog-clock.jpg' />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
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
                  What are RWAs - Real World Assets?
                </Typography>
                <Typography variant='body2' component='p'>
                  Learn more
                </Typography>
              </Stack>

              <Stack alignItems='center'>
                <Img alt='Stumptown Roasters' src='/images/cards/analog-clock.jpg' />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PublicFundListPinnedGrid
