// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useChangePasswordMutation } from 'src/store/api/auth'

interface PasswordVisibilityState {
  showCurrentPassword: boolean
  showNewPassword: boolean
  showNewPasswordConfirmation: boolean
}
interface FormData {
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

const schema = yup.object().shape({
  currentPassword: yup.string().min(8).required(),

  // newPassword: yup
  //   .string()
  //   .min(8)
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
  //   )
  //   .required(),
  newPassword: yup.string().min(5).required(),
  newPasswordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
})

const MeAccountChangePasswordCard = () => {
  // ** States
  const [passwordVisibility, setPasswordVisibility] = useState<PasswordVisibilityState>({
    showCurrentPassword: false,
    showNewPassword: false,
    showNewPasswordConfirmation: false
  })

  // ** Hooks
  const session = useSession()
  const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation()
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    },
    resolver: yupResolver(schema)
  })

  // ** Logics
  const handleClickShowCurrentPassword = () => {
    setPasswordVisibility({ ...passwordVisibility, showCurrentPassword: !passwordVisibility.showCurrentPassword })
  }
  const handleClickShowNewPassword = () => {
    setPasswordVisibility({ ...passwordVisibility, showNewPassword: !passwordVisibility.showNewPassword })
  }
  const handleClickShowNewPasswordConfirmation = () => {
    setPasswordVisibility({
      ...passwordVisibility,
      showNewPasswordConfirmation: !passwordVisibility.showNewPasswordConfirmation
    })
  }
  const onPasswordFormSubmit = async (data: FormData) => {
    const { currentPassword, newPassword, newPasswordConfirmation } = data

    changePassword({ currentPassword, newPassword, newPasswordConfirmation, accessToken: session.data!.accessToken })
      .unwrap()
      .then(() => {
        toast.success('密碼已更改')
        reset({}, { keepDirty: false })
      })
      .catch(error => {
        let errorMessage = 'Internal Server Error'

        if (error?.status === 400) {
          errorMessage = error?.data?.error?.message
        } else if (error?.status === 429) {
          errorMessage = 'You have exceeded the number of login attempts'
        }

        setError('currentPassword', {
          type: 'manual',
          message: errorMessage
        })
      })
  }

  return (
    <Card>
      <CardHeader title='改變密碼' />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onPasswordFormSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-current-password' error={Boolean(errors.currentPassword)}>
                  目前密碼
                </InputLabel>
                <Controller
                  name='currentPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='目前密碼'
                      onChange={onChange}
                      id='input-current-password'
                      error={Boolean(errors.currentPassword)}
                      type={passwordVisibility.showCurrentPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowCurrentPassword}
                          >
                            <Icon
                              icon={passwordVisibility.showCurrentPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.currentPassword.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={6} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-new-password' error={Boolean(errors.newPassword)}>
                  新密碼
                </InputLabel>
                <Controller
                  name='newPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='新密碼'
                      onChange={onChange}
                      id='input-new-password'
                      error={Boolean(errors.newPassword)}
                      type={passwordVisibility.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <Icon
                              icon={passwordVisibility.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.newPassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.newPassword.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-new-password-confirmation' error={Boolean(errors.newPasswordConfirmation)}>
                  確認新密碼
                </InputLabel>
                <Controller
                  name='newPasswordConfirmation'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='確認新密碼'
                      onChange={onChange}
                      id='input-new-password-confirmation'
                      error={Boolean(errors.newPasswordConfirmation)}
                      type={passwordVisibility.showNewPasswordConfirmation ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowNewPasswordConfirmation}
                          >
                            <Icon
                              icon={
                                passwordVisibility.showNewPasswordConfirmation
                                  ? 'mdi:eye-outline'
                                  : 'mdi:eye-off-outline'
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.newPasswordConfirmation && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.newPasswordConfirmation.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>安全性要求:</Typography>
              <Box component='ul' sx={{ pl: 4, mb: 0, '& li': { mb: 1, color: 'text.secondary' } }}>
                <li>至少 8 個字母 - 長度越長越安全</li>
                <li>至少包含一個小寫和一個大寫字符</li>
                <li>至少包含一個數字及特殊符號</li>
              </Box>
            </Grid>
            <Grid container item xs={12} spacing={6} justifyContent='flex-end'>
              <LoadingButton disabled={!isDirty} loading={isChangePasswordLoading} variant='contained' type='submit'>
                改變密碼
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default MeAccountChangePasswordCard
