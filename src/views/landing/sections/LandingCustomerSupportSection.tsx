// ** React Imports
import { useRef } from 'react'

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
    minHeight: theme.spacing(180)
  }
}))

const LandingCustomerSupportSection = () => {
  // ** Hooks
  const isDesktopView = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  // ** Refs
  const rootRef = useRef<HTMLElement>(null)

  return (
    <StyledRootBox ref={rootRef}>
      {isDesktopView && (
        <Image
          src='/images/landing/customer-support/deco-left.png'
          alt='deco left'
          width={670}
          height={1143}
          style={{
            position: 'absolute',
            left: 0,
            top: Number(rootRef.current?.offsetTop || 0) - Number(rootRef.current?.offsetHeight || 0)
          }}
        />
      )}
      {isDesktopView && (
        <Image
          src='/images/landing/customer-support/deco-right.png'
          alt='deco right'
          width={670}
          height={1143}
          style={{
            position: 'absolute',
            right: 0,
            top: Number(rootRef.current?.offsetTop || 0) - Number(rootRef.current?.offsetHeight || 0) / 3
          }}
        />
      )}

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Stack spacing={4} alignItems='center' justifyContent='center'>
            <Image
              src='/images/landing/customer-support/shield.png'
              alt='shield'
              width={isDesktopView ? 349 : 200}
              height={isDesktopView ? 326 : 200}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={4} justifyContent='center'>
            <Typography variant='h3' sx={{ fontWeight: 900, maxWidth: theme => theme.spacing(120) }}>
              24/7 access to full service customer support
            </Typography>
            <Typography variant='subtitle1'>
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
