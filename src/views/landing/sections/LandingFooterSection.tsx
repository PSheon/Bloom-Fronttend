// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Box, { BoxProps } from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(64),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(48)
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

const LandingFooterSection = () => {
  return (
    <StyledRootBox>
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
                <StyledLink href=''>Documentation</StyledLink>
                <StyledLink href=''>ERC-3525</StyledLink>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={{ xs: 2, md: 4 }}>
                <Typography variant='h6' sx={{ fontWeight: 900 }}>
                  Community
                </Typography>
                <StyledLink href=''>Twitter</StyledLink>
                <StyledLink href=''>Telegram</StyledLink>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={{ xs: 2, md: 4 }}>
                <Typography variant='h6' sx={{ fontWeight: 900 }}>
                  About
                </Typography>
                <StyledLink href=''>Blog</StyledLink>
                <StyledLink href=''>Contract</StyledLink>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 6 }}>
        <Typography variant='caption'>{`© 2024 ${themeConfig.templateName} All Rights Reserved.`}</Typography>
      </Box>
    </StyledRootBox>
  )
}

export default LandingFooterSection
