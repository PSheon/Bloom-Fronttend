// ** React Imports
import { useState, useEffect, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
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
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useResetPasswordMutation } from 'src/store/api/auth'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
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

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
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
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogoImage width={48} height={48} />
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              Reset Password 🔒
            </Typography>
            <Typography variant='body2'>Your new password must be different from previously used passwords</Typography>
          </Box>
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
              sx={{ mb: 5.25 }}
            >
              Set New Password
            </LoadingButton>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                component={Link}
                href='/pages/auth/login-v1'
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
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 image={`/images/pages/auth-v1-reset-password-mask-${theme.palette.mode}.png`} />
    </Box>
  )
}

AuthResetPasswordPage.guestGuard = true
AuthResetPasswordPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AuthResetPasswordPage
