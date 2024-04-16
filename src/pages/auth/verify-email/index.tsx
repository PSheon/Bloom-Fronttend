// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))

const AuthVerifyEmailPage = () => {
  // ** Hook
  const router = useRouter()

  useEffect(() => {
    const { email } = router.query

    if (router.isReady && email === undefined) {
      router.push('/auth/login')
    }
  }, [router])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 9)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogoImage width={48} height={48} />
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Verify your email ✉️
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Account activation link sent to your email address: <strong>{router.query.email}</strong> Please follow
              the link inside to continue.
            </Typography>
          </Box>
          <LinkStyled href='/auth/login'>
            <Button fullWidth variant='contained'>
              登入我的帳號
            </Button>
          </LinkStyled>
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>打錯信箱了嗎？</Typography>
            <LinkStyled href='/auth/register'>重新註冊</LinkStyled>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

AuthVerifyEmailPage.guestGuard = true
AuthVerifyEmailPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthVerifyEmailPage
