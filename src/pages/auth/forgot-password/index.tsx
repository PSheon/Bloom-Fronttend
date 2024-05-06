// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
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
              <ForgotPasswordIllustration
                height={500}
                alt='forgot-password-illustration'
                src='/images/auth/forgot-password-illustration.svg'
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
                    Forgot Password? 🔒
                  </TitleTypographyStyled>
                  <Typography variant='body2'>
                    Enter your email and we&prime;ll send you instructions to reset your password
                  </Typography>
                </Box>
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
                      sx={{ my: 5.25 }}
                    >
                      Send reset link
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

AuthForgotPasswordPage.guestGuard = true
AuthForgotPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthForgotPasswordPage
