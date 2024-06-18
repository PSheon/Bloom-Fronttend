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
import type { StackProps } from '@mui/material/Stack'
import type { FormControlLabelProps } from '@mui/material/FormControlLabel'

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

const StyledFormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const StyledSidecarCardContent = styled(CardContent)<CardContentProps>(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${theme.spacing(10, 10, 10, 0)} !important`
}))

const StyledRegisterIllustrationWrapperStack = styled(Stack)<StackProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.light
}))

const StyledRegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const StyledLinkStyled = styled(Link)(({ theme }) => ({
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
            <StyledMainCardContent>
              <Stack>
                <Link href='/'>
                  {isDesktopView ? <LogoImage width={64} height={64} /> : <LogoImage width={48} height={48} />}
                </Link>
              </Stack>
              <StyledTitleStack spacing={2}>
                <Typography variant='h5' component='p' sx={{ fontWeight: 600, letterSpacing: '0.18px' }}>
                  Adventure starts here 🚀
                </Typography>
                <Typography variant='body2'>Make your app management easy and fun!</Typography>
              </StyledTitleStack>

              <Stack spacing={4} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 6 }}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth>
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
                    {errors.username && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 4 }}>
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
                          label='密碼'
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
                      <FormHelperText sx={{ color: 'error.main' }}>{'errors.password.message'}</FormHelperText>
                    )}
                  </FormControl>
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    flexWrap='wrap'
                    sx={{ mt: 2 }}
                  >
                    <StyledFormControlLabel
                      control={<Checkbox checked={isAgreeTerms} onChange={e => setIsAgreeTerms(e.target.checked)} />}
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                      label={
                        <Fragment>
                          <Typography variant='body2' component='span'>
                            I agree to{' '}
                          </Typography>
                          <StyledLinkStyled href='/' onClick={e => e.preventDefault()}>
                            privacy policy & terms
                          </StyledLinkStyled>
                        </Fragment>
                      }
                    />
                  </Stack>
                  <LoadingButton
                    fullWidth
                    loading={isRegisterLoading}
                    disabled={!isAgreeTerms || Boolean(errors.username || errors.email || errors.password)}
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{ mt: 4 }}
                  >
                    Sign up
                  </LoadingButton>
                </form>
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
                <Typography color='text.secondary'>Already have an account?</Typography>
                <Typography component={Link} href='/auth/login' color='primary.main' sx={{ textDecoration: 'none' }}>
                  Sign in instead
                </Typography>
              </Stack>
            </StyledMainCardContent>
          </Grid>
          {isDesktopView && (
            <Grid item xs={12} md={7}>
              <StyledSidecarCardContent>
                <StyledRegisterIllustrationWrapperStack alignSelf='stretch' alignItems='center' justifyContent='center'>
                  <StyledRegisterIllustration
                    height={500}
                    alt='register-illustration'
                    src='/images/auth/register-illustration.webp'
                  />
                </StyledRegisterIllustrationWrapperStack>
              </StyledSidecarCardContent>
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
