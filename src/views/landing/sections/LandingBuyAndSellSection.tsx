// ** React Imports
import { useState, useRef, useCallback, useEffect } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

// ** Type Imports
import type { BoxProps } from '@mui/material/Box'

const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: theme.spacing(120),
  paddingTop: theme.spacing(24),
  paddingBottom: theme.spacing(24),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(140),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}))

const LandingBuyAndSellSection = () => {
  // ** States
  const [containerTop, setContainerTop] = useState<number>(2000)

  // ** Refs
  const rootRef = useRef<HTMLElement>(null)

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
            xs: theme.spacing(80),
            md: theme.spacing(120),
            lg: theme.spacing(140),
            xl: theme.spacing(180)
          }),
          height: theme => ({
            xs: theme.spacing(100),
            md: theme.spacing(160),
            lg: theme.spacing(220),
            xl: theme.spacing(240)
          }),
          position: 'absolute',
          top: theme => ({
            xs: `calc(${containerTop}px + ${theme.spacing(60)})`,
            md: `calc(${containerTop}px + ${theme.spacing(80)})`,
            lg: `calc(${containerTop}px + ${theme.spacing(120)})`
          }),
          left: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/buy-and-sell/deco-left-bg.svg' alt='deco left bg' fill />
      </Box>

      <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
        <Stack spacing={4} justifyContent='center' alignItems='center' sx={{ maxWidth: theme => theme.spacing(180) }}>
          <Typography variant='h3' component='p' textAlign='center' sx={{ fontWeight: 900 }}>
            Buy and sell with the lowest fees in the industry
          </Typography>
          <Typography
            variant='subtitle1'
            component='p'
            textAlign='center'
            sx={{ maxWidth: theme => theme.spacing(160) }}
          >
            Buy and sell 150+ cryptocurrencies with 20+ fiat currencies using bank transfers or your credit/debit card.
          </Typography>
        </Stack>

        <Stack
          spacing={4}
          alignSelf='stretch'
          justifyContent='center'
          sx={{
            width: '100%',
            height: theme => ({
              xs: theme.spacing(50),
              sm: theme.spacing(60),
              md: theme.spacing(80),
              lg: theme.spacing(120),
              xl: theme.spacing(140)
            }),
            position: 'relative'
          }}
        >
          <Image src='/images/landing/buy-and-sell/table.png' alt='table' fill />
        </Stack>
      </Stack>
    </StyledRootBox>
  )
}

export default LandingBuyAndSellSection
