// ** Next Imports
import Link from 'next/link'
import dynamic from 'next/dynamic'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import format from 'date-fns/format'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CustomChip from 'src/@core/components/mui/chip'

const TextEditorPreview = dynamic(() => import('src/views/shared/TextEditorPreview'), { ssr: false })

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { ArticleType } from 'src/types/articleTypes'

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '.8rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

interface Props {
  initArticleEntity: ArticleType
}

const PublicArticleLiveSection = (props: Props) => {
  // ** Props
  const { initArticleEntity } = props

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <StyledLink href='/article/list'>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon icon='mdi:keyboard-arrow-left' width={18} height={18} />
              Back to Article
            </Stack>
          </StyledLink>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={4}>
            <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start'>
              <CustomChip
                skin='light'
                rounded
                label={
                  <Typography variant='subtitle1' color='primary' sx={{ fontWeight: 500 }}>
                    {initArticleEntity.category}
                  </Typography>
                }
                color='primary'
              />

              <Typography variant='subtitle2' color='secondary'>
                {format(new Date(initArticleEntity.updatedAt), 'E, LLLL do yyyy')}
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography variant='h3' component='h1'>
                {initArticleEntity.displayName}
              </Typography>
              <Typography variant='h6' component='h2' color='secondary'>
                {initArticleEntity.displayName}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={8} lg={9}>
              <TextEditorPreview blocks={initArticleEntity.content} />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Stack spacing={4}>
                <Typography variant='subtitle2' component='p' color='secondary'>
                  Posted by
                </Typography>

                <Stack direction='row' spacing={4} alignItems='center'>
                  <Avatar
                    src={getPublicMediaAssetUrl(
                      initArticleEntity?.author?.data?.attributes.avatar.data?.attributes.url
                    )}
                    alt={initArticleEntity?.author?.data?.attributes.username}
                    sx={{ width: 34, height: 34 }}
                  />

                  <Stack alignItems='flex-start'>
                    <Typography variant='body1' component='p'>
                      {initArticleEntity?.author?.data?.attributes?.username ?? 'Paul'}
                    </Typography>
                    <Typography variant='body2' component='p' color='secondary'>
                      {initArticleEntity?.author?.data?.attributes?.title ??
                        initArticleEntity?.author?.data?.attributes?.email ??
                        'Custom Service Agent'}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default PublicArticleLiveSection
