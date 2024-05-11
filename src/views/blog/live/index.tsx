// ** Next Imports
import Link from 'next/link'

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
import TextEditorPreview from 'src/views/shared/TextEditorPreview'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { BlogType } from 'src/types/api/blogTypes'

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
  initBlogEntity: BlogType
}

const PublicBlogLiveSection = (props: Props) => {
  // ** Props
  const { initBlogEntity } = props

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <StyledLink href='/blog/list'>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon icon='mdi:keyboard-arrow-left' width={18} height={18} />
              Back to Blog
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
                    {initBlogEntity.category}
                  </Typography>
                }
                color='primary'
              />

              <Typography variant='subtitle2' color='secondary'>
                {format(new Date(initBlogEntity.updatedAt), 'E, LLLL do yyyy')}
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography variant='h3' component='h1'>
                {initBlogEntity.displayName}
              </Typography>
              <Typography variant='h6' component='h2' color='secondary'>
                {initBlogEntity.displayName}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={8} lg={9}>
              <TextEditorPreview blocks={initBlogEntity.content} />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Stack spacing={4}>
                <Typography variant='subtitle2' component='p' color='secondary'>
                  Posted by
                </Typography>

                <Stack direction='row' spacing={4} alignItems='center'>
                  <Avatar
                    src={getPublicMediaAssetUrl(initBlogEntity.author.data?.attributes.avatar.data?.attributes.url)}
                    alt={initBlogEntity.author.data?.attributes.username}
                    sx={{ width: 34, height: 34 }}
                  />

                  <Stack alignItems='flex-start'>
                    <Typography variant='body1' component='p'>
                      Posted by
                    </Typography>
                    <Typography variant='body2' component='p' color='secondary'>
                      Posted by
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

export default PublicBlogLiveSection
