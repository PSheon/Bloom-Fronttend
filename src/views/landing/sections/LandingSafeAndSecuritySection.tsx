// ** React Imports
import { useRef } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box, { BoxProps } from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(120),
  paddingTop: theme.spacing(24),
  paddingBottom: theme.spacing(24),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minHeight: theme.spacing(180)
  }
}))

const LandingSafeAndSecuritySection = () => {
  // ** Hooks
  const isLargeDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  // ** Refs
  const rootRef = useRef<HTMLElement>(null)

  return (
    <StyledRootBox ref={rootRef}>
      {isLargeDesktopView && (
        <Image
          src='/images/landing/safe-and-security/deco-right.png'
          alt='deco left'
          width={890}
          height={945}
          style={{
            position: 'absolute',
            right: 0,
            top: Number(rootRef.current?.offsetTop || 0) - Number(rootRef.current?.offsetHeight || 0)
          }}
        />
      )}

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Stack spacing={4} justifyContent='center'>
            <Typography variant='h3' sx={{ fontWeight: 900, maxWidth: theme => theme.spacing(120) }}>
              Take your first step into safe, secure crypto investing
            </Typography>
            <Typography variant='subtitle1'>
              Separated they live in Bookmarks right at the coast of the famous Semantics, large language ocean
              Separated they live in Bookmarks right at the coast.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={4} alignItems='center' justifyContent='center'>
            <Image
              src='/images/landing/safe-and-security/briefcase.png'
              alt='shield'
              width={isDesktopView ? 580 : 440}
              height={isDesktopView ? 420 : 360}
            />
          </Stack>
        </Grid>
      </Grid>
    </StyledRootBox>
  )
}

export default LandingSafeAndSecuritySection
