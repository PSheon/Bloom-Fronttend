// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

// import Checkbox from '@mui/material/Checkbox'
// import TextField from '@mui/material/TextField'
// import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'

// import OutlinedInput from '@mui/material/OutlinedInput'
// import FormHelperText from '@mui/material/FormHelperText'
// import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// import MuiFormControlLabel from '@mui/material/FormControlLabel'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
// import * as yup from 'yup'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
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

// ** Type Imports
import type { ReactNode, MouseEvent } from 'react'
import type { CardContentProps } from '@mui/material/CardContent'
import type { StackProps } from '@mui/material/Stack'

// import type { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Styled Components
const StyledMainCardContent = styled(CardContent)<CardContentProps>(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: theme.spacing(140),
  padding: `${theme.spacing(10)} !important`,
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(80),
    padding: `${theme.spacing(8, 6, 8)} !important`
  }
}))

const StyledTitleStack = styled(Stack)<StackProps>(({ theme }) => ({
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(4) }
}))

// const StyledFormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
//   '& .MuiFormControlLabel-label': {
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary
//   }
// }))

const StyledSidecarCardContent = styled(CardContent)<CardContentProps>(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${theme.spacing(10, 10, 10, 0)} !important`
}))

const StyledLoginIllustrationWrapperStack = styled(Stack)<StackProps>(({ theme }) => ({
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.light
}))

const StyledLoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  filter: `drop-shadow(0 0 0.75rem ${theme.palette.background.default})`,
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().min(5).required()
// })

// const defaultValues = {
//   email: 'admin@bloom.media.app',
//   password: 'admin123'
// }

// interface FormData {
//   email: string
//   password: string
// }

const AuthLoginPage = () => {
  // ** States
  // const [isLoginCredentialsLoading, setIsLoginCredentialsLoading] = useState<boolean>(false)
  const [isLoginGoogleLoading, setIsLoginGoogleLoading] = useState<boolean>(false)
  const [isLoginFacebookLoading, setIsLoginFacebookLoading] = useState<boolean>(false)
  const [isLoginDiscordLoading, setIsLoginDiscordLoading] = useState<boolean>(false)
  const [isLoginMicrosoftLoading, setIsLoginMicrosoftLoading] = useState<boolean>(false)

  // const [rememberMe, setRememberMe] = useState<boolean>(true)
  // const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const searchParams = useSearchParams()
  const router = useRouter()
  const theme = useTheme()
  const bgColors = useBgColor()
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'))

  // const {
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({
  //   defaultValues,
  //   mode: 'onBlur',
  //   resolver: yupResolver(schema)
  // })

  // ** Vars
  // TODO: fix this custom error later
  const returnUrl = searchParams.get('returnUrl')
  const authError = searchParams.get('error')

  const callbackUrl = returnUrl?.match(/\/points\/\?referral-id=[23456789A-HJ-NP-Z]{8}/gi) ? returnUrl : '/portfolio'

  // ** Logics
  const handleResetOAuthError = () => {
    const newQuery = Object.assign({}, router.query)

    delete newQuery.error

    router.replace({
      query: newQuery
    })
  }

  const handleLoginGoogle = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoginGoogleLoading(true)

    await signIn('google', { callbackUrl })
  }

  const handleLoginFacebook = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoginFacebookLoading(true)

    await signIn('facebook', { callbackUrl })
  }

  const handleLoginDiscord = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoginDiscordLoading(true)

    await signIn('discord', { callbackUrl })
  }

  const handleLoginMicrosoft = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoginMicrosoftLoading(true)

    // await signIn(
    //   'azure-ad',
    //   { callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/azure-ad/callback` },
    //   { prompt: 'login' }
    // )
    await signIn('azure-ad', { callbackUrl }, { prompt: 'login' })
  }

  // const onSubmit = async (data: FormData) => {
  //   const { email, password } = data

  //   setIsLoginCredentialsLoading(true)

  //   const signInResponse = await signIn('credentials', {
  //     identifier: email,
  //     password,
  //     rememberMe,
  //     redirect: false
  //   })

  //   if (signInResponse && !signInResponse?.ok) {
  //     setIsLoginCredentialsLoading(false)

  //     if (signInResponse.status === 401) {
  //       if (signInResponse.error === 'Invalid identifier or password') {
  //         setError('email', {
  //           type: 'manual',
  //           message: 'Email or Password is invalid'
  //         })
  //       }

  //       if (signInResponse.error === 'Your account email is not confirmed') {
  //         router.push(`/auth/verify-email?email=${email}`)
  //       }
  //     }
  //   } else {
  //     const returnUrl = router.query.returnUrl
  //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

  //     router.replace(redirectURL as string)
  //   }
  // }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, width: '100%', maxWidth: theme => theme.spacing(isDesktopView ? 360 : 120) }}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <StyledMainCardContent>
              <Stack>
                <Link href='/'>
                  {isDesktopView ? <LogoImage width={64} height={64} /> : <LogoImage width={48} height={48} />}
                </Link>
              </Stack>
              <StyledTitleStack spacing={2}>
                <Typography
                  variant='h5'
                  component='p'
                  sx={{ fontWeight: 600, letterSpacing: '0.18px' }}
                >{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
                <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
              </StyledTitleStack>
              {/* <Alert
                icon={false}
                sx={{ width: '100%', py: 3, mt: 4, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}
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
              </Alert> */}
              {authError && (
                <Alert
                  icon={false}
                  action={
                    <IconButton size='small' color='inherit' onClick={handleResetOAuthError}>
                      <Icon icon='mdi:close' fontSize='inherit' />
                    </IconButton>
                  }
                  sx={{ width: '100%', py: 3, mt: 4, ...bgColors.errorLight, '& .MuiAlert-message': { p: 0 } }}
                >
                  <Typography variant='caption' color='error.main'>
                    Error:{' '}
                    <strong>
                      Email has already been used. Please try another email or login with your existing account
                    </strong>
                  </Typography>
                </Alert>
              )}
              <Stack spacing={4} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 6 }}>
                {/* <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth>
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
                  <FormControl fullWidth sx={{ mt: 4 }}>
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
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>
                  <Stack direction='row' alignItems='center' justifyContent='space-between' flexWrap='wrap' sx={{ mt: 2 }}>
                    <StyledFormControlLabel
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
                  </Stack>
                  <LoadingButton
                    fullWidth
                    loading={isLoginCredentialsLoading}
                    disabled={Boolean(errors.email)}
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{ mt: 4 }}
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
                </Divider> */}
                <LoadingButton
                  fullWidth
                  loading={isLoginGoogleLoading}
                  size='large'
                  variant='outlined'
                  startIcon={<Image src='/images/socials/google.png' alt='google-icon' width={20} height={20} />}
                  onClick={handleLoginGoogle}
                  sx={{ fontWeight: 600, fontSize: '1rem' }}
                >
                  Continue with Google
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  loading={isLoginFacebookLoading}
                  size='large'
                  variant='outlined'
                  startIcon={<Image src='/images/socials/facebook.png' alt='facebook-icon' width={20} height={20} />}
                  onClick={handleLoginFacebook}
                  sx={{ fontWeight: 600, fontSize: '1rem' }}
                >
                  Continue with Facebook
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  loading={isLoginDiscordLoading}
                  size='large'
                  variant='outlined'
                  startIcon={<Image src='/images/socials/discord.png' alt='discord-icon' width={20} height={20} />}
                  onClick={handleLoginDiscord}
                  sx={{ fontWeight: 600, fontSize: '1rem' }}
                >
                  Continue with Discord
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  loading={isLoginMicrosoftLoading}
                  size='large'
                  variant='outlined'
                  startIcon={<Image src='/images/socials/microsoft.png' alt='microsoft-icon' width={20} height={20} />}
                  onClick={handleLoginMicrosoft}

                  // sx={{ fontWeight: 600, fontSize: '1rem' }}
                >
                  Continue with Microsoft
                </LoadingButton>
              </Stack>
              {/* <Stack
                direction='row'
                spacing={4}
                alignSelf='stretch'
                alignItems='center'
                justifyContent='center'
                flexWrap='wrap'
                sx={{ mt: 'auto', pt: 6 }}
              >
                <Typography noWrap color='text.secondary'>
                  New on our platform?
                </Typography>
                <Typography
                  component={Link}
                  href='/auth/register'
                  noWrap
                  color='primary.main'
                  sx={{ textDecoration: 'none' }}
                >
                  Create an account
                </Typography>
              </Stack> */}
              <Stack
                direction='row'
                spacing={4}
                alignSelf='stretch'
                alignItems='center'
                justifyContent='center'
                flexWrap='wrap'
                divider={<Divider orientation='vertical' flexItem />}
                sx={{ mt: 'auto', pt: 6 }}
              >
                <Typography
                  component={Link}
                  href='/terms-of-service'
                  noWrap
                  color='primary.main'
                  sx={{ textDecoration: 'none' }}
                >
                  Terms of Service
                </Typography>
                <Typography
                  component={Link}
                  href='/privacy-policy'
                  noWrap
                  color='primary.main'
                  sx={{ textDecoration: 'none' }}
                >
                  Privacy Policy
                </Typography>
              </Stack>
            </StyledMainCardContent>
          </Grid>
          {isDesktopView && (
            <Grid item xs={12} md={7}>
              <StyledSidecarCardContent>
                <StyledLoginIllustrationWrapperStack
                  spacing={4}
                  alignSelf='stretch'
                  alignItems='center'
                  justifyContent='center'
                >
                  <StyledLoginIllustration height={350} alt='login-illustration' src='/images/auth/login.webp' />
                  <Stack spacing={2} alignItems='center'>
                    <Typography
                      variant='h6'
                      component='p'
                      color='common.white'
                      textAlign='center'
                      sx={{ fontWeight: 600, maxWidth: '20ch' }}
                    >
                      Demo trade without any financial commitment
                    </Typography>
                    <Typography
                      variant='caption'
                      component='p'
                      color='text.secondary'
                      textAlign='center'
                      sx={{ maxWidth: '48ch' }}
                    >
                      We provide a certain amount of virtual funds, which they can use to place trade on various
                      cryptocurrencies.
                    </Typography>
                  </Stack>
                </StyledLoginIllustrationWrapperStack>
              </StyledSidecarCardContent>
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  )
}

AuthLoginPage.guestGuard = true
AuthLoginPage.contentHeightFixed = true
AuthLoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthLoginPage
