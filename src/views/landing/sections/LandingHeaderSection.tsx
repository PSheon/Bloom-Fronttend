// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'
import type { ButtonProps } from '@mui/material/Button'

const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(200),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(140)
  }
}))

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  mt: theme.spacing(4),
  background: 'linear-gradient(-45deg, #ffa63d, #ff3d77, #338aff, #3cf0c5)',
  backgroundSize: '600%',
  animation: `anime 12s linear infinite`,
  '@keyframes anime': {
    '0%': {
      backgroundPosition: '0% 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    },
    '100%': {
      backgroundPosition: '0% 50%'
    }
  }
}))

const LandingHeaderSection = () => {
  return (
    <StyledRootBox>
      <Box
        sx={{
          zIndex: -1,
          width: '100%',
          height: theme => ({
            xs: theme.spacing(220),
            sm: theme.spacing(260),
            md: theme.spacing(300),
            lg: theme.spacing(380),
            xl: theme.spacing(380)
          }),
          position: 'absolute',
          top: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/hero/deco-orbit.svg' alt='deco orbit' fill priority />
      </Box>
      <Box
        sx={{
          width: theme => ({
            xs: theme.spacing(100),
            md: theme.spacing(140),
            lg: theme.spacing(160),
            xl: theme.spacing(180)
          }),
          height: theme => ({
            xs: theme.spacing(100),
            md: theme.spacing(160),
            lg: theme.spacing(180),
            xl: theme.spacing(200)
          }),
          position: 'absolute',
          top: 0,
          left: theme => ({
            xs: theme.spacing(-20),
            md: theme.spacing(-10)
          }),
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/hero/deco-left-bg.png' alt='deco left bg' fill priority />
      </Box>
      <Box
        sx={{
          width: theme => ({
            xs: theme.spacing(0),
            lg: theme.spacing(120),
            xl: theme.spacing(160)
          }),
          height: theme => ({
            xs: theme.spacing(0),
            lg: theme.spacing(160),
            xl: theme.spacing(200)
          }),
          position: 'absolute',
          top: theme => ({
            xs: theme.spacing(0),
            lg: theme.spacing(50),
            xl: theme.spacing(35)
          }),
          left: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/hero/deco-left.svg' alt='deco left' fill priority />
      </Box>
      <Box
        sx={{
          width: theme => ({
            xs: theme.spacing(60),
            sm: theme.spacing(100),
            md: theme.spacing(140),
            lg: theme.spacing(160),
            xl: theme.spacing(180)
          }),
          height: theme => ({
            xs: theme.spacing(80),
            sm: theme.spacing(120),
            md: theme.spacing(160),
            lg: theme.spacing(180),
            xl: theme.spacing(200)
          }),
          position: 'absolute',
          top: theme => ({
            xs: theme.spacing(80),
            sm: theme.spacing(60),
            md: theme.spacing(50),
            lg: theme.spacing(55),
            xl: theme.spacing(65)
          }),
          right: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/hero/deco-right-bg.png' alt='deco right bg' fill priority />
      </Box>
      <Box
        sx={{
          width: theme => ({
            xs: theme.spacing(0),
            lg: theme.spacing(120),
            xl: theme.spacing(160)
          }),
          height: theme => ({
            xs: theme.spacing(0),
            lg: theme.spacing(160),
            xl: theme.spacing(200)
          }),
          position: 'absolute',
          top: theme => ({
            xs: theme.spacing(0),
            lg: theme.spacing(50),
            xl: theme.spacing(35)
          }),
          right: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/hero/deco-right.svg' alt='deco right' fill priority />
      </Box>

      <Stack
        spacing={4}
        alignItems='center'
        justifyContent='center'
        sx={{
          maxWidth: theme => ({
            xs: theme.spacing(120),
            sm: theme.spacing(180),
            lg: theme.spacing(240)
          })
        }}
      >
        <Typography variant='h1' component='h1' textAlign='center' sx={{ fontWeight: 900 }}>
          We make crypto clear and simple
        </Typography>
        <Typography variant='h5' component='h2' textAlign='center'>
          Buy, sell, and grow your crypto with Bloom, the platform dedicated to every trader at every level.
        </Typography>
      </Stack>

      <StyledButton component={Link} href='/portfolio' variant='contained' size='large' sx={{ mt: 16 }}>
        Explore
      </StyledButton>
    </StyledRootBox>
  )
}

export default LandingHeaderSection
