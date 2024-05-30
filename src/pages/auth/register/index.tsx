// ** React Imports
import { Fragment, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
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
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Layout Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useRegisterMutation } from 'src/store/api/auth'

// ** Type Imports
import type { ReactNode } from 'react'
import type { CardContentProps } from '@mui/material/CardContent'
import type { TypographyProps } from '@mui/material/Typography'
import type { FormControlLabelProps } from '@mui/material/FormControlLabel'

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
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const SidecarCardContentStyled = styled(CardContent)<CardContentProps>(({ theme }) => ({
  width: '100%',
  padding: `${theme.spacing(12, 8)} !important`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center'
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  username: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  username: '',
  email: '',
  password: ''
}

interface FormData {
  username: string
  email: string
  password: string
}

const AuthRegisterPage = () => {
  // ** States
  const [isAgreeTerms, setIsAgreeTerms] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()
  const theme = useTheme()
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'))
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation()

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
  const onSubmit = async (data: FormData) => {
    const { username, email, password } = data

    register({ username, email, password })
      .unwrap()
      .then(({ user }) => {
        router.replace(`/auth/verify-email?email=${user.email}`)
      })
      .catch(error => {
        let errorMessage = 'Internal Server Error'

        if (error?.status === 400) {
          errorMessage = 'Email or Username are already taken'
        } else if (error?.status === 429) {
          errorMessage = 'You have exceeded the number of login attempts'
        }

        setError('email', {
          type: 'manual',
          message: errorMessage
        })
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, width: '100%', maxWidth: theme => theme.spacing(isDesktopView ? 360 : 120) }}>
        <Grid container>
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
                    Adventure starts here 🚀
                  </TitleTypographyStyled>
                  <Typography variant='body2'>Make your app management easy and fun!</Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='username'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='名稱'
                            fullWidth
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.username)}
                          />
                        )}
                      />
                      {errors.username && <FormHelperText color='error.main'>{errors.username.message}</FormHelperText>}
                    </FormControl>
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
                      {errors.email && <FormHelperText color='error.main'>{errors.email.message}</FormHelperText>}
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
                            label='信箱'
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
                      {errors.password && <FormHelperText color='error.main'>{errors.password.message}</FormHelperText>}
                    </FormControl>

                    <FormControlLabel
                      control={<Checkbox checked={isAgreeTerms} onChange={e => setIsAgreeTerms(e.target.checked)} />}
                      sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                      label={
                        <Fragment>
                          <Typography variant='body2' component='span'>
                            I agree to{' '}
                          </Typography>
                          <LinkStyled href='/' onClick={e => e.preventDefault()}>
                            privacy policy & terms
                          </LinkStyled>
                        </Fragment>
                      }
                    />
                    <LoadingButton
                      fullWidth
                      loading={isRegisterLoading}
                      disabled={!isAgreeTerms || Boolean(errors.username || errors.email || errors.password)}
                      size='large'
                      type='submit'
                      variant='contained'
                    >
                      Sign up
                    </LoadingButton>
                  </form>
                </Box>
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems='center'
                  justifyContent='center'
                  flexWrap='wrap'
                  sx={{ width: '100%', pt: 8 }}
                >
                  <Typography color='text.secondary'>Already have an account?</Typography>
                  <Typography component={Link} href='/auth/login' color='primary.main' sx={{ textDecoration: 'none' }}>
                    Sign in instead
                  </Typography>
                </Stack>
              </Stack>
            </MainCardContentStyled>
          </Grid>
          {isDesktopView && (
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                display: 'flex',
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                padding: `${theme.spacing(10, 10, 10, 0)} !important`
              }}
            >
              <SidecarCardContentStyled>
                <RegisterIllustration
                  height={350}
                  alt='register-illustration'
                  src='/images/auth/register-illustration.svg'
                />
                <Stack spacing={2} alignItems='center' justifyContent='center' sx={{ mt: 12 }}>
                  <Typography variant='subtitle1' component='p' color='common.white'>
                    Welcome to the future of RWA trading
                  </Typography>
                </Stack>
              </SidecarCardContentStyled>
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  )
}

AuthRegisterPage.guestGuard = true
AuthRegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthRegisterPage
