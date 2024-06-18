// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'

// ** Styled Components
const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}))

const FooterWrapper = styled('footer')(({ theme }) => ({
  width: '100%',
  minHeight: theme.spacing(64),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(12, 6, 4),
  backgroundColor: theme.palette.background.paper,
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(48)
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

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

const CommonFooter = () => {
  return (
    <StyledRootBox>
      <FooterWrapper
        sx={{
          ...{
            mx: 'auto',
            '@media (min-width:1440px)': { maxWidth: 1440 },
            '@media (min-width:1200px)': { maxWidth: '100%' }
          }
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Typography variant='h5' sx={{ fontWeight: 900 }}>
                {themeConfig.templateName}
              </Typography>
              <Typography variant='subtitle1'>Decentralized Liquidity Infrastructure</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={6}>
              <Grid item xs={4}>
                <Stack spacing={{ xs: 2, md: 4 }}>
                  <Typography variant='h6' sx={{ fontWeight: 900 }}>
                    Docs
                  </Typography>
                  <StyledLink href='/article/list'>Articles</StyledLink>
                  <StyledLink href='https://eips.ethereum.org/EIPS/eip-3525' target='_blank'>
                    ERC-3525
                  </StyledLink>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={{ xs: 2, md: 4 }}>
                  <Typography variant='h6' sx={{ fontWeight: 900 }}>
                    Community
                  </Typography>
                  <StyledLink href='' target='_blank'>
                    Twitter
                  </StyledLink>
                  <StyledLink href='' target='_blank'>
                    Telegram
                  </StyledLink>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={{ xs: 2, md: 4 }}>
                  <Typography variant='h6' sx={{ fontWeight: 900 }}>
                    About
                  </Typography>
                  <StyledLink href='/terms-of-service' target='_blank'>
                    Terms of Service
                  </StyledLink>
                  <StyledLink href='/privacy-policy' target='_blank'>
                    Privacy Policy
                  </StyledLink>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Typography variant='caption'>{`© 2024 ${themeConfig.templateName} All Rights Reserved.`}</Typography>
        </Box>
      </FooterWrapper>
    </StyledRootBox>
  )
}

export default CommonFooter
