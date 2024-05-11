// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useResetPasswordMutation } from 'src/store/api/auth'

// ** Type Imports
import type { ReactNode } from 'react'
import type { CardContentProps } from '@mui/material/CardContent'
import type { TypographyProps } from '@mui/material/Typography'

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

const ResetPasswordIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const schema = yup.object().shape({
  password: yup.string().min(5).required(),
  passwordConfirmation: yup.string().min(5).required()
})

interface FormData {
  password: string
  passwordConfirmation: string
}

const AuthResetPasswordPage = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const router = useRouter()
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'))
  const [resetPassword, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: 'Admin123',
      passwordConfirmation: 'Admin123'
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Logics
  const onSubmit = async (data: FormData) => {
    const { password, passwordConfirmation } = data
    const resetPasswordToken = router.query.resetPasswordToken as string

    if (password !== passwordConfirmation) {
      setError('passwordConfirmation', {
        type: 'manual',
        message: 'Password and Confirm Password does not match'
      })

      return
    }

    resetPassword({ password, passwordConfirmation, resetPasswordToken })
      .unwrap()
      .then(({ ok }) => {
        if (ok) {
          toast.success('Password reset successfully, please login again.')
          router.push('/auth/login')
        }
      })
      .catch(error => {
        let errorMessage = 'Internal Server Error'

        if (error?.status === 404) {
          errorMessage = 'Incorrect code provided'
        } else if (error?.status === 429) {
          errorMessage = 'We have already sent you an email, please check your inbox or wait 3 minutes'
        }

        setError('passwordConfirmation', {
          type: 'manual',
          message: errorMessage
        })

        toast.error(errorMessage)
      })
  }

  // ** Side Effects
  useEffect(() => {
    const { resetPasswordToken } = router.query

    if (router.isReady && resetPasswordToken === undefined) {
      router.push('/auth/login')
    }
  }, [router])

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
              <ResetPasswordIllustration
                height={500}
                alt='reset-password-illustration'
                src='/images/auth/reset-password-illustration.svg'
              />
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
                  <TitleTypographyStyled variant='h5' sx={{ mt: '0 !important' }}>
                    Reset Password 🔒
                  </TitleTypographyStyled>
                  <Typography variant='body2'>
                    Your new password must be different from previously used passwords
                  </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel htmlFor='auth-reset-password' error={Boolean(errors.password)}>
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
                            id='auth-reset-password'
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

                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel htmlFor='auth-reset-password-confirm' error={Boolean(errors.passwordConfirmation)}>
                        Password Confirm
                      </InputLabel>
                      <Controller
                        name='passwordConfirmation'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <OutlinedInput
                            value={value}
                            onBlur={onBlur}
                            label='Password Confirm'
                            onChange={onChange}
                            id='auth-reset-password-confirm'
                            error={Boolean(errors.passwordConfirmation)}
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
                      {errors.passwordConfirmation && (
                        <FormHelperText sx={{ color: 'error.main' }} id=''>
                          {errors.passwordConfirmation.message}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <LoadingButton
                      fullWidth
                      loading={isResetPasswordLoading}
                      disabled={Boolean(errors.password || errors.passwordConfirmation)}
                      size='large'
                      type='submit'
                      variant='contained'
                      sx={{ my: 5.25 }}
                    >
                      Set New Password
                    </LoadingButton>

                    <Stack
                      direction='row'
                      spacing={2}
                      alignItems='center'
                      justifyContent='center'
                      flexWrap='wrap'
                      sx={{ width: '100%', pt: 8 }}
                    >
                      <Typography
                        component={Link}
                        href='/auth/login'
                        noWrap
                        sx={{
                          display: 'flex',
                          '& svg': { mr: 1.5 },
                          alignItems: 'center',
                          color: 'primary.main',
                          textDecoration: 'none',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon icon='mdi:chevron-left' fontSize='2rem' />
                        <span>Back to login</span>
                      </Typography>
                    </Stack>
                  </form>
                </Box>
              </Stack>
            </MainCardContentStyled>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

AuthResetPasswordPage.guestGuard = true
AuthResetPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthResetPasswordPage
