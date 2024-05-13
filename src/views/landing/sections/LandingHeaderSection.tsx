// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Type Imports
import type { Theme } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'
import type { ButtonProps } from '@mui/material/Button'

const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(200),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(140)
  }
}))

const StyledButton = styled(Button)<ButtonProps>(() => ({
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
  // ** Hooks
  const isLargeDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <StyledRootBox>
      {isLargeDesktopView ? (
        <Image
          src='/images/landing/hero/deco-orbit.png'
          alt='deco orbit'
          width={1200}
          height={780}
          style={{ pointerEvents: 'none', position: 'absolute', top: 0 }}
        />
      ) : isDesktopView ? (
        <Image
          src='/images/landing/hero/deco-orbit.png'
          alt='deco orbit'
          width={890}
          height={700}
          style={{ pointerEvents: 'none', position: 'absolute', top: 0 }}
        />
      ) : null}
      {isDesktopView && (
        <Image
          src='/images/landing/hero/deco-left.png'
          alt='deco planet'
          width={620}
          height={754}
          style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0 }}
        />
      )}
      {isDesktopView && (
        <Image
          src='/images/landing/hero/deco-right.png'
          alt='deco coin'
          width={539}
          height={907}
          style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0 }}
        />
      )}

      <Stack spacing={4} justifyContent='center' sx={{ maxWidth: theme => theme.spacing(240) }}>
        <Typography variant='h1' textAlign='center' sx={{ fontWeight: 900 }}>
          We make crypto clear and simple
        </Typography>
        <Typography variant='h5' textAlign='center'>
          Buy, sell, and grow your crypto with Bloom, the platform dedicated to every trader at every level.
        </Typography>
      </Stack>

      <Stack spacing={4} sx={{ mt: 12 }}>
        <StyledButton component={Link} href='/portfolio' variant='contained' size='large'>
          Explore
        </StyledButton>
      </Stack>
    </StyledRootBox>
  )
}

export default LandingHeaderSection
