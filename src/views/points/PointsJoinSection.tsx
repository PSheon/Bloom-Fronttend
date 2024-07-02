// ** Next Imports
import { useSearchParams } from 'next/navigation'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third-Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
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

const StyledReFerralBox = styled(MuiOtpInput)(({ theme }) => ({
  '& .MuiOtpInput-TextField': {
    '& input': {
      color: theme.palette.primary.main,
      fontSize: '1.6rem',
      fontWeight: 900,
      padding: '0.5rem'
    }
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiOtpInput-TextField': {
      '& input': {
        fontSize: '1.2rem'
      }
    }
  }
}))

const schema = yup.object().shape({
  referralId: yup
    .string()
    .matches(/^[23456789A-HJ-NP-Z]{8}$/, 'Code invalid')
    .required()
})

interface FormData {
  referralId: string
}

const PointsJoinSection = () => {
  // ** Hooks
  const theme = useTheme()
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'))
  const searchParams = useSearchParams()

  const [joinReferral, { isLoading: isJoinReferralLoading }] = useJoinMutation()

  const {
    reset,
    control,
    handleSubmit,

    formState: { isValid, errors }
  } = useForm({
    defaultValues: {
      referralId: searchParams.get('referral-id') ?? ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
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
        <PointsBreadcrumbs
          pageLevels={[
            { title: 'PageBreadcrumb.Me.Points.PageTitle' },
            { title: 'PageBreadcrumb.Me.Points.Join.PageTitle' }
          ]}
        />
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
        <Stack spacing={4} alignSelf='stretch' alignItems='center' justifyContent='center' sx={{ mt: 24, mb: 36 }}>
          <Stack spacing={2} alignItems='center' justifyContent='center'>
            <Typography variant='h5' component='p'>
              Join points program
            </Typography>
            <Typography variant='subtitle2' component='p'>
              paste the referral code to boost income
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={6}
              alignSelf='stretch'
              alignItems='center'
              justifyContent='center'
              sx={{ maxWidth: theme => theme.spacing(120) }}
            >
              <Controller
                name='referralId'
                control={control}
                rules={{ validate: value => value!.length === 8 }}
                render={({ field }) => (
                  <Stack spacing={4} alignItems='center' justifyContent='center'>
                    <StyledReFerralBox
                      {...field}
                      display='flex'
                      gap={isDesktopView ? 2 : 1}
                      length={8}
                      validateChar={value => new RegExp(/^[23456789A-HJ-NP-Z]$/).test(value)}
                    />
                  </Stack>
                )}
              />
              <LoadingButton
                fullWidth
                loading={isJoinReferralLoading}
                disabled={Boolean(errors.referralId) || !isValid}
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
