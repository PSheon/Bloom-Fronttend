// ** React Imports
import { ReactNode, Fragment } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'

// ** Layout Imports
import LandingLayout from 'src/layouts/LandingLayout'

// ** Custom Component Imports
import LandingAppBarSection from 'src/views/landing/sections/LandingAppBarSection'
import LandingHeaderSection from 'src/views/landing/sections/LandingHeaderSection'
import LandingFeaturesSection from 'src/views/landing/sections/LandingFeaturesSection'
import LandingPlatformSection from 'src/views/landing/sections/LandingPlatformSection'
import LandingCustomerSupportSection from 'src/views/landing/sections/LandingCustomerSupportSection'
import LandingBuyAndSellSection from 'src/views/landing/sections/LandingBuyAndSellSection'
import LandingSafeAndSecuritySection from 'src/views/landing/sections/LandingSafeAndSecuritySection'
import LandingFooterSection from 'src/views/landing/sections/LandingFooterSection'

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const LandingPage = () => {
  return (
    <Fragment>
      {/* AppBar */}
      <LandingAppBarSection />

      {/* Content */}
      <ContentWrapper
        className='layout-page-content'
        sx={{
          ...{
            mx: 'auto',
            '@media (min-width:1440px)': { maxWidth: 1440 },
            '@media (min-width:1200px)': { maxWidth: '100%' }
          }
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <LandingHeaderSection />
          </Grid>
          <Grid item xs={12}>
            <LandingFeaturesSection />
          </Grid>
          <Grid item xs={12}>
            <LandingPlatformSection />
          </Grid>
          <Grid item xs={12}>
            <LandingCustomerSupportSection />
          </Grid>
          <Grid item xs={12}>
            <LandingBuyAndSellSection />
          </Grid>
          <Grid item xs={12}>
            <LandingSafeAndSecuritySection />
          </Grid>
          <Grid item xs={12}>
            <LandingFooterSection />
          </Grid>
        </Grid>
      </ContentWrapper>
    </Fragment>
  )
}

LandingPage.authGuard = false
LandingPage.getLayout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>

export default LandingPage
