// ** Next Imports
import { useSearchParams } from 'next/navigation'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Components
import { useForm, Controller } from 'react-hook-form'
import { MuiOtpInput } from 'mui-one-time-password-input'
import toast from 'react-hot-toast'

// ** Custom Component Imports
import PointsBreadcrumbs from 'src/views/shared/PageBreadcrumbs'

// ** API Imports
import { useJoinMutation } from 'src/store/api/management/referral'

// ** Type Imports
import type { CardProps } from '@mui/material/Card'

// ** Styled Card component
const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  border: 0,
  boxShadow: 'none',
  backgroundSize: 'cover',
  backgroundImage: `url(/images/pages/pages-header-bg-${theme.palette.mode}.png)`
}))

interface FormData {
  referralId: string
}

const PointsJoinSection = () => {
  // ** Hooks
  const theme = useTheme()
  const searchParams = useSearchParams()

  const [joinReferral, { isLoading: isJoinReferralLoading }] = useJoinMutation()

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      referralId: searchParams.get('referral-id') ?? ''
    }
  })

  // ** Logics
  const onSubmit = async (data: FormData) => {
    const { referralId } = data

    try {
      await joinReferral({ referralId }).unwrap()
    } catch (error) {
      reset(undefined)
      toast.error('Join referral failed')
    }
  }

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <PointsBreadcrumbs pageLevels={[{ title: 'My Points' }, { title: 'Join' }]} />
      </Grid>
      <Grid item xs={12}>
        <StyledCard>
          <CardContent sx={{ pt: 23, textAlign: 'center', pb: theme => `${theme.spacing(23)} !important` }}>
            <Typography variant='h5' component='p'>
              The farm that helps you earn more
            </Typography>

            <Typography color='text.secondary' sx={{ mt: 4 }}>
              safe and secure way to earn more stable coins
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={4} alignItems='center' justifyContent='center' sx={{ my: 36 }}>
          <Stack spacing={2} alignItems='center' justifyContent='center'>
            <Typography variant='h5' component='p'>
              Join points program
            </Typography>
            <Typography variant='subtitle2' component='p'>
              paste the referral code to boost income
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6} alignItems='center' justifyContent='center'>
              <Controller
                name='referralId'
                control={control}
                rules={{ validate: value => value!.length === 6 }}
                render={({ field, fieldState: { invalid } }) => (
                  <Stack spacing={4} alignItems='center' justifyContent='center'>
                    <MuiOtpInput
                      {...field}
                      length={6}
                      validateChar={value => new RegExp(/^[23456789A-HJ-NP-Z]$/).test(value)}
                      TextFieldsProps={{
                        sx: {
                          maxWidth: 50,
                          textAlign: 'center',
                          height: '46px !important',
                          fontSize: '150% !important',
                          marginTop: theme.spacing(2),
                          marginBottom: theme.spacing(2),
                          '&:not(:last-child)': {
                            marginRight: theme.spacing(2)
                          },
                          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none'
                          }
                        }
                      }}
                    />
                    {invalid ? <FormHelperText error>Code invalid</FormHelperText> : null}
                  </Stack>
                )}
              />
              <LoadingButton
                fullWidth
                loading={isJoinReferralLoading}
                disabled={Boolean(errors.referralId)}
                type='submit'
                variant='contained'
              >
                Join
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Stack spacing={4} alignItems='center' justifyContent='center' textAlign='center' sx={{ p: 8 }}>
              <Typography variant='h6' component='p'>
                01. Invite your friends
              </Typography>
              <Typography variant='subtitle2' component='p'>
                copy your referral link or code and share with your friends
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Stack spacing={4} alignItems='center' justifyContent='center' textAlign='center' sx={{ p: 8 }}>
              <Typography variant='h6' component='p'>
                02. Your friend start staking
              </Typography>
              <Typography variant='subtitle2' component='p'>
                when your friend start staking and earn points, you will also earn points
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Stack spacing={4} alignItems='center' justifyContent='center' textAlign='center' sx={{ p: 8 }}>
              <Typography variant='h6' component='p'>
                03. Boost your income
              </Typography>
              <Typography variant='subtitle2' component='p'>
                the more your friends earn, the more you earn
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PointsJoinSection
