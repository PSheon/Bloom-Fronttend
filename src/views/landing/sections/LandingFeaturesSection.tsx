// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'

const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(120),
  paddingTop: theme.spacing(36),
  paddingBottom: theme.spacing(12),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(180),
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12)
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: theme.spacing(120),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  }
}))

const LandingFeaturesSection = () => {
  return (
    <StyledRootBox>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 6 }}>
            <CardContent>
              <Stack spacing={4} alignItems='center'>
                <Image
                  src='/images/landing/features/feature-trade-desk.png'
                  alt='feature trade desk'
                  width={80}
                  height={80}
                  style={{ filter: 'drop-shadow(4px 4px 12px #4444dd)' }}
                />
                <Typography variant='h5' textAlign='center' sx={{ fontWeight: 900 }}>
                  Trade Desk
                </Typography>
                <Typography variant='body1' textAlign='center'>
                  Invest in crypto anytime, anywhere with our safe, secure, and easy to use online platform
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 6 }}>
            <CardContent>
              <Stack spacing={4} alignItems='center'>
                <Image
                  src='/images/landing/features/feature-payment.png'
                  alt='feature payment'
                  width={80}
                  height={80}
                  style={{ filter: 'drop-shadow(4px 4px 12px #4444dd)' }}
                />
                <Typography variant='h5' textAlign='center' sx={{ fontWeight: 900 }}>
                  Payment
                </Typography>
                <Typography variant='body1' textAlign='center'>
                  We have thousands of ATMs located across the U.S. where you can easily convert cash to crypto
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 6 }}>
            <CardContent>
              <Stack spacing={4} alignItems='center'>
                <Image
                  src='/images/landing/features/feature-wallet.png'
                  alt='feature wallet'
                  width={80}
                  height={80}
                  style={{ filter: 'drop-shadow(4px 4px 12px #4444dd)' }}
                />
                <Typography variant='h5' textAlign='center' sx={{ fontWeight: 900 }}>
                  Wallet
                </Typography>
                <Typography variant='body1' textAlign='center'>
                  Store your growing investments in our non-custodial wallet that gives you access to a full suite of
                  DeFi services in one place
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </StyledRootBox>
  )
}

export default LandingFeaturesSection
