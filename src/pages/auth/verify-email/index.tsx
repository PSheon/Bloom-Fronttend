// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Type Imports
import type { ReactNode } from 'react'
import type { CardContentProps } from '@mui/material/CardContent'
import type { CardProps } from '@mui/material/Card'

// ** Styled Components
const StyledRootCard = styled(Card)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const MainCardContentStyled = styled(CardContent)<CardContentProps>(({ theme }) => ({
  position: 'relative',
  padding: `${theme.spacing(8, 12, 10)} !important`,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(2, 4, 6.5)} !important`
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))

const AuthVerifyEmailPage = () => {
  // ** Hooks
  const router = useRouter()
  const theme = useTheme()
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    const { email } = router.query

    if (router.isReady && email === undefined) {
      router.push('/auth/login')
    }
  }, [router])

  return (
    <Box className='content-center'>
      <StyledRootCard sx={{ zIndex: 1 }}>
        <MainCardContentStyled>
          <Stack spacing={6} alignItems='flex-start'>
            <Link href='/'>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isDesktopView ? <LogoImage width={80} height={80} /> : <LogoImage width={64} height={64} />}
              </Box>
            </Link>
            <Box sx={{ width: '100%' }}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Verify your email ✉️
              </Typography>
              <Typography color='text.secondary'>
                Account activation link sent to your email address: <strong>{router.query.email}</strong> Please follow
                the link inside to continue.
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <LinkStyled href='/auth/login'>
                <Button fullWidth variant='contained'>
                  Sign in
                </Button>
              </LinkStyled>
            </Box>
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='center'
              flexWrap='wrap'
              sx={{ width: '100%' }}
            >
              <Typography color='text.secondary'>Not this Email？</Typography>
              <LinkStyled href='/auth/register'>Register again</LinkStyled>
            </Stack>
          </Stack>
        </MainCardContentStyled>
      </StyledRootCard>
    </Box>
  )
}

AuthVerifyEmailPage.guestGuard = true
AuthVerifyEmailPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthVerifyEmailPage
