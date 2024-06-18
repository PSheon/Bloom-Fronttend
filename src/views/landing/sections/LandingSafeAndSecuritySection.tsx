// ** React Imports
import { useState, useRef, useCallback, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

// ** Type Imports
import type { Theme } from '@mui/material/styles'
import type { BoxProps } from '@mui/material/Box'

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
  // ** States
  const [containerTop, setContainerTop] = useState<number>(3350)

  // ** Refs
  const rootRef = useRef<HTMLElement>(null)

  // ** Hooks
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleChangeContainerTop = useCallback(() => {
    setContainerTop(() => Number(rootRef.current?.offsetTop || 0))
  }, [rootRef])

  // ** Side Effects
  useEffect(() => {
    handleChangeContainerTop()
    window.addEventListener('resize', handleChangeContainerTop)

    return () => {
      window.removeEventListener('resize', handleChangeContainerTop)
    }
  }, [handleChangeContainerTop])

  return (
    <StyledRootBox ref={rootRef}>
      <Box
        sx={{
          zIndex: -1,
          width: theme => ({
            xs: theme.spacing(180),
            md: theme.spacing(160),
            lg: theme.spacing(200),
            xl: theme.spacing(240)
          }),
          height: theme => ({
            xs: theme.spacing(180),
            md: theme.spacing(160),
            lg: theme.spacing(200),
            xl: theme.spacing(240)
          }),
          position: 'absolute',
          top: theme => ({
            xs: `calc(${containerTop}px + ${theme.spacing(40)})`,
            md: `calc(${containerTop}px - ${theme.spacing(40)})`,
            lg: `calc(${containerTop}px - ${theme.spacing(60)})`
          }),
          right: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/safe-and-security/deco-right.png' alt='deco right' fill />
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Stack
            spacing={4}
            alignSelf='stretch'
            alignItems='flex-end'
            justifyContent='center'
            sx={{ maxWidth: theme => theme.spacing(120) }}
          >
            <Typography variant='h3' component='p' textAlign='right' sx={{ fontWeight: 900 }}>
              Take your first step into safe, secure crypto investing
            </Typography>
            <Typography variant='subtitle1' component='p' textAlign='right'>
              Separated they live in Bookmarks right at the coast of the famous Semantics, large language ocean
              Separated they live in Bookmarks right at the coast.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={4} alignItems='center' justifyContent='center'>
            <Box sx={{ position: 'relative', width: isDesktopView ? 540 : 360, height: isDesktopView ? 380 : 280 }}>
              <Image src='/images/landing/safe-and-security/briefcase.png' alt='briefcase' fill />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </StyledRootBox>
  )
}

export default LandingSafeAndSecuritySection
