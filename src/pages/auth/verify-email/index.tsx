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

const StyledMainCardContent = styled(CardContent)<CardContentProps>(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: theme.spacing(100),
  padding: `${theme.spacing(10)} !important`,
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(80),
    padding: `${theme.spacing(8, 6, 8)} !important`
  }
}))

const StyledTitleStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(4) }
}))

const StyledLinkStyled = styled(Link)(({ theme }) => ({
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
      // router.push('/auth/login')
    }
  }, [router])

  return (
    <Box className='content-center'>
      <StyledRootCard sx={{ zIndex: 1 }}>
        <StyledMainCardContent>
          <Stack>
            <Link href='/'>
              {isDesktopView ? <LogoImage width={64} height={64} /> : <LogoImage width={48} height={48} />}
            </Link>
          </Stack>
          <StyledTitleStack spacing={2}>
            <Typography variant='h5' component='p' sx={{ fontWeight: 600, letterSpacing: '0.18px' }}>
              Verify your email ✉️
            </Typography>
            <Typography variant='body2'>
              Account activation link sent to your email address: <strong>{router.query.email}</strong> Please follow
              the link inside to continue.
            </Typography>
          </StyledTitleStack>

          <Stack spacing={4} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 6 }}>
            <Button fullWidth variant='contained' component={Link} href='/auth/login'>
              Sign in
            </Button>
          </Stack>

          <Stack
            direction='row'
            spacing={4}
            alignSelf='stretch'
            alignItems='center'
            justifyContent='center'
            flexWrap='wrap'
            sx={{ mt: 'auto', pt: 6 }}
          >
            <Typography color='text.secondary'>Not this Email？</Typography>
            <StyledLinkStyled href='/auth/register'>Register again</StyledLinkStyled>
          </Stack>
        </StyledMainCardContent>
      </StyledRootCard>

      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(rgba(109, 120, 141, 0.1) 3px 5px 2px)'
        }}
      >
        <svg width='100%' height='100%' viewBox='0 0 1058 966' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1055.06 552.999C1091.47 249.795 755.975 157.315 741.035 -95.2809C732.856 -233.555 756.702 -515.423 274.803 -439.695C-36.1376 -389.677 -69.3567 -90.7183 136.322 180.179C183.923 261.906 184.084 332.264 161.894 412.139C139.703 492.014 3.68302 611.494 0.808565 797.173C-7.84038 1355.94 918.692 1688.48 1055.06 552.999Z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
    </Box>
  )
}

AuthVerifyEmailPage.guestGuard = true
AuthVerifyEmailPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthVerifyEmailPage
