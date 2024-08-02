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
import CustomChip from 'src/@core/components/mui/chip'

const TextEditor = dynamic(() => import('src/views/shared/text-editor'), { ssr: false })

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { ArticleType } from 'src/types/articleTypes'
import type { StackProps } from '@mui/material/Stack'

const StyledRootStack = styled(Stack)<StackProps>({
  height: '100%'
})

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
    <StyledRootStack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='flex-start'>
      <Stack alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
        <StyledLink href='/article/list'>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Icon icon='mdi:keyboard-arrow-left' width={18} height={18} />
            Back to Article
          </Stack>
        </StyledLink>
      </Stack>
      <Stack spacing={4} alignSelf='stretch'>
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

      <Stack alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} lg={9} sx={{ lineBreak: 'anywhere' }}>
            <TextEditor blocks={initArticleEntity.content} mode='read' />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Stack spacing={4}>
              <Typography variant='subtitle2' component='p' color='secondary'>
                Posted by
              </Typography>

              <Stack direction='row' spacing={4} alignItems='center'>
                <Avatar
                  src={getPublicMediaAssetUrl(initArticleEntity?.author?.data?.attributes.avatar.data?.attributes.url)}
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
      </Stack>
    </StyledRootStack>
  )
}

export default PublicArticleLiveSection
