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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minHeight: theme.spacing(160)
  }
}))

const LandingCustomerSupportSection = () => {
  // ** States
  const [containerTop, setContainerTop] = useState<number>(2200)

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
          width: theme => ({
            xs: theme.spacing(80),
            sm: theme.spacing(100),
            md: theme.spacing(120),
            lg: theme.spacing(140),
            xl: theme.spacing(180)
          }),
          height: theme => ({
            xs: theme.spacing(90),
            sm: theme.spacing(125),
            md: theme.spacing(160),
            lg: theme.spacing(220),
            xl: theme.spacing(240)
          }),
          position: 'absolute',
          top: theme => ({
            xs: `calc(${containerTop}px - ${theme.spacing(10)})`,
            sm: `calc(${containerTop}px - ${theme.spacing(30)})`,
            md: `calc(${containerTop}px - ${theme.spacing(80)})`,
            lg: `calc(${containerTop}px - ${theme.spacing(100)})`
          }),
          left: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/customer-support/deco-left-bg.png' alt='deco left bg' fill />
      </Box>
      <Box
        sx={{
          zIndex: -1,
          width: theme => ({
            xs: theme.spacing(100),
            md: theme.spacing(80),
            lg: theme.spacing(100),
            xl: theme.spacing(140)
          }),
          height: theme => ({
            xs: theme.spacing(280),
            md: theme.spacing(280),
            lg: theme.spacing(340),
            xl: theme.spacing(360)
          }),
          position: 'absolute',
          top: theme => ({
            xs: `calc(${containerTop}px - ${theme.spacing(0)})`,
            md: `calc(${containerTop}px - ${theme.spacing(40)})`,
            lg: `calc(${containerTop}px - ${theme.spacing(60)})`
          }),
          right: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/customer-support/deco-right-bg.png' alt='deco right bg' fill />
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Stack spacing={4} alignItems='center' justifyContent='center'>
            <Box sx={{ position: 'relative', width: isDesktopView ? 349 : 200, height: isDesktopView ? 326 : 200 }}>
              <Image src='/images/landing/customer-support/shield.svg' alt='shield' fill />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Stack
            spacing={4}
            alignSelf='stretch'
            alignItems='flex-start'
            justifyContent='center'
            sx={{ maxWidth: theme => theme.spacing(120) }}
          >
            <Typography variant='h3' component='p' sx={{ fontWeight: 900 }}>
              24/7 access to full service customer support
            </Typography>
            <Typography variant='subtitle1' component='p'>
              We invest more resources than any other platform in making sure great support from real people is a click
              away, whenever you need it.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </StyledRootBox>
  )
}

export default LandingCustomerSupportSection
