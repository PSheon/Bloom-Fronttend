// ** React Imports
import { useState, useRef, useCallback, useEffect } from 'react'

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
  minHeight: theme.spacing(160),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: theme.spacing(120)
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

const LandingLearnSection = () => {
  // ** States
  const [containerTop, setContainerTop] = useState<number>(0)

  // ** Refs
  const rootRef = useRef<HTMLElement>(null)

  // ** Hooks
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
            xs: theme.spacing(15),
            md: theme.spacing(25),
            lg: theme.spacing(30)
          }),
          height: theme => ({
            xs: theme.spacing(20),
            md: theme.spacing(30),
            lg: theme.spacing(35)
          }),
          position: 'absolute',
          top: containerTop,
          left: theme => ({
            xs: theme.spacing(5),
            sm: theme.spacing(15),
            md: theme.spacing(20),
            lg: theme.spacing(20)
          }),
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/learn/deco-left.svg' alt='deco left' fill />
      </Box>
      <Box
        sx={{
          zIndex: -1,
          width: theme => ({
            sm: theme.spacing(0),
            xs: theme.spacing(60),
            md: theme.spacing(100),
            lg: theme.spacing(140)
          }),
          height: theme => ({
            xs: theme.spacing(0),
            sm: theme.spacing(150),
            md: theme.spacing(250),
            lg: theme.spacing(350)
          }),
          position: 'absolute',
          top: theme => `calc(${containerTop}px - ${theme.spacing(55)})`,
          right: 0,
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/learn/deco-right-bg.svg' alt='deco right bg' fill />
      </Box>
      <Box
        sx={{
          width: theme => ({
            xs: theme.spacing(10),
            md: theme.spacing(15),
            lg: theme.spacing(20)
          }),
          height: theme => ({
            xs: theme.spacing(10),
            md: theme.spacing(15),
            lg: theme.spacing(20)
          }),
          position: 'absolute',
          top: theme => `calc(${containerTop}px + ${theme.spacing(100)})`,
          right: theme => ({
            xs: theme.spacing(5),
            sm: theme.spacing(15),
            md: theme.spacing(20)
          }),
          pointerEvents: 'none'
        }}
      >
        <Image src='/images/landing/learn/deco-right.svg' alt='deco right' fill />
      </Box>

      <Stack
        spacing={4}
        alignItems='center'
        justifyContent='center'
        sx={{
          maxWidth: theme => ({
            xs: theme.spacing(120),
            sm: theme.spacing(180),
            lg: theme.spacing(200)
          })
        }}
      >
        <Typography variant='h2' component='p' textAlign='center' sx={{ fontWeight: 900 }}>
          A cryto mining platform that invest in you
        </Typography>
        <Typography variant='h5' component='p' textAlign='center'>
          We are a team of crypto enthusiasts who are dedicated to help you invest in your future
        </Typography>
      </Stack>

      <StyledButton component={Link} href='/article/list' variant='contained' size='large' sx={{ mt: 16 }}>
        Learn
      </StyledButton>
    </StyledRootBox>
  )
}

export default LandingLearnSection
