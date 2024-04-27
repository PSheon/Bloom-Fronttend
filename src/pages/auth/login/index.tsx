// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const MainCardContentStyled = styled(CardContent)<CardContentProps>(({ theme }) => ({
  position: 'relative',
  padding: `${theme.spacing(8, 12, 10)} !important`,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(2, 4, 6.5)} !important`
  }
}))
const TitleTypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))
const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))
const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  email: 'admin@bloom.media.app',
  password: 'admin123'
}

interface FormData {
  email: string
  password: string
}

const AuthLoginPage = () => {
  // ** States
  const [isLoginCredentialsLoading, setIsLoginCredentialsLoading] = useState<boolean>(false)
  const [isLoginGoogleLoading, setIsLoginGoogleLoading] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()
  const theme = useTheme()
  const bgColors = useBgColor()
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'))

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleLoginGoogle = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoginGoogleLoading(true)

    await signIn('google', { callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/callback/google` })
  }
  const onSubmit = async (data: FormData) => {
    const { email, password } = data
    setIsLoginCredentialsLoading(true)

    const signInResponse = await signIn('credentials', {
      identifier: email,
      password,
      rememberMe,
      redirect: false
    })
    if (signInResponse && !signInResponse?.ok) {
      setIsLoginCredentialsLoading(false)
      if (signInResponse.status === 401) {
        if (signInResponse.error === 'Invalid identifier or password') {
          setError('email', {
            type: 'manual',
            message: 'Email or Password is invalid'
          })
        }
        if (signInResponse.error === 'Your account email is not confirmed') {
          router.push(`/auth/verify-email?email=${email}`)
        }
      }
    } else {
      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, width: '100%', maxWidth: theme => theme.spacing(isDesktopView ? 360 : 120) }}>
        <Grid container className='match-height'>
          {isDesktopView && (
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LoginIllustration height={500} alt='login-illustration' src='/images/auth/login-illustration.svg' />
            </Grid>
          )}
          <Grid item xs={12} md={5}>
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
                <Box>
                  <TitleTypographyStyled
                    variant='h5'
                    sx={{ mt: '0 !important' }}
                  >{`Welcome to ${themeConfig.templateName}! 👋🏻`}</TitleTypographyStyled>
                  <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
                </Box>
                <Alert
                  icon={false}
                  sx={{ width: '100%', py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}
                >
                  <Typography variant='caption' sx={{ mb: 2, display: 'block', color: 'primary.main' }}>
                    Admin: <strong>admin@bloom.media.app</strong> / Pass: <strong>admin123</strong>
                  </Typography>
                  <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
                    Planner: <strong>planner@bloom.media.app</strong> / Pass: <strong>planner123</strong>
                  </Typography>
                  <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
                    Asset Manager: <strong>asset-manager@bloom.media.app</strong> / Pass:{' '}
                    <strong>asset-manager123</strong>
                  </Typography>
                  <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
                    User: <strong>user@bloom.media.app</strong> / Pass: <strong>user123</strong>
                  </Typography>
                </Alert>
                <Box sx={{ width: '100%' }}>
                  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='Email'
                            type='email'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.email)}
                          />
                        )}
                      />
                      {errors.email && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='auth-login-password' error={Boolean(errors.password)}>
                        Password
                      </InputLabel>
                      <Controller
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <OutlinedInput
                            value={value}
                            onBlur={onBlur}
                            label='Password'
                            onChange={onChange}
                            id='auth-login-password'
                            error={Boolean(errors.password)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        )}
                      />
                      {errors.password && (
                        <FormHelperText sx={{ color: 'error.main' }} id=''>
                          {errors.password.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Box
                      sx={{
                        mb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                      }}
                    >
                      <FormControlLabel
                        label='Remember Me'
                        control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                      />
                      <Typography
                        variant='body2'
                        component={Link}
                        href='/auth/forgot-password'
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                      >
                        Forgot Password?
                      </Typography>
                    </Box>
                    <LoadingButton
                      fullWidth
                      loading={isLoginCredentialsLoading}
                      disabled={Boolean(errors.email)}
                      size='large'
                      type='submit'
                      variant='contained'
                      sx={{ textTransform: 'inherit' }}
                    >
                      Login
                    </LoadingButton>
                  </form>
                  <Divider
                    sx={{
                      width: '100%',
                      mt: theme => `${theme.spacing(5)} !important`,
                      '& .MuiDivider-wrapper': { px: 4 }
                    }}
                  >
                    or
                  </Divider>
                  <Box sx={{ mt: 6 }}>
                    <LoadingButton
                      fullWidth
                      loading={isLoginGoogleLoading}
                      size='large'
                      variant='outlined'
                      startIcon={<Image src='/images/socials/google.png' alt='google-icon' width={20} height={20} />}
                      onClick={handleLoginGoogle}
                      sx={{ textTransform: 'inherit' }}
                    >
                      Sign up with Google
                    </LoadingButton>
                  </Box>
                </Box>
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems='center'
                  justifyContent='center'
                  flexWrap='wrap'
                  sx={{ width: '100%', pt: 8 }}
                >
                  <Typography noWrap sx={{ color: 'text.secondary' }}>
                    New on our platform?
                  </Typography>
                  <Typography
                    component={Link}
                    href='/auth/register'
                    noWrap
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    Create an account
                  </Typography>
                </Stack>
              </Stack>
            </MainCardContentStyled>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

AuthLoginPage.guestGuard = true
AuthLoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthLoginPage
