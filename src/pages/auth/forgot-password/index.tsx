// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
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
import { useForgotPasswordMutation } from 'src/store/api/auth'

// ** Type Imports
import type { ReactNode } from 'react'
import type { CardContentProps } from '@mui/material/CardContent'
import type { StackProps } from '@mui/material/Stack'

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
    padding: `${theme.spacing(8, 6, 8)} !important`
  }
}))

const StyledTitleStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(4) }
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

const StyledForgotPasswordIllustrationWrapperStack = styled(Stack)<StackProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.light
}))

const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required()
})

const defaultValues = {
  email: ''
}

interface FormData {
  email: string
}

const AuthForgotPasswordPage = () => {
  // ** Hooks
  const theme = useTheme()
  const [forgotPassword, { isLoading: isForgotPasswordLoading }] = useForgotPasswordMutation()
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
  const onSubmit = async (data: FormData) => {
    const { email } = data

    forgotPassword({ email })
      .unwrap()
      .then(({ ok }) => {
        if (ok) {
          toast.success('We have sent you an email, please check your inbox.')
        }
      })
      .catch(error => {
        let errorMessage = 'Internal Server Error'

        if (error?.status === 404) {
          errorMessage = 'Email not found'
        } else if (error?.status === 401) {
          errorMessage = 'You have been blocked by the administrator'
        } else if (error?.status === 429) {
          errorMessage = 'We have already sent you an email, please check your inbox or wait 3 minutes'
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
                  Forgot Password? 🔒
                </Typography>
                <Typography variant='body2'>{`Enter your email and we'll send you instructions to reset your password`}</Typography>
              </StyledTitleStack>

              <Stack spacing={4} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 6 }}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth>
                    <Controller
                      name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label='Email'
                          fullWidth
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

                  <LoadingButton
                    fullWidth
                    loading={isForgotPasswordLoading}
                    disabled={Boolean(errors.email)}
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{ mt: 4 }}
                  >
                    Send reset link
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
                <Typography
                  component={Link}
                  href='/auth/login'
                  noWrap
                  color='primary.main'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    justifyContent: 'center',
                    '& svg': { mr: 1.5 }
                  }}
                >
                  <Icon icon='mdi:chevron-left' fontSize='2rem' />
                  Back to login
                </Typography>
              </Stack>
            </StyledMainCardContent>
          </Grid>
          {isDesktopView && (
            <Grid item xs={12} md={7}>
              <StyledSidecarCardContent>
                <StyledForgotPasswordIllustrationWrapperStack
                  alignSelf='stretch'
                  alignItems='center'
                  justifyContent='center'
                >
                  <ForgotPasswordIllustration
                    height={500}
                    alt='forgot-password-illustration'
                    src='/images/auth/forgot-password-illustration.webp'
                  />
                </StyledForgotPasswordIllustrationWrapperStack>
              </StyledSidecarCardContent>
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  )
}

AuthForgotPasswordPage.guestGuard = true
AuthForgotPasswordPage.contentHeightFixed = true
AuthForgotPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthForgotPasswordPage
