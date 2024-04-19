// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Imports
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box, { BoxProps } from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(200),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(180)
  }
}))

const LandingHeaderSection = () => {
  // ** Hooks
  const isLargeDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))

  return (
    <StyledRootBox>
      {isLargeDesktopView && (
        <Image
          src='/images/landing/hero/deco-orbit.png'
          alt='deco orbit'
          width={1440}
          height={827}
          style={{ position: 'absolute', top: 0 }}
        />
      )}
      {isLargeDesktopView && (
        <Image
          src='/images/landing/hero/deco-left.png'
          alt='deco planet'
          width={620}
          height={754}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
      )}
      {isLargeDesktopView && (
        <Image
          src='/images/landing/hero/deco-right.png'
          alt='deco coin'
          width={539}
          height={907}
          style={{ position: 'absolute', right: 0, top: 0 }}
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
        <Button
          component={Link}
          href='/portfolio'
          variant='contained'
          size='large'
          sx={{ background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)' }}
        >
          Explore
        </Button>
      </Stack>
    </StyledRootBox>
  )
}

export default LandingHeaderSection
